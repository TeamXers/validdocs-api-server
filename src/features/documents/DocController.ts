import { controller, CRUDController, inject } from "@eunovo/superbackend";
import { DocService } from "./DocService";

@controller()
export class DocController extends CRUDController {
    constructor(
        @inject(DocService) service: DocService
    ) {
        super('/docs', service);
    }
}
