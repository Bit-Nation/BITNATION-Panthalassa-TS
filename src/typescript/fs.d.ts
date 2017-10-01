declare module 'fs' {

    //@todo this is a tmp fix for: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/20157
    export function copyFileSync(src:string, dest:string, flags?:number);

}