import Repo from '../src/Repo'
import EthUtils from '../src/EthWallet/EthUtils'
import * as nodeFs from 'BITNATION-Panthalassa-TS-node-js-fs/NodeJsFs'
import {instance, mock, verify, when} from "ts-mockito";
import {About} from "../src/ValueObjects";
import {existsSync, unlinkSync} from "fs";
import {EthKeyDoesNotExist} from '../src/Errors';

describe('test repo', () => {

    describe('setAbout', () => {

        test('save successfully', async () => {

            //fs
            let fs:nodeFs.NodeJsFs = nodeFs.factory('./');

            //eth utils mock
            let ethUtils:EthUtils = mock(EthUtils);

            when(ethUtils.hasPrivKey())
                .thenReturn(new Promise((resolve, reject) => {
                    resolve(true);
                }));

            let r:Repo = new Repo(fs, instance(ethUtils));

            await r.setAbout(new About(
                "my_tag",
                "base64...",
                "0x62efe345b5bc96af8efe564fd018c599e619cfe2",
                "Hi, i am ..."
            ));

            const aboutPath = __dirname+'/../../about.json';

            expect(existsSync(aboutPath)).toBeTruthy();

            verify(ethUtils.hasPrivKey()).once();

            unlinkSync(aboutPath);

        });

        test('test throw exception', async () => {

            //fs
            let fs:nodeFs.NodeJsFs = nodeFs.factory('./');

            //eth utils mock
            let ethUtils:EthUtils = mock(EthUtils);

            when(ethUtils.hasPrivKey())
                .thenReturn(new Promise((resolve, reject) => {
                    resolve(false);
                }));

            let r:Repo = new Repo(fs, instance(ethUtils));

            let error:any;

            try {

                await r.setAbout(new About(
                    "my_tag",
                    "base64...",
                    "0x62efe345b5bc96af8efe564fd018c599e619cfe2",
                    "Hi, i am ..."
                ));

            }catch (e){
                error = e;
            }

            expect(error.constructor).toBe(EthKeyDoesNotExist);

        });

    });

});