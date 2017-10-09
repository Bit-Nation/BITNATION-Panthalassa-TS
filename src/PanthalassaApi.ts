import Repo from './Repo';
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import {EthUtils} from "./EthWallet/EthUtils";
import {SecureStorageInterface} from "BITNATION-Panthalassa-TS-secure-storage-interface/SecureStorageInterface";
import Utils from "./Utils";

export class PanthalassaApi
{

    /**
     *
     * @param {Repo} repo
     * @param {EthUtils} ethUtils
     */
    constructor(private repo: Repo, private ethUtils:EthUtils) { }

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
        ethUtils
    );

}