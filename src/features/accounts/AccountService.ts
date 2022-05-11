import { service, CRUDService, inject, Observable, timestamp, FilterOptions } from "@eunovo/superbackend";
import { Filter } from "@eunovo/superbackend/dist/crud/Filter";
import { Account } from "./AccountModel";
import { AccountRepo } from "./AccountRepo";

@timestamp(Account)
@service()
export class AccountService extends CRUDService<Account> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(AccountRepo) repo: AccountRepo
    ) {
        super(observable.getObservableFor('accounts'), repo);
    }

    findMany(filter: Filter<Account>, options?: FilterOptions | undefined, context?: any) {
        if (filter.address && filter.address.charAt) {
            filter.address = { $regex: filter.address, $options: 'i' };
        }
        return super.findMany(filter, options, context);
    }
}
