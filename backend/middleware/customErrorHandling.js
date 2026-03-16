export const customErr = (err, req, res, next) => {
	if (err.name === 'ValidationError') {
		return res.status(400).json({ValidationError: err.message});
	}
	if (err.name === 'CastError') {
		return res.status(404).json({CastError: err.value});
	}
	return res.status(500).json({ error: err.message });
};
