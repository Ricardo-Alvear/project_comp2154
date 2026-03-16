import mongoose from 'mongoose';

export const connectDb = async (connnectionString) => {
	return await mongoose.connect(connnectionString);
};
