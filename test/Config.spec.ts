import {BaseConfig, UnitTestConfig} from '../src/Database/Config'
import {About} from "../src/Database/Schemes";

describe('database configurations', () => {

    test('UnitTestConfig', async () => {

        let c:UnitTestConfig = new UnitTestConfig();

        expect(c.inMemory).toBeTruthy();
        expect(c.schema).toEqual([new About()])
    });

    test('BaseConfig', async () => {

        let c:BaseConfig = new BaseConfig();

        expect(c.path).toBe('.database/panthalassa');
        expect(c.schema).toEqual([new About()]);

    });

});
