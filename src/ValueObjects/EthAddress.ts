export default class EthAddress
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