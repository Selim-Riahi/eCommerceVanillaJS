// src/auth/middlewares/validate.ts
import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";

/**
 * Middleware to handle validation results.
 * If there are validation errors, it sends a 400 response with error details.
 */
export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are errors, send a 400 response with the error details
    res.status(400).json({ success: false, errors: errors.array() });
    return;
  }
  // If there are no errors, continue to the next middleware or controller
  next();
};
