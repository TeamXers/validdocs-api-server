import { BaseController, container } from "@eunovo/superbackend";
import { Router, Handler } from "express";
import { AccountController } from "./features/accounts/AccountController";
import { DocController } from "./features/documents/DocController";
import { ViewersController } from "./features/documents/viewers/ViewersController";
import { InvitesController } from "./features/invitations/InviteController";
import { PinataController } from "./features/pinata/PinataController";
import { SearchController } from "./features/search/SearchController";

const router = Router();

const getExpressHandler = (handler: Function): Handler => {
    return async (req, res) => {
        try {
            const result = await handler(req);
            res.json(result);
        } catch (error: any) {
            console.log(error);
            res.json({
                message: error.message,
                errors: error.errors
            });
        }
    }
}

[
    AccountController,
    DocController,
    ViewersController,
    SearchController,
    PinataController,
    InvitesController
].forEach((controller) => {
    const instance: BaseController = container.get(controller as any);
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
