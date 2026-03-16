import { connectDb } from "../db/connnectDb.js";

export const start = async (port, dbconnection, server) => {
    try {
        await connectDb(dbconnection).then(console.log('Database connected'));
        return server.listen(port, console.log('Server is listening...'));
    } catch (error) {
        console.log(error);
    }
};

