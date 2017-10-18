import {isValidPrivate} from 'ethereumjs-util';
import {InvalidPrivateKey} from "../../src/Errors";
import {PrivateKey} from "../../src/ValueObjects";
import Utils from "../../src/Utils";

// TODO: Coverage is still not reported correctly. See: https://stackoverflow.com/questions/41188484/jest-typescript-ts-jest-coverage-is-slightly-incorrect/43119810
describe('private key factory', () => {

    //Test the createKey function of PrivKeyFactory
    test('createKey', async () => {

        //Utils
        const utils:Utils = new Utils;

        //Create key
        const key:PrivateKey = utils.manufakturPrivKey();

        expect(key).toBeInstanceOf(PrivateKey);

        //All private key's have a length of 64
        expect(key.getPrivKey().length).toEqual(64);

        expect(isValidPrivate(key.getPrivKeyBuffer())).toBeTruthy();

    });

    const TEST_KEY = '9b4b3da7d2d1c8749743a4ac17c151405f7900832bb4cf88735721cef4627096';

    //Test the Private key value object
    test('private key test getter', () => {

        const key:PrivateKey = new PrivateKey(new Buffer(TEST_KEY, 'hex'));

        expect(key.getPrivKeyBuffer()).toEqual(new Buffer(TEST_KEY, 'hex'));

        expect(key.getPrivKey()).toEqual(TEST_KEY);

    });

    test('throw error if given private key is an invalid private key', async () => {

        let error:any;

        try {
            new PrivateKey(new Buffer('i_am_trolling_you'))
        }catch (e) {
            error = e;
        }

        expect(error).toBeInstanceOf(InvalidPrivateKey);

    });

});
