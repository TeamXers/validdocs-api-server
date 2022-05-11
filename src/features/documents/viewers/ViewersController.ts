import { controller, CRUDController, inject, post } from "@eunovo/superbackend";
import { InvitesService } from "../../invitations/InviteService";
import { ViewersService } from "./service";

@controller()
export class ViewersController extends CRUDController {
    constructor(
        @inject(ViewersService) service: ViewersService,
        @inject(InvitesService) private invites: InvitesService
    ) {
        super('/docs/viewers', service, { create: false, read: true });
    }

    @post('/')
    async createViewerWithInvite(req: any) {
        const { token, address  } = req.body;
        const invite = await this.invites.findOne({ _id: token });
        if (invite.metadata.type !== 'view')
            return { message: "failed" };
             
        const existingDocs = await this.service.findMany({
            documentTokenId: invite.metadata.tokenId,
            userAddress: address
        });

        if (existingDocs.length > 0)
            return {
                message: "success",
                data: { documentTokenId: existingDocs[0].documentTokenId }
            };

        await this.service.create({
            documentTokenId: invite.metadata.tokenId,
            userAddress: address
        });

        return {
            message: "success",
            data: {
                documentTokenId: invite.metadata.tokenId
            }
        }
    }
}
