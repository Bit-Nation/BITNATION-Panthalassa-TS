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
     * @param {(r: Realm) => Realm.Object} writeAction
     * @returns {Promise<Realm.Object>}
     */
    public write(writeAction: (r:Realm) => Realm.Object) : Promise<Realm.Object> {

        return new Promise((resolve, reject) => {
            this.realm
                .then(r => {
                    r.write(() => {
                        resolve(writeAction(r));
                    })
                })
                .catch(err => { reject(err) })
        })

    }

}