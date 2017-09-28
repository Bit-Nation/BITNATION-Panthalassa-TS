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

/**
 * Create's a PrivateKey
 * @param {string} password
 * @returns {KeyPair}
 */
export function createKey(password: string) : PrivateKey
{
    const entropy:Buffer = randomBytes(32);

    const privKey:string = entropy.toString('hex');

    return new PrivateKey(privKey);
}
