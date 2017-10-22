import * as Realm from 'realm';

export default class Database {

    private realm:ProgressPromise;

    /**
     *
     * @param {Realm.Configuration} config
     */
    constructor(config:Realm.Configuration) {

        this.realm = Realm.open(config);
        
    }

    /**
     *
     * @param {string | Realm.ObjectClass | Function} type
     * @param {T & Realm.ObjectPropsType} properties
     * @param {boolean} update
     * @returns {Promise<T>}
     */
    public write<T>(type: string | Realm.ObjectClass | Function, properties: T & Realm.ObjectPropsType, update?: boolean) : Promise<T> {
        return new Promise((resolve, reject) => {
            console.log(this.realm);
            this.realm
                .then((r:Realm) => {
                    r.write(() => {
                        resolve(r.create(type, properties));
                    })
                })
                .catch(err => { reject(err) })
        })

    }

}