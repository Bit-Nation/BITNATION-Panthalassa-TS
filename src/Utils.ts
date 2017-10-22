import {randomBytes} from 'crypto';
import {PrivateKey} from './ValueObjects';
import Database from "./Database/Database";
import {EventEmitter} from "eventemitter3";
import {ETH_PRIVATE_KEY_MISSING, PROFILE_MISSING} from './Eventemitter/Events'
import {MissingEthPrivateKey, MissingProfileError} from './Errors';
import EthUtils from "./EthWallet/EthUtils";

/**
 * Check's if a "About" is present
 * @param {Database} db
 * @param {EventEmitter} pubEE
 * @returns {Promise<void>}
 */
export function hasProfile(db:Database, pubEE: EventEmitter) : Promise<void> {

    return new Promise((resolve, reject) => {

        db.realm.then((r:Realm) => {

            if(r.objects('About').length <= 0){
                pubEE.emit(PROFILE_MISSING);
                reject(new MissingProfileError());
                return;
            }

            resolve();

        });

    })
}

/**
 * Check if user has private key
 * @param {EthUtils} ethUtils
 * @param {EventEmitter} pubEE
 * @returns {Promise<any>}
 */
export function hasPrivateEthKey(ethUtils:EthUtils, pubEE:EventEmitter){

    return new Promise((resolve, reject) => {

        ethUtils.hasPrivKey()
            .then(hasPrivKey => {

                if(true === hasPrivKey){
                    resolve(hasPrivKey);
                    return;
                }

                pubEE.emit(ETH_PRIVATE_KEY_MISSING);
                reject(new MissingEthPrivateKey());

            })

    })

}

export default class Utils {

    /**
     *
     * @returns {PrivateKey}
     */
    public manufakturPrivKey() : PrivateKey {

        return new PrivateKey(randomBytes(32));

    }

}