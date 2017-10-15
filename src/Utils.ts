import * as randomBytes from 'randombytes';
import {PrivateKey} from './ValueObjects';

export default class Utils {

    /**
     *
     * @returns {PrivateKey}
     */
    public manufakturPrivKey() : PrivateKey {

        return new PrivateKey(randomBytes(32));

    }

}