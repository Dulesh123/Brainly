import express, { Request, Response, NextFunction } from "express";
import { JWT_SECRET } from "./config";
import jwt from "jsonwebtoken";
export const Authmiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token;
  //@ts-ignore
  const verifytoken = jwt.verify(token, JWT_SECRET);

  if (verifytoken) {
    //@ts-ignore
    req.headers = verifytoken.id;
    next();
  } else {
    res.status(400).json({
      msg: "Invalid credntials",
    });
  }
};
