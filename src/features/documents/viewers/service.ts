import { service, CRUDService, inject, Observable, timestamp } from "@eunovo/superbackend";
import { Viewer } from "./model";
import { ViewersRepo } from "./repo";

@timestamp(Viewer)
@service()
export class ViewersService extends CRUDService<Viewer> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(ViewersRepo) repo: ViewersRepo
    ) {
        super(observable.getObservableFor('document.viewers'), repo);
    }

}
