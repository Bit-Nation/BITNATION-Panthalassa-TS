import {IpfsAddedFileResponse} from "./ValueObjects";
const IpfsNode = require('ipfs');

export default class Ipfs
{

    private ipfsInstance: Promise<any>;

    constructor(private ipfs: any) {

        this.ipfsInstance = new Promise<any>((resolve, reject) => {

            ipfs.on('error', (err: any) => {
                reject(err);
            });

            //Resolve if is already online
            if(ipfs.isOnline()){
                resolve(ipfs);
            }

            //Resolve on ready
            ipfs.on('ready', () => {
                resolve(ipfs);
            })

        });
        
    };

    /**
     * Adds a file to the ipfs
     * @param {string} fileName
     * @param {Buffer} content
     * @returns {Promise<IpfsAddedFileResponse>}
     */
    public addFile(fileName: string, content: Buffer) : Promise<IpfsAddedFileResponse>
    {
        return new Promise((fulfill, reject) => {
            this.ipfsInstance
                .then(function(ipfs: any){

                    ipfs.files.add([{
                        path: fileName,
                        content: content
                    }], function(err: any, results: Array<{path: string, hash: string, size: number}>){

                        fulfill(new IpfsAddedFileResponse(
                            results[0].path,
                            results[0].hash,
                            results[0].size
                        ))

                    })
                })
                .catch(function(err: any){
                    reject(err);
                })
        });
    }

}