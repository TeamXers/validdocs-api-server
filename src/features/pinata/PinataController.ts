import { BaseController, controller, post } from '@eunovo/superbackend';
import makePinata, { PinataClient } from '@pinata/sdk';

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
            .then(({ authenticated }) => {
                if (authenticated) console.log('Pinata client is ready');
                else console.log('Failed to setup Pinata');
            }).catch(error => {
                console.log('Failed to setup Pinata:', error.message);
            });
    }


    @post('')
    async saveFileToIPFS(req: any) {
        const fileRes = await this.pinata.pinFromFS(
            req.files.document.tempFilePath,
            {
                pinataMetadata: {
                    name: `${req.body.name}_file`
                },
                pinataOptions: {
                    cidVersion: 0
                }
            }
        );

        const metadata = {
            name: req.body.name,
            description: req.body.description,
            file: `https://gateway.pinata.cloud/ipfs/${fileRes.IpfsHash}`,
            file_name: req.files.document.name,
            file_type: req.files.document.mimetype,
            created_by: req.body.authorAddress,
            created_at: fileRes.Timestamp
        };
        const jsonRes = await this.pinata.pinJSONToIPFS(
            metadata,
            {
                pinataMetadata: {
                    name: `${req.body.name}__metadata`,
                },
                pinataOptions: {
                    cidVersion: 0
                }
            }
        );

        return {
            message: 'success',
            data: {
                fileHash: fileRes.IpfsHash,
                metadataHash: jsonRes.IpfsHash
            }
        }
    }

}
