import FsUtil from './FsUtil';
import Repo from './Repo';
import fs = require('fs');

//Create Fs Util
let fsUtil = new FsUtil(fs);

//Create Repo
let repo = new Repo(fsUtil);

export default {
    repo
}
