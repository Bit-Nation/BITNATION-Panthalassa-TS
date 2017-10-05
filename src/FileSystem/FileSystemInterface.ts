export class FileDoesNotExistError extends Error{}

export interface FileSystemInterface {

    /**
     *
     * @param {string} fileName
     * @param {string} content
     * @returns {Promise<string>}
     */
    writeFile(fileName: string, content: string): Promise<{}>

    /**
     *
     * @param {string} fileName
     * @returns {boolean}
     */
    fileExist(fileName: string): Promise<{}>;

    /**
     *
     * @param {string} fileName
     * @returns {Promise<string>}
     */
    readFile(fileName:string) : Promise<{}>;

}