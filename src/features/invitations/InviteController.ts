import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { InvitesService } from "./InviteService";

@controller()
export class InvitesController extends CRUDController {
    constructor(
        @inject(InvitesService) service: InvitesService
    ) {
        super('/invites', service);
    }
}
