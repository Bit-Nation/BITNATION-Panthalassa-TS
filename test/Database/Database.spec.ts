import Database from '../../src/Database/Database';
import {BaseConfig, UnitTestConfig} from '../../src/Database/Config'
import * as Realm from 'realm';
import {About} from "../../src/Database/Schemes";

describe('database tests', () => {

    test('write', async () => {

        let d:Database = new Database(new BaseConfig());

        const about = await d.write('About', {
            'pseudo' : 'nick@name',
            'image': 'base64...',
            'description': 'I am ...'
        });

        expect(about.image).toBe('base64...');
        expect(about.description).toBe('I am ...');
        expect(about.pseudo).toBe('nick@name');

    });

});
