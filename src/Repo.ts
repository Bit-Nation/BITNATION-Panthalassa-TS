import {About} from "./ValueObjects";
import FileSystemInterface from './FileSystem/FileSystemInterface';
import {IpfsAddedFileResponse} from './ValueObjects'

export default class Repo
{

    constructor(private fs: FileSystemInterface) {}

    /**
     *
     * @param {About} about
     * @returns {Repo}
     */
    public setAbout(about: About) : Promise<IpfsAddedFileResponse>
    {
        return this.fs.writeFile('about.json', JSON.stringify(about));
    }

}