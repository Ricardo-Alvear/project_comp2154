import bookSchema from '../models/Book.js';

export const getBooks = async (req, res) => {
	let { title, author, pages, page, limit, sort, fields } = req.query;
	const queryObject = {};

	// 1. Pagination Setup
	const pageNum = Number(page) || 1;
	const limitNum = Number(limit) || 5;
	const skipNum = (pageNum - 1) * limitNum;

	// 2. Filters
	if (title) queryObject.title = { $regex: title, $options: 'i' };
	if (author) queryObject.author = { $regex: author, $options: 'i' };
	if (pages) queryObject.pages = Number(pages);

	// 3. Build Query
	let result = bookSchema.find(queryObject);

	// 4. Chains (Must re-assign!)
	if (sort) {
		result = result.sort(sort.split(',').join(' '));
	}
	if (fields) {
		result = result.select(fields.split(',').join(' '));
	}

	// 5. Apply Skip/Limit
	result = result.skip(skipNum).limit(limitNum);

	// 6. Execute both
	const books = await result;
	const totalBooks = await bookSchema.countDocuments(queryObject);

	// 7. Response
	return res.status(200).json({
		books, // The actual data
		meta: {
			totalBooks,
			totalPages: Math.ceil(totalBooks / limitNum),
			currentPage: pageNum,
		},
	});
};
export const allBooks = (req, res) => {
	return res.status(200).json(req.body);
};

export const sendBooks = async (req, res) => {
	const data = await bookSchema.create(req.body);
	return res.status(200).json(data);
};
