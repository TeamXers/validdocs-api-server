import { controller, CRUDController, get, inject, IRequest } from "@eunovo/superbackend";
import { InvitesService } from "../invitations/InviteService";
import { DocService } from "./DocService";
import { ViewersService } from "./viewers/service";
import { ViewActivityService } from "./views/ViewActivityService";

@controller()
export class DocController extends CRUDController {
    constructor(
        @inject(DocService) private documents: DocService,
        @inject(InvitesService) private invites: InvitesService,
        @inject(ViewersService) private viewers: ViewersService,
        @inject(ViewActivityService) private viewActivity: ViewActivityService,
    ) {
        super('/docs', documents);
    }

    async getMany(req: any) {
        const address = req.user?.address;
        const { tokenId } = req.query;
        if (tokenId && address) {
            this.viewActivity.create({ userAddress: address, tokenId } as any);
        }

        return super.getMany(req)
    }

    @get('/public')
    async getPublic(req: any) {
        const query = req.query || {};
        return {
            message: 'success',
            date: {
                results: this.documents.findMany({ ...query, isPublic: true })
            }
        }
    }

    @get('/shared')
    async getShared(req: any) {
        const address = req.user?.address;
        const shared = await this.viewers.findMany({ userAddress: address });
        const docs = await (Promise.all(
            shared.map(value => this.documents.findOne({ tokenId: value.documentTokenId }))
        ));
        return {
            message: 'success',
            date: { results: docs }
        }
    }

    @get('/recently-viewed')
    async getRecentlyViewed(req: any) {
        const address = req.user?.address;
        // get last 10 views
        const views = await this.viewActivity.getLatest({ userAddress: address }, 10);
        const docs = await this.documents.findMany({
            tokenId: { $in: views.map(view => view.tokenId) }
        });

        return {
            message: 'success',
            data: { results: docs }
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
