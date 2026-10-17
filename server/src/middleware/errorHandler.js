// Koi route na mile to (404)
export const notFound = (req, res, next) => {
  const error = new Error(`Route nahi mila: ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Central error handler: poori app ke errors yahin aayenge
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Server error";

  // Mongoose validation error (required field khaali, enum galat...)
  if (err.name === "ValidationError") {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((e) => e.message)
      .join(", ");
  }

  // Duplicate key (jaise ek school mein same email dobara)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {}).join(", ");
    message = `This ${field} already exist`;
  }

  // Galat ObjectId (jaise /api/students/abc)
  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid id";
  }

  // JWT errors
  if (err.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Token Invalid";
  }
  if (err.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token Expired";
  }

  res.status(statusCode).json({
    success: false,
    message,
    // Stack sirf development mein dikhao
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
};