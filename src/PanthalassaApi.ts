import Repo from './Repo';
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import EthUtils from "./EthWallet/EthUtils";
import Utils, {hasPrivateEthKey, hasProfile} from "./Utils";
import {SecureStorageInterface} from "BITNATION-Panthalassa-TS-secure-storage-interface/SecureStorageInterface";
import {About} from "./ValueObjects";
import DataBase from './Database/Database';
import {BaseConfig} from './Database/Config';
import {EventEmitter, ListenerFn} from "eventemitter3";
import {PANTHALASSA_START, PANTHALASSA_START_CONFIRMED, PANTHALASSA_START_REJECTED} from "./Eventemitter/Events";

export class PanthalassaApi
{

    /**
     * Since there is currently only one profile allowed, the id will stay the same
     * @type {number}
     */
    private readonly ABOUT_ID = 1;

    /**
     *
     * @param {Repo} repo
     * @param {EthUtils} ethUtils
     * @param {EventEmitter} intEventEmitter
     * @param {EventEmitter} pubEventEmitter
     * @param {Database} db
     */
    constructor(private repo: Repo, private ethUtils:EthUtils, private intEventEmitter:EventEmitter, private pubEventEmitter:EventEmitter, private db:DataBase) { }


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
     * @param {string} pseudo
     * @param {string} image
     * @param {string} descr
     * @returns {Promise<any>}
     */
    public setAbout(pseudo:string, image:string, descr:string) : Promise<any>
    {
        return new Promise((resolve, reject) => {

            //Since there is currently only one profile allowed
            //there is a static primary key used
            this.db
                .write('About', {
                    'id' : this.ABOUT_ID,
                    'pseudo' : pseudo,
                    'image' : image,
                    'description' : descr
                }, true)
                .then(about => {
                    resolve(about);
                })
                .catch(error => reject(error));

        })
    }

    /**
     *
     * @returns {Promise<void>}
     */
    public hasAbout(){

        return hasProfile(this.db, this.pubEventEmitter);

    }

    /**
     * Register listener
     * @param {string} event
     * @param {ListenerFn} fn
     * @param context
     */
    on(event:string, fn: ListenerFn, context?: any){

        this.pubEventEmitter.on(event, fn, context)

    }

    /**
     *
     * @returns {Promise<boolean>}
     */
    public start() : Promise<void>{

        let p:Promise<void> = new Promise((resolve, reject) => {

            Promise
                .all([
                    hasProfile(this.db, this.pubEventEmitter),
                    hasPrivateEthKey(this.ethUtils, this.pubEventEmitter)
                ])
                .then(success => {
                    resolve();
                    this.intEventEmitter.emit(PANTHALASSA_START_CONFIRMED);
                })
                .catch(errors => {
                    this.intEventEmitter.emit(PANTHALASSA_START_REJECTED);
                    reject(new Error("Not all requirements to start panthalassa are satisfied"));
                });

        });

        this.intEventEmitter.emit(PANTHALASSA_START);

        return p;

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
        new EventEmitter(),
        new EventEmitter(),
        new DataBase(new BaseConfig())
    );

}
