import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { ViewersService } from "./service";

@controller()
export class ViewersController extends CRUDController {
    constructor(
        @inject(ViewersService) service: ViewersService
    ) {
        super('/docs/viewers', service);
    }
}
