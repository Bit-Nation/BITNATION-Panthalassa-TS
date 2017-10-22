import {ObjectSchema, PropertiesTypes, PropertyType} from 'realm'

/**
 * This is the about schema which contains meta information about the user
 */
export class About implements ObjectSchema {

    public name:string = 'About';

    public primaryKey:string = 'id';

    public properties:PropertiesTypes = {
        id: 'int',
        pseudo : 'string',
        image: 'string',
        description: 'string'
    }

}