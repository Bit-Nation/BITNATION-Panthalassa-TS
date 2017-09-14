import fs = require('fs');

import FileSystemInterface from './FileSystemInterface'
import Path = require('path');
import Ipfs from "../Ipfs";
import {IpfsAddedFileResponse} from "../ValueObjects";
const IpfsNode = require('ipfs');

export class NodeJsFs implements FileSystemInterface
{

    /**
     *
     * @param {string} repoPath
     * @param {typeof Path} path
     * @param {Ipfs} ipfs
     */
    constructor(private repoPath: string, private path: typeof Path, private ipfs: Ipfs) { }

    private encoding: 'utf8';

    /**
     *
     * @param {string} fileName
     * @param {string} content
     * @returns {Promise<string>}
     */
    writeFile(fileName: string, content: string): Promise<IpfsAddedFileResponse> {

        let filePath = this.path.normalize(this.repoPath+fileName);

        return new Promise<IpfsAddedFileResponse>((resolve, reject) => {

            fs.writeFile(filePath, content, this.encoding, (err) => {

                //Reject on error
                if(err){
                    reject(err);
                }

                //Add file to ipfs
                this.ipfs.addFile(fileName, new Buffer(content))
                    .then((ipfsFile: IpfsAddedFileResponse) => {
                        resolve(ipfsFile);
                    })
                    .catch((err) => {
                        reject(err);
                    });

            });

        });
    }
}

export function create(repoPath: string) : NodeJsFs
{
    return new NodeJsFs(repoPath, Path, new Ipfs(new IpfsNode()));
}
