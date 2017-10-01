declare module 'ethereumjs-util' {

    /**
     *
     * @param {string} privateKey
     * @returns {boolean}
     */
    export function isValidPrivate(privateKey:string) : boolean;

    /**
     *
     * @param {string} privateKey
     * @returns {string}
     */
    export function privateToPublic(privateKey:string) : string;

    /**
     *
     * @param {string} pubKey
     * @returns {string}
     */
    export function isValidPublic(pubKey:string) : string;
}