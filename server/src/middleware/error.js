export const notFound = (req, res, next) => {
  res.status(404).json({ success: false, message: `Route not found: ${req.originalUrl}` });
};

export const errorHandler = (err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Server error";

  if (err.name === "ValidationError") {
    status = 400;
    message = Object.values(err.errors).map((e) => e.message).join(", ");
  }
  if (err.code === 11000) {
    status = 409;
    message = "Duplicate value: " + Object.keys(err.keyValue || {}).join(", ") + " already exists";
  }
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid ID";
  }

  if (status === 500) console.error(err);
  res.status(status).json({ success: false, message, ...(err.details || {}) });
};
