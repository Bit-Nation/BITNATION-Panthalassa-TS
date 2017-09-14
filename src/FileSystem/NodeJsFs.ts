import fs = require('fs');

import FileSystemInterface from './FileSystemInterface'
import Path = require('path');

export default class NodeJsFs implements FileSystemInterface
{

    /**
     *
     * @param {string} repoPath
     * @param {typeof Path} path
     */
    constructor(private repoPath: string, private path: typeof Path) { }

    private encoding: 'utf8';

    /**
     *
     * @param {string} fileName
     * @param {string} content
     * @returns {Promise<string>}
     */
    writeFile(fileName: string, content: string): Promise<string> {

        let filePath = this.path.normalize(this.repoPath+fileName);

        return new Promise<string>((resolve, reject) => {

            fs.writeFile(filePath, content, this.encoding, function(err){

                if(err){
                    reject(err);
                }

                resolve(filePath);

            });

        });
    }
}