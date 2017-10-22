import {About} from './Schemes';
import {} from 'realm';

export class BaseConfig implements Realm.Configuration {

    public path:string = '.database/panthalassa';

    public schema = [
        new About()
    ]

}

export class UnitTestConfig extends BaseConfig {
    public inMemory = true;
}