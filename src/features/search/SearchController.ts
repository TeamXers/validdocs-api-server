import { BaseController, controller, get, inject } from "@eunovo/superbackend";
import { AccountService } from "../accounts/AccountService";
import { DocService } from "../documents/DocService";

@controller()
export class SearchController extends BaseController {
    constructor(
        @inject(AccountService) private accounts: AccountService,
        @inject(DocService) private docs: DocService
    ) {
        super('/search');
    }

    @get('')
    async search(req: any) {
        const { searchTerm } = req.query;

        const regex = {
            $regex: searchTerm.replace(/[^\w\s]|_/gm, '')
                .split(' ')
                .map((token: string) => `(${token})`)
                .join('|'),
            $options: 'i'
        };

        const accounts = await this.accounts.findMany({ username: regex });
        const docs = await this.docs.findMany({ name: regex, author: regex, tags: regex });

        return {
            message: "success",
            data: {
                accounts, docs
            }
        }
    }
}
