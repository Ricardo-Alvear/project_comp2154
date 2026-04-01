import bookSchema from "../models/Book.js";

export const getBooks = async (req, res) => {
  try {
    let { title, author, pages, page, limit, sort, fields } = req.query;
    const queryObject = {};

    // 1. Pagination Setup
    const pageNum = Number(page) || 1;
    const limitNum = Number(limit) || 10; // Increased default limit slightly
    const skipNum = (pageNum - 1) * limitNum;

    // 2. Filters (Using Case-Insensitive Regex)
    if (title) queryObject.title = { $regex: title, $options: "i" };
    if (author) queryObject.author = { $regex: author, $options: "i" };
    if (pages) queryObject.pages = { $gte: Number(pages) }; // Changed to "greater than or equal" for better UX

    // 3. Build Query
    let result = bookSchema.find(queryObject);

    // 4. Chains (Sorting & Field Selection)
    if (sort) {
      const sortList = sort.split(",").join(" ");
      result = result.sort(sortList);
    } else {
      result = result.sort("createdAt"); // Default sort by newest
    }

    if (fields) {
      const fieldsList = fields.split(",").join(" ");
      result = result.select(fieldsList);
    }

    // 5. Apply Skip/Limit
    result = result.skip(skipNum).limit(limitNum);

    // 6. Execute
    const books = await result;
    const totalBooks = await bookSchema.countDocuments(queryObject);

    // 7. Response
    return res.status(200).json({
      books,
      meta: {
        totalBooks,
        totalPages: Math.ceil(totalBooks / limitNum),
        currentPage: pageNum,
      },
    });
  } catch (error) {
    console.error("Get Books Error:", error);
    res
      .status(500)
      .json({ message: "Failed to retrieve books from the vault." });
  }
};

export const sendBooks = async (req, res) => {
  try {
    // Simple validation check
    if (!req.body.title || !req.body.author) {
      return res
        .status(400)
        .json({ message: "Title and Author are required." });
    }

    const data = await bookSchema.create(req.body);
    return res.status(201).json(data); // 201 is the standard for 'Created'
  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({ message: "Could not save the book record." });
  }
};

// Keep for debugging/testing request body
export const allBooks = (req, res) => {
  return res.status(200).json(req.body);
};
