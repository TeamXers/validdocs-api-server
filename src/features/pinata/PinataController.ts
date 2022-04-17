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
        this.pinata.testAuthentication()
            .then((auth) => console.log(auth));
    }


    @post('')
    async saveFileToIPFS(req: any) {
        console.log(req.files.document);
        const fileHandle = await open(req.files.document.tempFilePath, 'r');
        const fileRes = await this.pinata.pinFileToIPFS(fileHandle.createReadStream());
        console.log(fileRes);
        const metadata = {
            name: req.body.name,
            description: req.body.description,
            file: fileRes.IpfsHash,
            created_by: req.body.author,
            created_at: fileRes.Timestamp
        };
        const jsonRes = await this.pinata.pinJSONToIPFS(metadata);
        console.log(jsonRes);
        return {
            message: 'success',
            data: jsonRes
        }
    }

}
