import Repo from './Repo';
import {About} from './ValueObjects'
import FileSystemInterface from './FileSystem/FileSystemInterface'

export default class PanthalassaApi
{

    private repo:Repo;

    /**
     *
     * @param {FileSystemInterface} fs
     */
    constructor(private fs: FileSystemInterface)
    {
        //Create Repo
        this.repo = new Repo(fs);
    }

    /**
     *
     * @param {About} about
     * @returns {Promise<string>}
     */
    public setAbout(about: About) : Promise<string>
    {
        return this.repo.setAbout(about);
    }

}
