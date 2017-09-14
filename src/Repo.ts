import {About} from "./ValueObjects";
import FsUtil from "./FsUtil";

export default class Repo
{

    constructor(private fsUtil: FsUtil) {}

    /**
     *
     * @param {About} about
     * @returns {Repo}
     */
    public setAbout(about: About) : Repo
    {
        this.fsUtil.writeFile('about.json', JSON.stringify(about));

        return this;
    }

}