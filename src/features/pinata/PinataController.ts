import { BaseController, controller, post } from '@eunovo/superbackend';
import makePinata, { PinataClient } from '@pinata/sdk';
import { open } from 'fs/promises';

@controller()
export class PinataController extends BaseController {
    private pinata: PinataClient;
    
    constructor() {
        super('/pinata');
        const key = process.env.PINATA_API_KEY;
        const secret = process.env.PINATA_API_SECRET;

        if (!key || !secret) {
            throw new Error('Pinata key and secret required!');
        }

        this.pinata = makePinata(key, secret);
    }


    @post('')
    async saveFileToIPFS(req: any) {
        console.log(req.body, req.files.document);
        const path = `/tmp/${req.files.document.name}`;
        const fileHandle = await open(path, 'r');
        const fileRes = await this.pinata.pinFileToIPFS(fileHandle.createReadStream());

        const metadata = {
            name: req.body.name,
            description: req.body.description,
            file: fileRes.IpfsHash,
            created_by: req.body.author,
            created_at: fileRes.Timestamp
        };
        const jsonRes = await this.pinata.pinJSONToIPFS(metadata);

        return {
            message: 'success',
            data: jsonRes
        }
    }

}
