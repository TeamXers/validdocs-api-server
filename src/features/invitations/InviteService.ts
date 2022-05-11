import { service, CRUDService, inject, Observable, timestamp } from "@eunovo/superbackend";
import { Invite } from "./InviteModel";
import { InvitesRepo } from "./InviteRepo";

@timestamp(Invite)
@service()
export class InvitesService extends CRUDService<Invite> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(InvitesRepo) repo: InvitesRepo
    ) {
        super(observable.getObservableFor('invites'), repo);
    }
}
