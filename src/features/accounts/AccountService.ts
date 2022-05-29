import { service, CRUDService, inject, Observable, timestamp, FilterOptions, authorize } from "@eunovo/superbackend";
import { Filter } from "@eunovo/superbackend/dist/crud/Filter";
import { Account } from "./AccountModel";
import { AccountRepo } from "./AccountRepo";

@timestamp(Account)
@authorize(Account)
@service()
export class AccountService extends CRUDService<Account> {
    constructor(
        @inject(Observable) observable: Observable,
        @inject(AccountRepo) repo: AccountRepo
    ) {
        super(observable.getObservableFor('accounts'), repo);
    }

    create(input: Account, context?: any): Promise<string> {
        return super.create({ ...input, address: input.address.toLowerCase() }, context);
    }

    findMany(filter: Filter<Account>, options?: FilterOptions | undefined, context?: any) {
        if (filter.address && filter.address.charAt) {
            filter.address = { $regex: filter.address, $options: 'i' };
        }
        return super.findMany(filter, options, context);
    }
}
