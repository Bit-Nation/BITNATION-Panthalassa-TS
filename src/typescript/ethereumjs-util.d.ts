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
}