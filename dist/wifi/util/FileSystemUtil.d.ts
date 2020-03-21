declare abstract class FileSystemUtil {
    static createTempFile(name: string): Promise<string>;
    static writeInATempFile(content: string, extension: string): string;
    static removeFile(filePath: string): void;
    static removeFolder(folderPath: string): void;
}
export default FileSystemUtil;
