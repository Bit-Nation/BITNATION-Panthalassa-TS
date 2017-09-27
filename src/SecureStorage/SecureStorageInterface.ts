/**
 * Represents unlocked secure storage, the storage has usually secret values mapped to their keys.
 */
export interface SecureStorageInterface {
    getItem(key: string): Promise<any>;
    setItem(key: string, value: any): Promise<void>;
    removeItem(key: string): Promise<void>;
}

/**
 * Represents a way to unlock, create or delete a secure storage.
 */
export interface SecureStorageManagerInterface {
    openOrCreateStorage(name: string, password?: string): Promise < SecureStorageInterface > ;
    deleteStorage(name: string, password: string): void;
}
