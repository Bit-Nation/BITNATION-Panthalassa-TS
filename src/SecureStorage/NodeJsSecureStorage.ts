import {SecureStorageInterface,SecureStorageManager} from './SecureStorageInterface';
import {readFileSync,writeFileSync, unlinkSync, existsSync} from 'fs';
import {AES, enc} from 'crypto-js';
export class NodeJsSecureStorage implements SecureStorageInterface {
    private fileName: string;
    // Using map is not feasible for serializaion/deserialization
    private keyValueStore: any;
    private password: string;
    constructor (fileName: string, password: string) {
        this.fileName = fileName;
        this.password = password;

    }
    init() {
        if (existsSync(this.fileName)) {
            let fileContent = readFileSync(this.fileName, "utf8");
            fileContent = AES.decrypt(fileContent,this.password).toString(enc.Utf8);
            this.keyValueStore = JSON.parse(fileContent);
        } else {
            this.keyValueStore = {};
        }
    }
    async getItem(key: string): Promise<any> {
        return this.keyValueStore[key];
    }
    async setItem(key: string, value: any) {
        this.keyValueStore[key] = value;
        await this.writeToFile();
    }
    async removeItem(key: string) {
        delete this.keyValueStore[key];
        await this.writeToFile();
    }

    async writeToFile() {
        writeFileSync(this.fileName, AES.encrypt(JSON.stringify(this.keyValueStore),this.password).toString(),{encoding:"utf8"});
    }

    hasItem(key:string) : boolean {
        return "undefined" !== typeof this.keyValueStore[key];
    }

    isPasswordValid (password:string) : boolean {
        return this.password === password;
    }
}

export class NodeJsSecureStorageManager extends SecureStorageManager {

    async createStorage(name: string, password: string): Promise <SecureStorageInterface> {
        let storage: NodeJsSecureStorage = new NodeJsSecureStorage(name, password);
        storage.init();
        return storage;
    }
    async deleteStorage(name: string, password: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage = await this.openOrCreateStorage(name, password);
        unlinkSync(name);
        this.openSessions.delete(name);
    }
}