import {SecureStorageInterface,SecureStorageManager} from './SecureStorageInterface';
import {readFileSync,writeFileSync, unlinkSync, existsSync} from 'fs';
import {AES, enc} from 'crypto-js';

export class NodeJsSecureStorage implements SecureStorageInterface {
    private fileName: string;
    // Using map is not feasible for serializaion/deserialization
    private keyValueStore: any;
    private password: string;

    /**
     *
     * @param {string} fileName
     * @param {string} password
     */
    constructor (fileName: string, password: string) {
        this.fileName = fileName;
        this.password = password;

    }

    /**
     * Initializes the secure storage (e.g. read content from existing secure storage)
     */
    init() {
        if (existsSync(this.fileName)) {
            let fileContent = readFileSync(this.fileName, "utf8");
            fileContent = AES.decrypt(fileContent,this.password).toString(enc.Utf8);
            this.keyValueStore = JSON.parse(fileContent);
        } else {
            this.keyValueStore = {};
        }
    }

    /**
     * @param {string} key
     * @returns {Promise<any>}
     */
    async getItem(key: string): Promise<any> {
        return this.keyValueStore[key];
    }

    /**
     *
     * @param {string} key
     * @param value
     * @returns {Promise<void>}
     */
    async setItem(key: string, value: any) {
        this.keyValueStore[key] = value;
        await this.writeToFile();
    }

    /**
     *
     * @param {string} key
     * @returns {Promise<void>}
     */
    async removeItem(key: string) {
        delete this.keyValueStore[key];
        await this.writeToFile();
    }

    /**
     * Write data to file
     * @returns {Promise<void>}
     */
    async writeToFile() {
        writeFileSync(this.fileName, AES.encrypt(JSON.stringify(this.keyValueStore),this.password).toString(),{encoding:"utf8"});
    }

    /**
     * Check if item already exist
     * @param {string} key
     * @returns {Promise<boolean>}
     */
    async hasItem(key:string) : Promise<boolean> {
        return "undefined" !== typeof await this.keyValueStore[key];
    }

    /**
     *
     * @param {string} password
     * @returns {boolean}
     */
    isPasswordValid (password:string) : boolean {
        return this.password === password;
    }
}

export class NodeJsSecureStorageManager extends SecureStorageManager {

    /**
     *
     * @param {string} name
     * @param {string} password
     * @returns {Promise<SecureStorageInterface>}
     */
    async createStorage(name: string, password: string): Promise <SecureStorageInterface> {
        let storage: NodeJsSecureStorage = new NodeJsSecureStorage(name, password);
        storage.init();
        return storage;
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
        let storage = await this.openOrCreateStorage(name, password);
        unlinkSync(name);
        this.openSessions.delete(name);
    }

}