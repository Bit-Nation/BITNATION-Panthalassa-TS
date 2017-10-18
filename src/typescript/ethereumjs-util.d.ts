declare module 'ethereumjs-util' {

    /**
     *
     * @param {string} privateKey
     * @returns {boolean}
     */
    export function isValidPrivate(privateKey:Buffer) : boolean;

    /**
     *
     * @param {string} privateKey
     * @returns {string}
     */
    export function privateToPublic(privateKey:Buffer) : Buffer;

    /**
     *
     * @param {string} pubKey
     * @returns {string}
     */
    export function isValidPublic(pubKey:Buffer) : boolean;

    /**
     *
     * @param {Buffer} privKey
     * @returns {Buffer}
     */
    export function privateToAddress(privKey:Buffer) : Buffer;

    /**
     *
     * @param {Buffer} address
     * @returns {Buffer}
     */
    export function isValidAddress(address:string) : boolean;

    /**
     *
     * @param {string} value
     * @returns {string}
     */
    export function addHexPrefix(value:string) : string;

}