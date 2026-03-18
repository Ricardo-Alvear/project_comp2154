import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
	try {
		const { email, password } = req.body;

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: 'User already exists with this email.' });
		}

		const newUser = new User({ email, password });
		await newUser.save();

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({
			message: 'Error during registration',
			error: error.message,
		});
	}
};

export const login = async (req, res) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });

		if (!user || user.password !== password) {
			return res
				.status(401)
				.json({ message: 'Invalid credentials provided.' });
		}

		const token = jwt.sign(
			{ id: user._id, email: user.email },
			process.env.JWT_SECRET,
			{ expiresIn: '1h' },
		);

		res.json({ token });
	} catch (error) {
		res.status(500).json({
			message: 'Internal server error during authentication.',
		});
	}
};
