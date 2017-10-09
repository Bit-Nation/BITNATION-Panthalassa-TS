import EthUtils from "../../src/EthWallet/EthUtils";
import {SecureStorageInterface} from "BITNATION-Panthalassa-TS-secure-storage-interface/SecureStorageInterface";
import {instance, mock, when} from "ts-mockito";
import {AES, enc} from 'crypto-js'
import {mnemonicToEntropy, entropyToMnemonic, validateMnemonic} from 'bip39'
import {unlinkSync} from "fs";
import {isValidPrivate, isValidAddress} from "ethereumjs-util";
import {EthKeyAlreadyExist, EthKeyDoesNotExist} from "../../src/Errors";
import {NodeJsSecureStorage} from "BITNATION-Panthalassa-TS-node-js-secure-storage/NodeJsSecureStorage"
import Utils from "../../src/Utils";

const PRIVATE_TEST_KEY = "9b4b3da7d2d1c8749743a4ac17c151405f7900832bb4cf88735721cef4627096";

describe('EthUtils', () => {

    describe('createEthKeyPair', () => {

        test('throw error if one already exist', async () => {

            //Secure storage mock
            const SecureStorageMock = jest.fn<SecureStorageInterface>(() => ({
                hasItem: function (key) {
                    return new Promise(((resolve, reject) => {
                        resolve(true);
                    }))
                },
            }));

            //Secure storage instance
            const ssMockInstance = new SecureStorageMock();

            //Eth utils
            const eu:EthUtils = new EthUtils(ssMockInstance, new Utils);

            //Should throw an error
            let error:any;

            try {
                await eu.createEthKeyPair('my_password')
            } catch (e) {
                error = e
            }

            expect(error).toBeInstanceOf(EthKeyAlreadyExist);

        });

        test('test save successfully', async () => {

            //Storage meta data
            const storageName:string = 'secure_node_storage'+Math.random();
            const storagePassword:string = 'password';

            //secure storage
            let secureStorage:NodeJsSecureStorage = new NodeJsSecureStorage(storageName, storagePassword);
            secureStorage.init();

            //Eth utils
            const eu:EthUtils = new EthUtils(secureStorage, new Utils);

            //Create keypair
            const keyPair = await eu.createEthKeyPair('my_secret_password');

            //Decrypt private key
            const decryptedPrivateKey = AES.decrypt(
                await secureStorage.getItem(EthUtils.PRIV_KEY_SS_NAME),
                'my_secret_password')
                .toString(enc.Utf8);

            //Private key should be valid
            expect(isValidPrivate(new Buffer(decryptedPrivateKey, 'hex'))).toBeTruthy();

            expect(decryptedPrivateKey).toEqual(mnemonicToEntropy(keyPair.privKeyMnemonic));
            expect(entropyToMnemonic(decryptedPrivateKey)).toEqual(keyPair.privKeyMnemonic);

            unlinkSync(storageName)
        });

        test('create valid key pair', async () => {

            const secureStorageName = 'secure_storage'+Math.random();
            const storagePassword = 'password';

            //secure storage
            let secureStorage:NodeJsSecureStorage = new NodeJsSecureStorage(secureStorageName, storagePassword);
            secureStorage.init();

            //Eth utils
            const eu:EthUtils = new EthUtils(secureStorage, new Utils());

            const keyPair:{address: string, privKeyMnemonic: string} = await eu.createEthKeyPair('pwd');

            //expect(isValidPrivate(new Buffer(mnemonicToEntropy(keyPair.privKeyMnemonic), 'hex'))).toBeTruthy();
            expect(isValidAddress(keyPair.address)).toBeTruthy();
            expect(validateMnemonic(keyPair.privKeyMnemonic)).toBeTruthy();

            unlinkSync(secureStorageName);
        });

    });

    describe('hasPrivKey', () => {

        test('true', async () => {

            //Secure Storage mock
            const secureStorageMock:NodeJsSecureStorage = mock(NodeJsSecureStorage);

            //should find a item
            when(secureStorageMock.hasItem(EthUtils.PRIV_KEY_SS_NAME)).thenReturn(new Promise(((resolve, reject) => resolve(true))));

            //Eth Utils
            const eu:EthUtils = new EthUtils(instance(secureStorageMock), new Utils);

            //Should have an item
            expect(await eu.hasPrivKey()).toBeTruthy();

        });

        test('false', async () => {

            //Secure Storage mock
            const secureStorageMock:NodeJsSecureStorage = mock(NodeJsSecureStorage);

            //should find a item
            when(secureStorageMock.hasItem(EthUtils.PRIV_KEY_SS_NAME)).thenReturn(new Promise(((resolve, reject) => resolve(false))));

            //Eth Utils
            const eu:EthUtils = new EthUtils(instance(secureStorageMock), new Utils);

            //Should not have an item
            expect(await eu.hasPrivKey()).toBeFalsy();

        });

    });

    describe('getPrivKey', () => {

        test('should throw an error when there is no private key', async () => {

            //Secure storage
            const secureStorageMock:NodeJsSecureStorage = mock(NodeJsSecureStorage);

            //Hasn't item
            when(secureStorageMock.hasItem(EthUtils.PRIV_KEY_SS_NAME)).thenReturn(new Promise(((resolve, reject) => resolve(false))));

            //Eth Utils
            const eu:EthUtils = new EthUtils(instance(secureStorageMock), new Utils);

            //Should throw an error
            let error:any;

            try {
                await eu.getPrivKey('my_password')
            } catch (e) {
                error = e
            }

            expect(error).toBeInstanceOf(EthKeyDoesNotExist);

        });

        test('fetch private key successfully', async () => {

            /**
             * Private key
             * @type {string}
             */
            const PRIVATE_KEY = "0e177e9768dddf15ea24f0cc9186b9eeb4a96240d3d0f9a25aa5f82fcc0dc87e";
            const PRIVATE_KEY_MNEMONIC = "asthma room place spider target memory possible own smart method purpose talent enhance raise addict key whale barrel practice utility wolf alone capable slow";

            /**
             * Password my_secret_password
             * @type {string}
             */
            const PRIVATE_KEY_ENCRYPTED = "U2FsdGVkX19LTNihzsL26i5DSsjGT9LZbYcvc+VYIOeCrUIjQfHNSiRcbebhJgNMae+8Z6HHr9Wu1s6cD1c7Eves8hJ+vXU6nB//xAjBSu1PpJUxIHiGBNZ9dWZs6GCL";

            //Mock secure storage
            const secureStorageMock:NodeJsSecureStorage = mock(NodeJsSecureStorage);

            //Mock should have private key
            when(secureStorageMock.hasItem(EthUtils.PRIV_KEY_SS_NAME)).thenReturn(new Promise(((resolve, reject) => resolve(true))));

            //Mock return encrypted private key
            when(secureStorageMock.getItem(EthUtils.PRIV_KEY_SS_NAME)).thenReturn(new Promise(((resolve, reject) => resolve(PRIVATE_KEY_ENCRYPTED))));

            //Eth Utils
            const eu:EthUtils = new EthUtils(instance(secureStorageMock), new Utils);

            //Fetch private key
            const privKey:{privKey: string, privKeyMnemonic: string} = await eu.getPrivKey("my_secret_password");

            //Fetched private key should match the one from the mock
            expect(privKey.privKey).toBe(PRIVATE_KEY);

            //Private key mnemonic should also metch
            expect(privKey.privKeyMnemonic).toBe(PRIVATE_KEY_MNEMONIC);

        })

    });

    describe('getAddress', () => {

        test('fetch successfully', async () => {

            const storageName = 'ss'+Math.random();

            //secure storage
            const ss:NodeJsSecureStorage = new NodeJsSecureStorage(storageName, 'password');
            ss.init();

            //Eth Utils
            const ethUtils = new EthUtils(ss, new Utils);
            await ethUtils.createEthKeyPair('passwd');

            //get address and assert it
            expect(isValidAddress(await ethUtils.getAddress('passwd'))).toBeTruthy();

            unlinkSync(storageName);

        })

    });

});
