import {SecureStorageInterface,SecureStorageManagerInterface} from './SecureStorageInterface';
import {randomBytes,createCipheriv,createDecipheriv} from 'crypto';
import {readFileSync,writeFileSync, unlinkSync, closeSync, openSync} from 'fs';

const IV_LENGTH = 16;

function encrypt(text: string, password: string) {
  let iv = randomBytes(IV_LENGTH);
  let cipher = createCipheriv('aes-256-cbc', new Buffer(password), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);

  return iv.toString('hex') + ':' + encrypted.toString('hex');
}

function decrypt(text: string, password: string) {
  let textParts = text.split(':');
  let iv = new Buffer(textParts.shift(), 'hex');
  let encryptedText = new Buffer(textParts.join(':'), 'hex');
  let decipher = createDecipheriv('aes-256-cbc', new Buffer(password), iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}

export class NodeJsSecureStorage implements SecureStorageInterface {
    fileName: string;
    password: string;
    keyValueStore: Map<string,any>;
    constructor (fileName: string, password: string) {
        this.fileName = fileName;
        this.password = password;
        this.keyValueStore = JSON.parse(decrypt(readFileSync(fileName, "utf8"), password));
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
        writeFileSync(this.fileName, encrypt(JSON.stringify(this.keyValueStore),this.password));
    }
}

export class NodeJsSecureStorageManager implements SecureStorageManagerInterface {

    openSessions: Map<string, SecureStorageInterface> = new Map<string, SecureStorageInterface>();

    async openOrCreateStorage(name: string, password: string): Promise < SecureStorageInterface> {
        // Authentication is handled by mobile OS
        if (!this.openSessions.has(name)) {
            closeSync(openSync(name, 'a'));
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