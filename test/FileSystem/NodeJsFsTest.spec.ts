import {factory, NodeJsFs} from '../../src/FileSystem/NodeJsFs'
import Path = require('path');
import {unlinkSync} from "fs";

describe('NodeJsFs', () => {

    describe('Method - writeFile', () => {

        test('error during writing file', async () => {

            const repoPath:string = '/i-dont-exist';

            const filePath:string = Path.normalize(repoPath+'test-file.txt');

            let nfs:NodeJsFs = new NodeJsFs('/i-dont/exist', Path);

            let error:any;

            try{
                await nfs.writeFile(filePath, 'hi');
            }catch (e) {
                error = e;
            }

            //Todo check if that is a right way, could the error be thrown
            expect(JSON.stringify(error))
                .toBe('{"errno":-2,"code":"ENOENT","syscall":"open","path":"/i-dont/exist/i-dont-existtest-file.txt"}')

        });

        test('writing file successfully', async () => {

            const filePath:string = '/test.txt';

            let nfs:NodeJsFs = new NodeJsFs('.', Path);

            expect(await nfs.writeFile(filePath, 'hi'))
                .toBe('test.txt');

            unlinkSync('./test.txt');

        });

    });

    describe('Method - readFile', () => {

        test('read file that does not exist', async () => {

            const fileName:string = Math.random()+'.txt';

            const nodeFs:NodeJsFs = new NodeJsFs('.', Path);

            let error:any;

            try{
                await nodeFs.readFile(fileName);
            }catch (e) {
                error = e;
            }

            //Prove if there is a way to assert instance of error class
            expect(JSON.stringify(error))
                .toBe(JSON.stringify({
                    errno: -2,
                    code: 'ENOENT',
                    syscall: 'access',
                    path: '.'+fileName
                }));

        });

        test('read file successfully', async () => {

            const fileName = Math.random()+'.txt';

            const nodeFs:NodeJsFs = new NodeJsFs('./', Path);

            await nodeFs.writeFile(fileName, 'test content');

            let response:any;

            try{
                response = await nodeFs.readFile(fileName)
            }catch (e){
                response = e;
            }

            expect(response).toBe('test content');

            unlinkSync(fileName);

        });

    });

    describe('Method - create', () => {

        test('create node js fs by factory', async () => {

           expect(factory('./')).toBeInstanceOf(NodeJsFs);

        });

    });

});
