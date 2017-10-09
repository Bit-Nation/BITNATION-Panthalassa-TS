import {randomBytes} from 'crypto';
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