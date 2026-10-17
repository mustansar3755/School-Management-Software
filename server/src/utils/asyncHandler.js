// Async controllers ke errors automatically error middleware tak pohanchata hai
export const asyncHandler = (fn) => (req, res, next) =>
  Promise.resolve(fn(req, res, next)).catch(next);
