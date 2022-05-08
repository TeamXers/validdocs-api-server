import { service, CRUDService, inject, Observable } from "@eunovo/superbackend";
import { Viewer } from "./model";
import { ViewersRepo } from "./repo";

@service()
export class ViewersService extends CRUDService<Viewer> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(ViewersRepo) repo: ViewersRepo
    ) {
        super(observable.getObservableFor('document.viewers'), repo);
    }

}
