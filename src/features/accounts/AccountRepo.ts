import { inject, Model, MongoRepository, repo } from "@eunovo/superbackend";
import { Account } from "./AccountModel";

@repo()
export class AccountRepo extends MongoRepository<Account> {
    constructor(@inject(Account) model: Model) {
        super(model);
    }
}
