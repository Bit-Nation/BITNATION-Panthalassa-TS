import Repo from './Repo';
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import {EthUtils} from "./EthWallet/EthUtils";
import {SecureStorageInterface} from "./SecureStorage/SecureStorageInterface";
import PrivateKey from "./EthWallet/PrivateKey";
import {NodeJsSecureStorage, NodeJsSecureStorageManager} from "./SecureStorage/NodeJsSecureStorage";
import {NodeJsFs} from "./FileSystem/NodeJsFs";
import Path = require('path');
import {ReactNativeSecureStorageManager} from './SecureStorage/ReactNativeSecureStorage'

export class PanthalassaApi
{

    /**
     *
     * @param {Repo} repo
     * @param {EthUtils} ethUtils
     */
    constructor(private repo: Repo, private ethUtils:EthUtils) { }

}


export function factory(platform:string, repoPath:string, secureStoragePassword:string){

    let ss:Promise<SecureStorageInterface>;
    let fs:FileSystemInterface;

    switch (platform){

        case 'ios' : {
            //Todo prove this before implementing in app
            let storageManager:ReactNativeSecureStorageManager = new ReactNativeSecureStorageManager();
            ss = storageManager.createStorage('bitn_secure_storage');
            break;
        }
        case 'android': {
            //Todo prove this before implementing in app
            let storageManager:ReactNativeSecureStorageManager = new ReactNativeSecureStorageManager();
            ss = storageManager.createStorage('bitn_secure_storage');
            break;
        }
        case 'node' : {
            let storageManager:NodeJsSecureStorageManager = new NodeJsSecureStorageManager();
            ss = storageManager.createStorage('node_js_secure_storage', secureStoragePassword);
            fs = new NodeJsFs(repoPath, Path);
            break;
        }
        default : {
            throw new Error();
        }

    }

    ss.then((storage:SecureStorageInterface) => {

        const ethUtils = new EthUtils(storage, PrivateKey);

        return new PanthalassaApi(new Repo(fs, ethUtils), new EthUtils(storage, PrivateKey));

    });

}