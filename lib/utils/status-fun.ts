import { Response } from "express";

export const ok = (res: Response, message: any) => {
  res.status(200).send(message);
}

export const badRequest = (res: Response, message: any) => {
    res.status(400).send(message);
}

export const created = (res: Response, message: any) => {
    res.status(201).send(message);
}

export const notFound = (res: Response, message: any) => {
    res.status(404).send(message);
}

export const unAuthorized = (res: Response, message: any) => {
    res.status(401).send(message);
}