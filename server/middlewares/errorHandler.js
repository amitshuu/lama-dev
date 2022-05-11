export const errorHandler = (err, req, res, next) => {
  const defaultError = {
    statusCode: err.statusCode || 500,
    message: err.message || 'Something went wrong!',
  };

  res.status(defaultError.statusCode).json({ msg: defaultError.message });
};
