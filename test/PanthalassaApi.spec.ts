import {instance, mock, verify, when} from "ts-mockito";
import Repo from "../src/Repo";
import {About} from "../src/ValueObjects"
import {PanthalassaApi, factory} from "../src/PanthalassaApi";
import EthUtils from "../src/EthWallet/EthUtils";
import {NodeJsSecureStorage} from 'BITNATION-Panthalassa-TS-node-js-secure-storage';
import {NodeJsFs} from 'BITNATION-Panthalassa-TS-node-js-fs'
import DataBase from '../src/Database/Database'
import {BaseConfig} from '../src/Database/Config'

function createDb() : DataBase {
    return new DataBase(new BaseConfig());
}

describe('panthalassa api', () => {

    describe('repo set about', () => {

        test('async', async () => {

            //About obj mock
            const about:About = mock(About);

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            //stub method
            when(repoMock.setAbout(instance(about))).thenReturn(
                new Promise((resolve, reject) => setTimeout(
                    function(){resolve()},
                    10000
                ))
            );

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(panthalassa.repoSetAbout(about)).toBeInstanceOf(Promise);

            verify(repoMock.setAbout(about)).called();

        });

        test('sync', async () => {

            //About obj mock
            const about:About = mock(About);

            //Repo mock
            const repoMock:Repo = mock(Repo);
            when(repoMock.setAbout(about)).thenReturn(new Promise((resolve, reject) => resolve()));

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(await panthalassa.repoSetAbout(about)).toBeUndefined();

            verify(repoMock.setAbout(about)).once();

        });

    });

    describe('eth get private key', async () => {

        test('async', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(panthalassa.ethGetPrivateKey('password')).toBeInstanceOf(Promise);

            verify(ethUtilsMock.getPrivKey('password')).once();

        });

        test('sync', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const privKeyResponse = {privKey: "i_am_a_priv_key", privKeyMnemonic: "house heard"};

            const ethUtilsMock:EthUtils = mock(EthUtils);
            when(ethUtilsMock.getPrivKey('password')).thenReturn(new Promise((resolve, reject) => resolve(privKeyResponse)));

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(JSON.stringify(await panthalassa.ethGetPrivateKey('password')))
                .toBe(JSON.stringify(privKeyResponse));

            verify(ethUtilsMock.getPrivKey('password')).once();

        });

    });

    describe('eth get address', async () => {

        test('async', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(panthalassa.ethGetAddress('password')).toBeInstanceOf(Promise);

            verify(ethUtilsMock.getAddress('password')).once();

        });

        test('sync', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            //stub method
            when(ethUtilsMock.getAddress('password')).thenReturn(new Promise((resolve, reject) => resolve("i_am_a_address")));

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(await panthalassa.ethGetAddress('password')).toBe("i_am_a_address");

            verify(ethUtilsMock.getAddress('password')).once();

        });

    });

    describe('eth has private key', async () => {

        test('async', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(panthalassa.ethHasPrivKey()).toBeInstanceOf(Promise);

            verify(ethUtilsMock.hasPrivKey()).once();

        });

        test('sync', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            //stub method
            when(ethUtilsMock.hasPrivKey()).thenReturn(new Promise((resolve, reject) => resolve(true)));

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(await panthalassa.ethHasPrivKey()).toBeTruthy();

            verify(ethUtilsMock.hasPrivKey()).once();

        });

    });

    describe('eth create key pair test', async () => {

        test('async', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(panthalassa.ethCreateKeyPair('myPassword')).toBeInstanceOf(Promise);

            verify(ethUtilsMock.createEthKeyPair('myPassword')).once();

        });

        test('sync', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            /**
             * Database
             * @type {Database}
             */
            const db = createDb();

            const data = {
                address: 'address',
                privKeyMnemonic: 'tree house bird'
            };

            when(ethUtilsMock.createEthKeyPair('myPassword'))
                .thenReturn(new Promise((resolve, reject) => {

                    setTimeout(() => {
                        resolve(data)
                    }, 500)

                }));

            //stub method
            when(ethUtilsMock.hasPrivKey()).thenReturn(new Promise((resolve, reject) => resolve(true)));

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock), db);

            expect(await panthalassa.ethCreateKeyPair('myPassword')).toEqual(data);

            verify(ethUtilsMock.createEthKeyPair('myPassword')).once();

        });

    });

    test('factory', () => {

        const fs = new NodeJsSecureStorage();

        const secStore = new NodeJsFs();

        expect(factory(fs, secStore)).toBeInstanceOf(PanthalassaApi);

    })

});
