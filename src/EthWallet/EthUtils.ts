import {entropyToMnemonic} from 'bip39'
import {createKey, PrivateKey} from './PrivKeyFactory'
import {privateToPublic, isValidPublic} from 'ethereumjs-util'

export default class EthUtils {

    /**
     * key name for the secure storage
     * @type {string}
     */
    static PRIV_KEY_SS_NAME = 'private_ethereum_key';

    public createEthKeyPair(password:string) : {pubKey: string, privKeySeed: string}
    {
        //@Todo check if there is a private key and exit

        const privKey:PrivateKey = createKey();
        const encryptedPrivKey:string = '';
        const pubKey:string = privateToPublic(privKey.getPrivKey());
        const privKeySeed:string = entropyToMnemonic(privKey.getPrivKey());

        //Todo save encrypted private key to secure storage (waiting for pull request which also contains the crypto library)

        return {
            pubKey: pubKey,
            privKeySeed: privKeySeed
        }
    }

    /**
     * Return's the private key as seed (bip39) or throw error if decryption fail's.
     * @param {string} password
     * @returns {string}
     */
    public getPrivKey(password:string) : string
    {
        //@todo Check if private key exist and exit
        //@todo return private key as seed
        return '';
    }

    /**
     *
     * @returns {boolean}
     */
    public hasPrivKey() : boolean
    {
        //@todo check if private key exist's
        return false;
    }

}