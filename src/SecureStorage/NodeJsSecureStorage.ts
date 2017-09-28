import {SecureStorageInterface,SecureStorageManagerInterface} from './SecureStorageInterface';
import {randomBytes,createCipheriv,createDecipheriv, createHash} from 'crypto';
import {readFileSync,writeFileSync, unlinkSync, statSync} from 'fs';
//import {Cryptr} from 'cryptr';
var Cryptr = require('cryptr');
export class NodeJsSecureStorage implements SecureStorageInterface {
    fileName: string;
    keyValueStore: Map<string,any>;
    cryptr: Cryptr;
    constructor (fileName: string, password: string) {
        this.cryptr = new Cryptr(password);        
        this.fileName = fileName;
        try {
            statSync(fileName);
            this.keyValueStore = JSON.parse(this.cryptr.decrypt(readFileSync(fileName, "utf8")));
        } catch (e) {
            this.keyValueStore = new Map<string,any>();
        }
    }
    async getItem(key: string): Promise<any> {
        this.keyValueStore.get(key);
    }
    async setItem(key: string, value: any) {
        this.keyValueStore.set(key, value);
        await this.store();
    }
    async removeItem(key: string) {
        this.keyValueStore.delete(key);
        await this.store();
    }

    private async store() {
        writeFileSync(this.fileName, this.cryptr.encrypt(JSON.stringify(this.keyValueStore)));
    }
}

export class NodeJsSecureStorageManager implements SecureStorageManagerInterface {

    openSessions: Map<string, SecureStorageInterface> = new Map<string, SecureStorageInterface>();

    async openOrCreateStorage(name: string, password: string): Promise < SecureStorageInterface> {
        // Authentication is handled by mobile OS
        if (!this.openSessions.has(name)) {
            this.openSessions.set(name, new NodeJsSecureStorage(name, password));
        }
        return this.openSessions.get(name);
    }
    async deleteStorage(name: string, password: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage = await this.openOrCreateStorage(name, password);
        if (storage) {
            // We only delete the file if it can be decrypted
            unlinkSync(name);
        } else {
            throw new Error("Cannot read, decrypt or parse the storage");
        }
    }
}