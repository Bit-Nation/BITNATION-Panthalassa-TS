import { statSync, unlinkSync, createReadStream, createWriteStream } from 'fs';
import { copySync } from 'fs-extra'
import { NodeJsSecureStorage, NodeJsSecureStorageManager } from '../../src/SecureStorage/NodeJsSecureStorage';
import { SecureStorageInterface } from '../../src/SecureStorage/SecureStorageInterface'

// TODO: Coverage is still not reported correctly. See: https://stackoverflow.com/questions/41188484/jest-typescript-ts-jest-coverage-is-slightly-incorrect/43119810
describe('secure storage for nodejs platform', () => {

    let testStorageName = "testStorage";
    let testStoragePassword = "assword";

    test('should create file for non existing storage', async () => {
        await createTestStorageAndAssertItExists();
    });

    test('should store string value and be able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        await storeValueRetriveAndAssertIt("key1","value1", storage);
    });

    test('should create storage only once', async () => {
        let storageManager = new NodeJsSecureStorageManager();
        let storage1 = await storageManager.openOrCreateStorage(testStorageName, testStoragePassword);
        let storage2 = await storageManager.openOrCreateStorage(testStorageName, testStoragePassword);
        expect(storage1).toBe(storage2);
    });

    test('should store string value and be able to save it in file and retrive it from diffirent session', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        await storeValueRetriveAndAssertIt("key1","value1", storage);
        copySync(testStorageName,testStorageName+".bak");
        await storageManager.deleteStorage(testStorageName, testStoragePassword);
        expect(doesFileExist(testStorageName)).toBe(false);
        copySync(testStorageName+".bak", testStorageName);
        let managerAndStorage = await createTestStorageAndAssertItExists(true);
        expect(await managerAndStorage.storage.getItem("key1")).toBe("value1");
    });

    test('should remove a value', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        await storeValueRetriveAndAssertIt("key1","value1", storage);
        storage.removeItem("key1");
        expect(await storage.getItem("key1")).toBeUndefined();
    });

    test('should store boolean value and able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        await storeValueRetriveAndAssertIt("key1",true, storage);
    });

    test('should store multiple string values and able to retrive it', async () => {
        let { storageManager, storage } = await createTestStorageAndAssertItExists();
        for (let i = 0; i < 20; i++) {
            await storeValueRetriveAndAssertIt("key" + i,"value" + i, storage);
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
        try {
            unlinkSync(testStorageName+".bak");
        } catch (e) {}
    });

    async function createTestStorageAndAssertItExists(fileExists=false) {
        expect(doesFileExist(testStorageName)).toBe(fileExists);
        let storageManager = new NodeJsSecureStorageManager();
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