import {instance, mock, when} from "ts-mockito";
import Repo from "../src/Repo";
import {About} from "../src/ValueObjects"
import {PanthalassaApi} from "../src/PanthalassaApi";
import EthUtils from "../src/EthWallet/EthUtils";

describe('panthalassa api', () => {

    describe('repo set about', () => {

        test('async', async () => {

            //About obj mock
            const about:About = mock(About);

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            //stub method
            when(RepoMock.setAbout(instance(about))).thenReturn(
                new Promise((resolve, reject) => setTimeout(
                    function(){resolve()},
                    10000
                ))
            );

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(panthalassa.repoSetAbout(about)).toBeInstanceOf(Promise);

        });

        test('sync', async () => {

            //About obj mock
            const about:About = mock(About);

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            //stub method
            when(RepoMock.setAbout(instance(about))).thenReturn(
                new Promise((resolve, reject) => setTimeout(
                    function(){resolve()},
                    10000
                ))
            );

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(JSON.stringify(await panthalassa.repoSetAbout(about))).toBe("{}");

        });

    });

    describe('eth get private key', async () => {

        test('async', async () => {

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(panthalassa.ethGetPrivateKey('password')).toBeInstanceOf(Promise);

        });

        test('sync', async () => {

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const privKeyResponse = {privKey: "i_am_a_priv_key", privKeyMnemonic: "house heard"};

            const ethUtilsMock:EthUtils = mock(EthUtils);
            when(ethUtilsMock.getPrivKey('password')).thenReturn(new Promise((resolve, reject) => resolve(privKeyResponse)));

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));
            expect(JSON.stringify(await panthalassa.ethGetPrivateKey('password')))
                .toBe(JSON.stringify(privKeyResponse));

        });

    });

    describe('eth get address', async () => {

        test('async', async () => {

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(panthalassa.ethGetAddress('password')).toBeInstanceOf(Promise);

        });

        test('sync', async () => {

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            //stub method
            when(ethUtilsMock.getAddress('password')).thenReturn(new Promise((resolve, reject) => resolve("i_am_a_address")));

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(await panthalassa.ethGetAddress('password')).toBe("i_am_a_address");

        });

    });

    describe('eth has private key', async () => {

        test('async', async () => {

            //Repo mock
            const RepoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            const panthalassa = new PanthalassaApi(instance(RepoMock), instance(ethUtilsMock));

            expect(panthalassa.ethHasPrivKey()).toBeInstanceOf(Promise);

        });

        test('sync', async () => {

            //Repo mock
            const repoMock:Repo = mock(Repo);

            const ethUtilsMock:EthUtils = mock(EthUtils);

            //stub method
            when(ethUtilsMock.hasPrivKey()).thenReturn(new Promise((resolve, reject) => resolve(true)));

            const panthalassa = new PanthalassaApi(instance(repoMock), instance(ethUtilsMock));

            expect(await panthalassa.ethHasPrivKey()).toBeTruthy();

        });

    });

});
