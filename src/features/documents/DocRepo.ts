import { repo, MongoRepository, inject, Model } from "@eunovo/superbackend";
import { Document } from "./DocModel";

@repo()
export class DocRepo extends MongoRepository<Document> {
    constructor(@inject(Document) model: Model) {
        console.log(model);
        super(model);
    }
}
