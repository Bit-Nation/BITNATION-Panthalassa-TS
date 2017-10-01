import {randomBytes} from 'crypto';
import {isValidPrivate} from 'ethereumjs-util';

export class PrivateKey
{
    public constructor(private privKey: string) {

        if(!isValidPrivate(privKey)){
            throw new Error("Private key is invalid")
        }

    }

    public getPrivKey() : string
    {
        return this.privKey;
    }

}

export function createKey() : PrivateKey
{
    const entropy:Buffer = randomBytes(32);

    const privKey:string = entropy.toString('hex');

    return new PrivateKey(privKey);
}
