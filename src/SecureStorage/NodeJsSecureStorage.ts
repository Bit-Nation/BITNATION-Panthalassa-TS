import {SecureStorageInterface,SecureStorageManagerInterface} from './SecureStorageInterface';
import {readFileSync,writeFileSync, unlinkSync, statSync} from 'fs';
//import {Cryptr} from 'cryptr';
var Cryptr = require('cryptr');
export class NodeJsSecureStorage implements SecureStorageInterface {
    fileName: string;
    keyValueStore: Map<string,any>;
    password: string;
    cryptr: Cryptr;
    constructor (fileName: string, password: string) {
        this.cryptr = new Cryptr(password);        
        this.fileName = fileName;
        this.password = password;
        try {
            statSync(fileName);
            this.keyValueStore = JSON.parse(this.cryptr.decrypt(readFileSync(fileName, "utf8")));
        } catch (e) {
            this.keyValueStore = new Map<string,any>();
        }
    }
    async getItem(key: string): Promise<any> {
        return this.keyValueStore.get(key);
    }
    async setItem(key: string, value: any) {
        this.keyValueStore.set(key, value);
        await this.store();
    }
    async removeItem(key: string) {
        this.keyValueStore.delete(key);
        await this.store();
    }

    async store() {
        writeFileSync(this.fileName, this.cryptr.encrypt(JSON.stringify(this.keyValueStore)));
    }

    isPasswordValid (password:string) : boolean {
        return this.password === password;
    }
}

export class NodeJsSecureStorageManager implements SecureStorageManagerInterface {

    openSessions: Map<string, SecureStorageInterface> = new Map<string, SecureStorageInterface>();

    async openOrCreateStorage(name: string, password: string): Promise <SecureStorageInterface> {
        // Authentication is handled by mobile OS
        let session = this.openSessions.get(name);
        if (!session) {
            let newSession = new NodeJsSecureStorage(name, password);
            this.openSessions.set(name, newSession);
            newSession.store();
            return newSession;
        } else {
            if (session.isPasswordValid(password)) {
                // We only return storage file if it can be decrypted
                return session;
            } else {
                throw new Error("Cannot read, decrypt or parse the storage");
            }
        }
    }
    async deleteStorage(name: string, password: string): Promise <void> {
        // Not implemented in react-native-sensitive-info
        // Instead of deleting the secure storage we will delete all its content
        let storage = await this.openOrCreateStorage(name, password);
        unlinkSync(name);
        this.openSessions.delete(name);
    }
}