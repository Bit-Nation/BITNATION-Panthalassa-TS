import {About} from "./ValueObjects";
import {FileSystemInterface} from './FileSystem/FileSystemInterface';
import {EthUtils} from "./EthWallet/EthUtils";
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
     * @returns {Promise<string>}
     */
    async setAbout(about: About) : Promise<{}>
    {
        //Exit if no eth key is present
        if(! await this.ethUtils.hasPrivKey()){
            throw new EthKeyDoesNotExist("Please create an eth key first");
        }

        return this.fs.writeFile('about.json', JSON.stringify(about));
    }

}