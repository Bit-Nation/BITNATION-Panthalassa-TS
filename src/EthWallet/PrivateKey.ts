import {randomBytes} from 'crypto';
import {isValidPrivate} from 'ethereumjs-util';
import {InvalidPrivateKey} from "../Errors";

/**
 * Private Key Value Object
 */
export default class PrivateKey
{
    /**
     *
     * @param {Buffer} privKey
     */
    public constructor(private privKey: Buffer) {

        if(!isValidPrivate(privKey)){
            throw new InvalidPrivateKey();
        }

    }

    /**
     * Create's a Private Key instance
     * @returns {PrivateKey}
     */
    static factory(){

        const entropy:Buffer = randomBytes(32);

        return new PrivateKey(entropy);

    }

    /**
     * Returns the private key as a hex string
     * @returns {string}
     */
    public getPrivKey() : string
    {
        return this.privKey.toString('hex');
    }

    /**
     * Returns the private key as a buffer
     * @returns {Buffer}
     */
    public getPrivKeyBuffer() : Buffer
    {
        return this.privKey;
    }

}

