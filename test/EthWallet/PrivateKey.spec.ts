import PrivateKey from './../../src/EthWallet/PrivateKey';
import {isValidPrivate} from 'ethereumjs-util';

// TODO: Coverage is still not reported correctly. See: https://stackoverflow.com/questions/41188484/jest-typescript-ts-jest-coverage-is-slightly-incorrect/43119810
describe('private key factory', () => {

    //Test the createKey function of PrivKeyFactory
    test('createKey', async () => {

        //Create key
        const key:PrivateKey = PrivateKey.factory();

        expect(key).toBeInstanceOf(PrivateKey);

        //All private key's have a length of 64
        expect(key.getPrivKey().length).toEqual(64);

        expect(isValidPrivate(key.getPrivKeyBuffer())).toBeTruthy();

    });

    const TEST_KEY = '9b4b3da7d2d1c8749743a4ac17c151405f7900832bb4cf88735721cef4627096';

    //Test the Private key value object
    test('PrivateKey test', () => {

        const key:PrivateKey = new PrivateKey(new Buffer(TEST_KEY, 'hex'));

        expect(key.getPrivKeyBuffer()).toEqual(new Buffer(TEST_KEY, 'hex'));

        expect(key.getPrivKey()).toEqual(TEST_KEY);

    });

});
