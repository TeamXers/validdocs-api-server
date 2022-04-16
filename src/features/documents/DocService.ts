import { service, CRUDService, inject, Observable, timestamp } from "@eunovo/superbackend";
import { DocRepo } from "./DocRepo";
import { Document } from "./DocModel";

@timestamp(Document)
@service()
export class DocService extends CRUDService<Document> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(DocRepo) repo: DocRepo
    ) {
        super(observable.getObservableFor('documents'), repo);
    }
}
