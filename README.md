[![Build Status](https://semaphoreci.com/api/v1/florianlenz/bitnation-panthalassa-ts/branches/develop/badge.svg)](https://semaphoreci.com/florianlenz/bitnation-panthalassa-ts)

[Docs](http://ipfs.io/ipfs/QmT7ddf1fXwksXqEug44nJFLWdPA6odo7qDv88qfXR8ZBh)

[![Known Vulnerabilities](https://snyk.io/test/github/bit-nation/bitnation-panthalassa-ts/badge.svg)](https://snyk.io/test/github/bit-nation/bitnation-panthalassa-ts)

# BITNATION-Panthalassa-TS
This is a TypeScript(TS) implementation of [Panthalassa](https://docs.google.com/document/d/1qdniz9XerITfhinkZev98w2vnSKkP4p5iwqYk4ajK-Y/edit?ts=5968c50e#heading=h.5x0d5h95i329). TS is a compiled programming laguage. In the case of typescript it get's compiled to normal JavaScript(JS). The compiled JS can found in the dist folder.

### Command's
Run all the command's via the CLI
* `npm run build` compiles the TS to JS

### Contribution & Development
Feel free to have a look at the Issue section and take what ever you want. Feel free to ask questions.

We are using the last LTS node js release (6.11.3).

A docker setup is provided. To use it, please follow the step's:

1. Clone the repository and switch into it
2. Get [docker](https://docker.com)
3. Run `docker-compose up -d` to bring up the container
4. Run `docker-compose exec node bash` to enter the container

**Useful docker commands**
* Run `exit` in the container to exit
* Run `docker-compose down` to destroy the container
* Run `docker-compose stop` to shutdown the container

**Updated the documentation**

1. Get [IPFS](https://ipfs.io/)
2. Start the ipfs daemon `ipfs daemon`
3. Add the docs folder to ipfs (`ipfs add -r docs`)
4. Removed the hash after `../ipfs/` (at the top of this readme file) with the new hash printed in the commandline.

### How to use the Documentation?
First, let me explain the project structure. In the project root you see a `src` folder it contains all the typescript sources files. So when we run `npm run build` the source get's compiled into javascript to the dist folder. So the file `src/EthWallet/EthUtils.ts`(which is the typescript source file) get's compiled to `dist/EthWallet/EthUtils.js`. This is important to understand since the documentation is generated from the `src` folder. So you won't be able to use the `src/EthWallet/EthUtils.ts` instead please use the equivalent file in the `dist` folder. 
