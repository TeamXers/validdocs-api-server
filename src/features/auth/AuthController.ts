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
        const addr = ethJsUtil.bufferToHex(addrBuf).toLowerCase();

        const signingKey = process.env.JWT_SECRET;
        const claims = {
            iss: "http://validdocs.one/",
            sub: addr,
            scope: "self"
        }
        const jwt = nJwt.create(claims, signingKey);
        // Set token to expire in 24 hours
        jwt.setExpiration(new Date().getTime() + (24*60*60*1000));
        
        return {
            message: 'success',
            data: {
                token: jwt.compact()
            }
        }
    }
}
