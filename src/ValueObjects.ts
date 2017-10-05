import {isValidAddress, } from 'ethereumjs-util'
import {InvalidAddress} from "./EthWallet/EthUtils";

export class EthAddress
{
    /**
     * @param {string} address
     */
    constructor(private address: string)
    {
        if(address.length !== 42){
            throw new Error('Expected EthAddress, got: '+address);
        }
    }

    /**
     *
     * @returns {string}
     */
    public getAddress() : string
    {
        return this.address;
    }
}

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
    constructor(private path: string,private hash: string,private size: number) {}

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