import { service, CRUDService, inject, Observable } from "@eunovo/superbackend";
import { ViewActivity } from "./ViewActivityModel";
import { ViewActivityRepo } from "./ViewActivityRepo";

@service()
export class ViewActivityService extends CRUDService<ViewActivity> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(ViewActivityRepo) repo: ViewActivityRepo
    ) {
        super(observable.getObservableFor('view-activity'), repo);
    }

    getLatest(filter: any, size: number) {
        return (this.repo as ViewActivityRepo).getLatest(filter, size);
    }
}
