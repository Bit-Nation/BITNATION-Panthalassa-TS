import EthAddress from "./EthAddress";

export default class About
{

    /**
     *
     * @param {string} pseudo
     * @param {string} image
     * @param {EthAddress} ethAddress
     * @param {string} description
     */
    constructor(private pseudo: string, private image: string, private ethAddress: EthAddress, private description: string){}

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
     * @returns {EthAddress}
     */
    public getEthAddress() : EthAddress
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