import { service, CRUDService, inject, Observable } from "@eunovo/superbackend";
import { Account } from "./AccountModel";
import { AccountRepo } from "./AccountRepo";

@service()
export class AccountService extends CRUDService<Account> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(AccountRepo) repo: AccountRepo
    ) {
        super(observable.getObservableFor('accounts'), repo);
    }
}
