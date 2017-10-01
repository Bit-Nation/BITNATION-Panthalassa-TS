import {randomBytes} from 'crypto';
import {isValidPrivate} from 'ethereumjs-util';

export class PrivateKey
{
    public constructor(private privKey: Buffer) {

        if(!isValidPrivate(privKey)){
            throw new Error("Private key is invalid")
        }

    }

    public getPrivKey() : string
    {
        return this.privKey.toString('hex');
    }

    public getPrivKeyBuffer() : Buffer
    {
        return this.privKey;
    }

}

export function createKey() : PrivateKey
{
    const entropy:Buffer = randomBytes(32);

    return new PrivateKey(entropy);
}
