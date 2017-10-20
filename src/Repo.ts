import {About} from "./ValueObjects";
import FileSystemInterface from 'BITNATION-Panthalassa-TS-fs-interface/FileSystemInterface';
import EthUtils from "./EthWallet/EthUtils";
import {EthKeyDoesNotExist} from './Errors';

export default class Repo
{

    /**
     *
     * @param {FileSystemInterface} fs
     * @param {EthUtils} ethUtils
     */
    constructor(private fs: FileSystemInterface, private ethUtils:EthUtils) {}

    /**
     *
     * @param {About} about
     * @returns {Promise<void>}
     */
    setAbout(about: About) : Promise<void>
    {
        return new Promise( (resolve, reject)  => {

            this.ethUtils.hasPrivKey()
                .then(hasPrivKey => {

                    // Reject and exist if there is no private key
                    if(false === hasPrivKey){
                        reject(new EthKeyDoesNotExist("Please create an eth key first"));
                        return;
                    }

                    // Write about information
                    this.fs.writeFile('about.json', JSON.stringify(about))
                        .then(result => resolve(result))
                        .catch(error => reject(error));

                })
                .catch(error => reject(error));

        });

    }

}