import fs = require('fs');

export default class FsUtil
{

    /**
     * @param nodeFs
     */
    constructor(private nodeFs: typeof fs){}

    /**
     *
     * @param {string} fileName
     * @param {string} content
     */
    public writeFile(fileName: string, content: string)
    {
        this.nodeFs.writeFileSync(fileName, content)
    }

}