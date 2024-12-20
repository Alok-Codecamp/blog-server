import { AnyZodObject } from "zod";
import asyncWrapper from "../utils/asyncWrapper";
import { NextFunction, Request, Response } from "express";


const requestValidator = (schema: AnyZodObject) => {

    return asyncWrapper(async (req: Request, res: Response, next: NextFunction) => {
        await schema.parseAsync({
            body: req.body
        })
        next();
    })
}


export default requestValidator;
