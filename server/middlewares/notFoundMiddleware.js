export const notFoundMiddleware = (req, res) => {
  res.status(404).send('Route was not found!');
};
