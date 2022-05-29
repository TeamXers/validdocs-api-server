import { controller, CRUDController, get, inject } from "@eunovo/superbackend";
import { InvitesService } from "../invitations/InviteService";
import { DocService } from "./DocService";
import { ViewersService } from "./viewers/service";

@controller()
export class DocController extends CRUDController {
    constructor(
        @inject(DocService) private documents: DocService,
        @inject(InvitesService) private invites: InvitesService,
        @inject(ViewersService) private viewers: ViewersService
    ) {
        super('/docs', documents);
    }

    @get('/shared')
    async getShared(req: any) {
        const address = req.user.address;
        const shared = await this.viewers.findMany({ userAddress: address });
        const docs = await (Promise.all(
            shared.map(value => this.documents.findOne({ tokenId: value.documentTokenId }))
        ));
        return {
            message: 'success',
            date: { results: docs }
        }
    }

    @get('/:tokenId/sign-invite')
    async createSignInvite(req: any) {
        const { tokenId } = req.params;

        const document = await this.documents.findOne({ tokenId });

        const now = new Date();
        const inviteId = await this.invites.create({
            metadata: {
                type: 'sign',
                tokenId
            },
            createdBy: document.authorAddress,
            createdAt: now,
            lastUpdatedAt: now
        });

        return {
            message: 'success',
            data: { inviteId }
        }
    }

    @get('/:tokenId/view-invite')
    async createViewInvite(req: any) {
        const { tokenId } = req.params;

        const document = await this.documents.findOne({ tokenId });

        const now = new Date();
        const inviteId = await this.invites.create({
            metadata: {
                type: 'view',
                tokenId
            },
            createdBy: document.authorAddress,
            createdAt: now,
            lastUpdatedAt: now
        });

        return {
            message: 'success',
            data: { inviteId }
        }
    }

}
