import {SecureStorageInterface,SecureStorageManager} from './SecureStorageInterface';
import SInfo from 'react-native-sensitive-info';

// TODO: This code is not tested at all
class ReactNativeSecureStorage implements SecureStorageInterface {
    readonly options: any;

    /**
     *
     * @param {string} name
     */
    constructor (name: string) {
        this.options = {sharedPreferencesName: name, keychainService: name};
    }

    /**
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    async getItem(key: string): Promise<any> {
        return SInfo.getItem(key, this.options);
    }

    /**
     *
     * @param {string} key
     * @param value
     * @returns {Promise<void>}
     */
    async setItem(key: string, value: any) {
        return SInfo.setItem(key, value, this.options);
    }

    /**
     *
     * @param {string} key
     * @returns {Promise<any>}
     */
    async removeItem(key: string) {
        return SInfo.deleteItem(key, this.options);
    }

    /**
     *
     * @returns {Promise<void>}
     */
    async clear() {
        let allItems = await SInfo.getAllItems(this.options);
        for (let key in allItems.keys()) {
            await this.removeItem(key);
        }
    }

    /**
     *
     * @returns {boolean}
     */
    isPasswordValid() {
        //Todo maybe better to throw an exception
        // Password validation is delegated to OS
        return true;
    }

    /**
     *
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    //@Todo this need's to be tested
    async hasItem(key:string) : Promise<boolean> {

        let item:any = await this.getItem(key);

        if("number" === typeof item){
            return true;
        }

        if("string" === typeof item){
            return true;
        }

        if("undefined" === typeof item){
            return false;
        }

        throw new Error("Unexpected case: got value which is type of: "+typeof item);

    }

    /**
     *
     * @returns {Promise<void>}
     */
    writeToFile () {
        return Promise.resolve();
    }
}

class ReactNativeSecureStorageManager extends SecureStorageManager {

    /**
     *
     * @param {string} name
     * @param {string} password
     * @returns {Promise<ReactNativeSecureStorage>}
     */
    async createStorage(name: string, password?: string): Promise < ReactNativeSecureStorage > {
        return new ReactNativeSecureStorage(name);
    }

    /**
     * 
     * @param {string} name
     * @param {string} password
     * @returns {Promise<void>}
     */
    async deleteStorage(name: string, password: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage : ReactNativeSecureStorage = await this.openOrCreateStorage(name, password) as ReactNativeSecureStorage;
        await storage.clear();
    }
}