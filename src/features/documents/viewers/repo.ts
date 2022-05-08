import { repo, MongoRepository, inject, Model } from "@eunovo/superbackend";
import { Viewer } from "./model";

@repo()
export class ViewersRepo extends MongoRepository<Viewer> {
    constructor(@inject(Viewer) model: Model) {
        super(model);
    }
}
