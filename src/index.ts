import FsUtil from './FsUtil';
import Repo from './Repo';
import fs = require('fs');
import About from './ValueObjects/About'

export default class PanthalassaApi
{

    private repo:Repo;

    constructor()
    {
        //Create Fs Util
        let fsUtil = new FsUtil(fs);

        //Create Repo
        this.repo = new Repo(fsUtil);
    }

    /**
     * @param about
     */
    public setAbout(about: About) : PanthalassaApi
    {
        this.repo.setAbout(about);

        return this;
    }

}