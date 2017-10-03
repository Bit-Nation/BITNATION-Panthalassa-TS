import Repo from './Repo';
import FileSystemInterface from './FileSystem/FileSystemInterface'
import {About, IpfsAddedFileResponse} from "./ValueObjects";

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
     * @returns {Promise<IpfsAddedFileResponse>}
     */
    public setAbout(about: About) : Promise<IpfsAddedFileResponse>
    {
        return this.repo.setAbout(about);
    }

}
