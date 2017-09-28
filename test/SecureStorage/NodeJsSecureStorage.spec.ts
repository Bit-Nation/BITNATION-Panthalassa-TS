import { statSync, unlinkSync } from 'fs';
import { NodeJsSecureStorage, NodeJsSecureStorageManager } from '../../src/SecureStorage/NodeJsSecureStorage';

describe('secure storage for nodejs platform', () => {

    let testStorageName = "testStorage";
    let testStoragePassword = "assword";

    test('should create file for non existing storage', async () => {
        let storageManager = new NodeJsSecureStorageManager();
        expect(doesFileExist(testStorageName)).toBe(false);
        let storage = await storageManager.openOrCreateStorage(testStorageName, testStoragePassword);
        expect(doesFileExist(testStorageName)).toBe(true);
        await storage.setItem("key1","value1");
        expect(await storage.getItem("key1")).toBe("value1");
        storageManager.deleteStorage(testStorageName, testStoragePassword);
    });

    afterEach(() => {
        unlinkSync(testStorageName);
    });

});

function doesFileExist(fileName:string): boolean {
    try {
        return statSync(fileName).isFile()
    } catch (e) {
        return false;
    }
}