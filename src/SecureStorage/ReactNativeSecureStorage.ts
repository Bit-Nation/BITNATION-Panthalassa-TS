import {SecureStorageInterface,SecureStorageManager} from './SecureStorageInterface';
import SInfo from 'react-native-sensitive-info';

// TODO: This code is not tested at all
class ReactNativeSecureStorage implements SecureStorageInterface {
    readonly options: any;
    constructor (name: string) {
        this.options = {sharedPreferencesName: name, keychainService: name};
    }
    async getItem(key: string): Promise<any> {
        return SInfo.getItem(key, this.options);
    }
    async setItem(key: string, value: any) {
        return SInfo.setItem(key, value, this.options);
    }
    async removeItem(key: string) {
        return SInfo.deleteItem(key, this.options);
    }
    async clear() {
        let allItems = await SInfo.getAllItems(this.options);
        for (let key in allItems.keys()) {
            await this.removeItem(key);
        }
    }
    isPasswordValid() {
        // Password validation is delegated to OS
        return true;
    }

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

    writeToFile () {
        return Promise.resolve();
    }
}

class ReactNativeSecureStorageManager extends SecureStorageManager {

    async createStorage(name: string, password?: string): Promise < ReactNativeSecureStorage > {
        return new ReactNativeSecureStorage(name);
    }
    async deleteStorage(name: string, password: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage : ReactNativeSecureStorage = await this.openOrCreateStorage(name, password) as ReactNativeSecureStorage;
        await storage.clear();
    }
}