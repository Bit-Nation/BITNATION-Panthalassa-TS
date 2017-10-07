import Repo from './Repo';
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import {EthUtils} from "./EthWallet/EthUtils";
import PrivateKey from "./EthWallet/PrivateKey";
import {SecureStorageInterface} from "./SecureStorage/SecureStorageInterface";

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

    return new PanthalassaApi(
        new Repo(fs, new EthUtils(secStorage, PrivateKey)),
        new EthUtils(secStorage, PrivateKey)
    );

}