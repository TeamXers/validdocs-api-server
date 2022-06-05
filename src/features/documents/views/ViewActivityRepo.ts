import { repo, MongoRepository, inject, Model } from "@eunovo/superbackend";
import { ViewActivity } from "./ViewActivityModel";

@repo()
export class ViewActivityRepo extends MongoRepository<ViewActivity> {
    constructor(@inject(ViewActivity) model: Model) {
        super(model);
    }

    getLatest(filter: any, size: number) {
        return this.mongooseModel.find(filter)
            .sort({ createdAt: 'desc' })
            .limit(size).lean().exec() as Promise<ViewActivity[]>;
    }
}
