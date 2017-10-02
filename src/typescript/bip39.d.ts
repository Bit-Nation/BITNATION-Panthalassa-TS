declare module 'bip39' {

    /**
     *
     * @param {string} entropy | entropy as HEX value
     * @returns {string} | mnemonic like "house garden ..."
     */
    export function entropyToMnemonic(entropy:string) : string;

    /**
     * Proves if a mnemonic is valid
     * @param {string} mnemonic
     * @returns {boolean}
     */
    export function validateMnemonic(mnemonic:string) : boolean;

    /**
     *
     * @param {string} mnemonic | a mnemonic is "house garden ..."
     * @returns {string}
     */
    export function mnemonicToSeedHex(mnemonic:string) : string;

    /**
     *
     * @param {string} mnemonic
     * @returns {Buffer}
     */
    export function mnemonicToEntropy(mnemonic:string) : string;

}