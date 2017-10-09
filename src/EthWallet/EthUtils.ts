import {entropyToMnemonic} from 'bip39'
import {addHexPrefix, isValidPrivate, privateToAddress, isValidAddress} from 'ethereumjs-util'
import {SecureStorageInterface} from 'BITNATION-Panthalassa-TS-secure-storage-interface/SecureStorageInterface';
import {AES, enc} from 'crypto-js';
import {EthKeyAlreadyExist, InvalidAddress, InvalidPrivateKey, EthKeyDoesNotExist} from "../Errors";
import Utils from "../Utils";
import {PrivateKey} from '../ValueObjects'

/**
 * Contains helper method's to interact with everything that is ethereum related
 */
export default class EthUtils {

    /**
     * key name for the secure storage
     * @type {string}
     */
    static PRIV_KEY_SS_NAME = 'private_ethereum_key';

    /**
     *
     * @param {SecureStorageInterface} secStorage
     * @param {Utils} utils
     */
    constructor (private secStorage:SecureStorageInterface, private utils:Utils) {}

    /**
     * Create's an ethereum keypair and save it encrypted by the given password
     * @param {string} password
     */
    async createEthKeyPair(password:string) : Promise<{address: string, privKeyMnemonic: string}>
    {
        //Exit if key exist
        if(true === await this.secStorage.hasItem(EthUtils.PRIV_KEY_SS_NAME)){
            throw new EthKeyAlreadyExist();
        }

        //Private key
        const privKey:PrivateKey = this.utils.manufakturPrivKey();

        if(!isValidPrivate(privKey.getPrivKeyBuffer())){
            throw new InvalidPrivateKey();
        }

        //Private key
        let address:string = addHexPrefix(privateToAddress(privKey.getPrivKeyBuffer()).toString('hex'));

        if(!isValidAddress(address)){
            throw new InvalidAddress();
        }

        //Save encrypted key
        await this.secStorage.setItem(
            EthUtils.PRIV_KEY_SS_NAME,
            AES.encrypt(privKey.getPrivKey(), password).toString()
        );

        return {
            address: address,
            privKeyMnemonic: entropyToMnemonic(privKey.getPrivKey())
        }
    }

    /**
     * Return's the private key as mnemonic (bip39) or throw error if decryption fail's / private key is invalid
     * @param {string} password
     * @returns {string}
     */
    async getPrivKey(password:string) : Promise<{privKey: string, privKeyMnemonic: string}>
    {
        //Exit if not exist
        if(!await this.secStorage.hasItem(EthUtils.PRIV_KEY_SS_NAME)){
            throw new EthKeyDoesNotExist();
        }

        //Fetched encrypted private key
        const encrPrivKey:string = await this.secStorage.getItem(EthUtils.PRIV_KEY_SS_NAME);

        //Decrypted priv key
        const decrPrivKey:PrivateKey = new PrivateKey(new Buffer(AES.decrypt(encrPrivKey, password).toString(enc.Utf8), 'hex'));

        //@todo add check if encryption failed

        //Exit if decryption failed or private key is invalid
        if(!isValidPrivate(decrPrivKey.getPrivKeyBuffer())){
            throw new InvalidPrivateKey("The private key is invalid or the decryption failed");
        }

        return {
            privKey: decrPrivKey.getPrivKey(),
            privKeyMnemonic: entropyToMnemonic(decrPrivKey.getPrivKey())
        };
    }

    /**
     *
     * @param password
     * @returns {Promise<Buffer>}
     */
    async getAddress(password) : Promise<string> {

        const fetchedPrivKey = await this.getPrivKey(password);

        return addHexPrefix(privateToAddress(new Buffer(fetchedPrivKey.privKey, 'hex')).toString('hex'));

    }

    /**
     * Proves if user has a private key
     * @returns {Promise<boolean>}
     */
    async hasPrivKey() : Promise <boolean>
    {
        return this.secStorage.hasItem(EthUtils.PRIV_KEY_SS_NAME);
    }

}