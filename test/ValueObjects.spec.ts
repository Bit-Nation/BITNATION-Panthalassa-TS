import {About, PrivateKey, IpfsAddedFileResponse} from "../src/ValueObjects";

describe('test value objects', () => {

    test('eth address test', async () => {

        const about:About = new About(
            "pseudo",
            "base64..",
            "0x000b75fcdc15d41277deb033c72d2c8d774ccced",
            "I am a unicorn"
        );

        expect(about.getPseudo()).toBe("pseudo");
        expect(about.getImage()).toBe("base64..");
        expect(about.getDescription()).toBe("I am a unicorn");
        expect(about.getEthAddress()).toBe("0x000b75fcdc15d41277deb033c72d2c8d774ccced");

    });

    test("private key test", async () => {

        const privateKeyBuffer = new Buffer('c8ef22dbc9ab6c668840850aa6b7ec7868edf24597da37e5aaa65b772fbc78cb', 'hex');

        const privateKey:PrivateKey = new PrivateKey(privateKeyBuffer);

        expect(privateKey.getPrivKeyBuffer()).toBe(privateKeyBuffer);

        expect(privateKey.getPrivKey()).toBe("c8ef22dbc9ab6c668840850aa6b7ec7868edf24597da37e5aaa65b772fbc78cb");

    });

    test('IpfsAddedFileResponse test', () => {

        const r = new IpfsAddedFileResponse('/example/path', '0x000b75fcdc15d41277deb033c72d2c8d774ccced', 3432);

        expect(r.getHash()).toBe("0x000b75fcdc15d41277deb033c72d2c8d774ccced");
        expect(r.getPath()).toBe('/example/path');
        expect(r.getSize()).toBe(3432);

    })

});