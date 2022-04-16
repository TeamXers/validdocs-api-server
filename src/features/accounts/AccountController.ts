import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { AccountService } from "./AccountService";

@controller()
export class AccountController extends CRUDController {
    constructor(
        @inject(AccountService) service: AccountService
    ) {
        super('/accounts', service);
    }
}
