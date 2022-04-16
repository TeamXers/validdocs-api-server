import { container } from "@eunovo/superbackend";
import { Router, Handler } from "express";
import { AccountController } from "./features/accounts/AccountController";
import { DocController } from "./features/documents/DocController";

const router = Router();

const getExpressHandler = (handler: Function): Handler => {
    return async (req, res) => {
        try {
            const result = await handler(req);
            res.json(result);
        } catch (error: any) {
            res.json({
                message: error.message,
                errors: error.errors
            });
        }
    }
}

[
    AccountController,
    DocController
].forEach((controller) => {
    const instance = container.get(controller);
    instance.getHandlers()
        .forEach((handler, route) => {
            Object.keys(handler)
                .forEach((key) => {
                    const method = key as keyof typeof handler;
                    router[method](route, getExpressHandler(handler[method]!));
                });
        });
});

export { router };
