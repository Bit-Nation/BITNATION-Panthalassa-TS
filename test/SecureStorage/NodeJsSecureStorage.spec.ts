import { statSync, unlinkSync } from 'fs';
import { NodeJsSecureStorage, NodeJsSecureStorageManager } from '../../src/SecureStorage/NodeJsSecureStorage';

describe('secure storage for nodejs platform', () => {

    let testStorageName = "testStorage";
    let testStoragePassword = "assword";

    test('should create file for non existing storage', () => {
        let storageManager = new NodeJsSecureStorageManager();
        expect(doesFileExist(testStorageName)).toBe(false);
        let storage = storageManager.openOrCreateStorage(testStorageName, testStoragePassword);
        expect(doesFileExist(testStorageName)).toBe(true);
    });

    afterAll(() => {
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