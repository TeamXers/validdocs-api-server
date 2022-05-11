import { repo, MongoRepository, inject, Model } from "@eunovo/superbackend";
import { Invite } from "./InviteModel";

@repo()
export class InvitesRepo extends MongoRepository<Invite> {
    constructor(@inject(Invite) model: Model) {
        super(model);
    }
}
