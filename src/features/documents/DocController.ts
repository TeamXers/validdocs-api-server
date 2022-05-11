import { controller, CRUDController, get, inject } from "@eunovo/superbackend";
import { InvitesService } from "../invitations/InviteService";
import { DocService } from "./DocService";

@controller()
export class DocController extends CRUDController {
    constructor(
        @inject(DocService) private documents: DocService,
        @inject(InvitesService) private invites: InvitesService
    ) {
        super('/docs', documents);
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
            createdBy: document.author,
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
            createdBy: document.author,
            createdAt: now,
            lastUpdatedAt: now
        });

        return {
            message: 'success',
            data: { inviteId }
        }
    }

}
