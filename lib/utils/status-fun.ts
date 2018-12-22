import { Response } from "express";

export const ok = (res: Response, message: any) => {
  res.status(200).json(message);
}

export const badRequest = (res: Response, message: any) => {
    res.status(400).json(message);
}

export const created = (res: Response, message: any) => {
    res.status(201).json(message);
}

export const notFound = (res: Response, message: any) => {
    res.status(404).json(message);
}

export const unAuthorized = (res: Response, message: any) => {
    res.status(401).json(message);
}

export const internalError = (res: Response, message: any) => {
    res.status(500).json(message);
}