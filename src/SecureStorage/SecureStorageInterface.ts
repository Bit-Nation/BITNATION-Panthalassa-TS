/**
 * Represents unlocked secure storage, the storage has usually secret values mapped to their keys.
 */
export interface SecureStorageInterface {
    getItem(key: string): Promise < any > ;
    setItem(key: string, value: any): Promise < void > ;
    removeItem(key: string): Promise < void > ;
    hasItem(key: string): Promise < boolean >;
    isPasswordValid(password: string): boolean;
    writeToFile():Promise<void>;
}

/**
 * Represents a way to unlock, create or delete a secure storage.
 */
export interface SecureStorageManagerInterface {
    openOrCreateStorage(name: string, password ? : string): Promise < SecureStorageInterface > ;
    deleteStorage(name: string, password: string): void;
    createStorage(name: string, password ? : string): Promise < SecureStorageInterface > ;
}


export abstract class SecureStorageManager implements SecureStorageManagerInterface {

    protected openSessions: Map < string, SecureStorageInterface > = new Map < string, SecureStorageInterface > ();

    async openOrCreateStorage(name: string, password: string): Promise < SecureStorageInterface > {
        // Authentication is handled by mobile OS
        let session = this.openSessions.get(name);

        if (!session) {
            let newSession = await this.createStorage(name, password);
            this.openSessions.set(name, newSession);
            newSession.writeToFile();
            return newSession;
        }

        if (session.isPasswordValid(password)) {
            // We only return storage file if it can be decrypted
            return session;
        }

        throw new Error("Cannot read, decrypt or parse the storage");

    }

    abstract deleteStorage(name: string, password: string): void;
    abstract createStorage(name: string, password: string): Promise < SecureStorageInterface >;
}