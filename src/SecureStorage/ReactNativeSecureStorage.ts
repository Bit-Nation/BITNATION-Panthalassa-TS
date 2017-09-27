import {SecureStorageInterface,SecureStorageManagerInterface} from './SecureStorageInterface';
import SInfo from 'react-native-sensitive-info';

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
}

class ReactNativeSecureStorageManager implements SecureStorageManagerInterface {

    openSessions: Map<string, SecureStorageInterface> = new Map<string, SecureStorageInterface>();

    async openOrCreateStorage(name: string, password?: string): Promise < SecureStorageInterface > {
        // Authentication is handled by mobile OS
        if (!this.openSessions.has(name)) {
            this.openSessions.set(name, new ReactNativeSecureStorage(name));
        }
        return Promise.resolve(this.openSessions.get(name));
    }
    async deleteStorage(name: string, password?: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage : ReactNativeSecureStorage = await this.openOrCreateStorage(name);
        await storage.clear();
    }
}