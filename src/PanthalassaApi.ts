import Repo from './Repo';
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import EthUtils from "./EthWallet/EthUtils";
import Utils from "./Utils";
import {SecureStorageInterface} from "BITNATION-Panthalassa-TS-secure-storage-interface/SecureStorageInterface";
import {About} from "./ValueObjects";
import DataBase from './Database/Database'
import {BaseConfig} from './Database/Config'

export class PanthalassaApi
{

    /**
     *
     * @param {Repo} repo
     * @param {EthUtils} ethUtils
     * @param {Database} db
     */
    constructor(private repo: Repo, private ethUtils:EthUtils, private db:DataBase) { }

    /**
     *
     * @param {string} password
     * @returns Promise<{address: string; privKeyMnemonic: string}>
     */
    public async ethCreateKeyPair(password:string) : Promise<{address: string, privKeyMnemonic: string}> {

        return this.ethUtils.createEthKeyPair(password);

    }

    /**
     *
     * @param {string} password
     * @returns Promise<{privKey: string; privKeyMnemonic: string}>
     */
    public async ethGetPrivateKey(password:string) : Promise<{privKey: string, privKeyMnemonic: string}> {

        return this.ethUtils.getPrivKey(password);

    }

    /**
     *
     * @param {string} password
     * @returns {Promise<string>}
     */
    public async ethGetAddress(password:string) : Promise<string> {

        return this.ethUtils.getAddress(password);

    }

    /**
     *
     * @returns {Promise<boolean>}
     */
    public async ethHasPrivKey() : Promise<boolean> {

        return this.ethUtils.hasPrivKey();

    }

    /**
     *
     * @param {About} about
     * @returns {Promise<void>}
     */
    public async repoSetAbout(about:About) : Promise<void>
    {
        return this.repo.setAbout(about);
    }

}

/**
 *
 * @param {FileSystemInterface} fs
 * @param {SecureStorageInterface} secStorage
 * @returns {PanthalassaApi}
 */
export function factory(fs:FileSystemInterface, secStorage:SecureStorageInterface){

    const utils:Utils = new Utils();

    const ethUtils:EthUtils = new EthUtils(secStorage, utils);

    return new PanthalassaApi(
        new Repo(fs, ethUtils),
        ethUtils,
        new DataBase(new BaseConfig())
    );

}