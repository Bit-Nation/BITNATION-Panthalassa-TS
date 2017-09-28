import { statSync, unlinkSync } from 'fs';
import { NodeJsSecureStorage, NodeJsSecureStorageManager } from '../../src/SecureStorage/NodeJsSecureStorage';
import {SecureStorageInterface} from '../../src/SecureStorage/SecureStorageInterface'

describe('secure storage for nodejs platform', () => {

    let testStorageName = "testStorage";
    let testStoragePassword = "assword";

    test('should create file for non existing storage', async () => {
        await createTestStorageAndAssertItExists();
    });

    test('should store string value and able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        storeValueRetriveAndAssertIt("key1","value1", storage);
    });

    test('should store boolean value and able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        storeValueRetriveAndAssertIt("key1",true, storage);
    });

    test('should store multiple string values and able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        for (let i = 0; i < 20; i++) {
            storeValueRetriveAndAssertIt("key" + i,"value" + i, storage);
        }
        expect(await storage.getItem("key0")).toBe("value0");
    });

    test('should remove file after deletion of storage, when suppied right password', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        await storageManager.deleteStorage(testStorageName, testStoragePassword);
        expect(doesFileExist(testStorageName)).toBe(false);
    });

    test('should not remove file after deletion of storage, when suppied wrong password', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        try {
            await storageManager.deleteStorage(testStorageName, "wrongPassword");
            expect(false).toBe(true);
        } catch (e) {
            expect(doesFileExist(testStorageName)).toBe(true);
        }
    });

    afterEach(() => {
        try {
            unlinkSync(testStorageName);
        } catch (e) {}
    });

    async function createTestStorageAndAssertItExists() {
        let storageManager = new NodeJsSecureStorageManager();
        expect(doesFileExist(testStorageName)).toBe(false);
        let storage = await storageManager.openOrCreateStorage(testStorageName, testStoragePassword);
        expect(doesFileExist(testStorageName)).toBe(true);
        return { storageManager, storage};
    }

    async function storeValueRetriveAndAssertIt(key:string, value:any, storage: SecureStorageInterface) {
        await storage.setItem(key,value);
        expect(await storage.getItem(key)).toBe(value);
    }

});

function doesFileExist(fileName:string): boolean {
    try {
        return statSync(fileName).isFile()
    } catch (e) {
        return false;
    }
}