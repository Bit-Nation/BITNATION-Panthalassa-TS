# BITNATION-Panthalassa-TS
This is a TypeScript(TS) implementation of [panthalassa](https://docs.google.com/document/d/1qdniz9XerITfhinkZev98w2vnSKkP4p5iwqYk4ajK-Y/edit?ts=5968c50e#heading=h.5x0d5h95i329). TS is a compiled programming laguage. In the case of typescript it get's compiled to normal JavaScript(JS). The compiled JS can found in the dist folder.

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