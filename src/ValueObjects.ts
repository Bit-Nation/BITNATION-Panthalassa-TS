import {isValidAddress, } from 'ethereumjs-util'
import {InvalidAddress, InvalidPrivateKey} from "./Errors";
import {isValidPrivate} from 'ethereumjs-util'

export class About
{

    /**
     *
     * @param {string} pseudo
     * @param {string} image
     * @param {string} ethAddress
     * @param {string} description
     */
    constructor(private pseudo: string, private image: string, private ethAddress: string, private description: string){

        if(!isValidAddress(ethAddress)){
            throw new InvalidAddress()
        }

    }

    /**
     *
     * @returns {string}
     */
    public getPseudo() : string
    {
        return this.pseudo;
    }

    /**
     *
     * @returns {string}
     */
    public getImage() : string
    {
        return this.image;
    }

    /**
     *
     * @returns {string}
     */
    public getEthAddress() : string
    {
        return this.ethAddress;
    }

    /**
     *
     * @returns {string}
     */
    public getDescription() : string
    {
        return this.description;
    }

}

export class IpfsAddedFileResponse
{
    constructor(private path: string, private hash: string, private size: number) {}

    public getPath() : string
    {
        return this.path;
    }

    public getHash() : string
    {
        return this.hash;
    }

    public getSize() : number
    {
        return this.size;
    }
}

/**
 * Private Key Value Object
 */
export class PrivateKey
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
