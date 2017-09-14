export default interface FileSystemInterface {

    writeFile(fileName: string, content: string): Promise<string>

}