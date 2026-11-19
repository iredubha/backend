export function notFound(req, res) {
  res.status(404).json({
    message: "Route not found",
    path: req.url
  });
}

export function errorHandler(error, req, res, next) {
  const status = error.status ?? 500;
  if (status === 500) console.error(error);

  res.status(status).json({
    message: status === 500 ? "Internal server error" : error.message
  });
}