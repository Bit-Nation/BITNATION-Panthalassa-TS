import fs = require('fs');
import {FileSystemInterface, FileDoesNotExistError} from './FileSystemInterface'
import Path = require('path');

export class NodeJsFs implements FileSystemInterface
{

    /**
     *
     * @param {string} repoPath
     * @param {typeof Path} path
     */
    constructor(private repoPath: string, private path: typeof Path) { }

    private encoding: 'utf8';

    /**
     * Write file to filesystem
     *
     * @param {string} fileName
     * @param {string} content
     * @returns {Promise<string>}
     */
    writeFile(fileName: string, content: string): Promise<{}> {

        let filePath = this.path.normalize(this.repoPath+fileName);

        return new Promise((resolve, reject) => {

            fs.writeFile(filePath, content, this.encoding, (err) => {

                if(err){
                    reject(err);
                }

                resolve(filePath)

            });

        });

    }

    /**
     *
     * @param {string} fileName
     * @returns {Promise<string>}
     */
    readFile(fileName:string) : Promise<{}> {

        let filePath = this.path.normalize(this.repoPath+fileName);

        return new Promise(((resolve, reject) => {

            this.fileExist(fileName)
                .then(writtenFileName => {

                    fs.readFile(filePath, 'utf8', (err, data) => {

                        if(err){
                            reject(err);
                        }

                        resolve(data);

                    });


                })
                .catch(err => reject(err))

        }));

    }

    /**
     *
     * @param {string} fileName
     * @returns {boolean}
     */
    fileExist(fileName:string) : Promise<{}> {

        let filePath = this.path.normalize(this.repoPath+fileName);

        return new Promise((resolve, reject) => {

            fs.access(filePath, fs.constants.R_OK | fs.constants.W_OK, (err) => {

                if(err){
                    reject(err);
                }

                resolve(true);

            });

        });

    }

}

/**
 *
 * @param {string} repoPath
 * @returns {NodeJsFs}
 */
export function factory(repoPath: string) : NodeJsFs
{
    return new NodeJsFs(repoPath, Path);
}
