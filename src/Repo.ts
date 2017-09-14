import {About} from "./ValueObjects";
import FileSystemInterface from './FileSystem/FileSystemInterface';

export default class Repo
{

    constructor(private fs: FileSystemInterface) {}

    /**
     *
     * @param {About} about
     * @returns {Repo}
     */
    public setAbout(about: About) : Promise<string>
    {
        return this.fs.writeFile('about.json', JSON.stringify(about));
    }

}