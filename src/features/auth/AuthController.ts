import { controller, BaseController, post } from "@eunovo/superbackend";
import nJwt from "njwt";
import * as ethJsUtil from "ethereumjs-util";

@controller()
export class AuthController extends BaseController {
    constructor() {
        super('/auth');
    }

    @post('/')
    async authenticate(req: any) {
        let { signature, message } = req.body;

        const { v, r, s } = ethJsUtil.fromRpcSig(signature);
        const msg = Buffer.from(message);
        const prefix = Buffer.from("\x19Ethereum Signed Message:\n");
        const prefixedMsg = ethJsUtil.keccak(
            Buffer.concat([prefix, Buffer.from(String(msg.length)), msg])
        );

        const pub = ethJsUtil.ecrecover(prefixedMsg, v, r, s);
        const addrBuf = ethJsUtil.pubToAddress(pub);
        const addr = ethJsUtil.bufferToHex(addrBuf);

        const signingKey = process.env.JWT_SECRET;
        const claims = {
            iss: "http://validdocs.one/",
            sub: addr,
            scope: "self"
        }
        return {
            message: 'success',
            data: {
                token: nJwt.create(claims, signingKey).compact()
            }
        }
    }
}
