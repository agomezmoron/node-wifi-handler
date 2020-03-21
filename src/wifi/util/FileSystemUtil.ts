/**
 * Simple factory depending on the OS.
 * Author: Alejandro Gomez @agomezmoron
 */

import * as fs from 'fs';
import * as path from 'path';
import * as os from 'os';

/**
 * Utility class to work with the FileSystem in any OS.
 * @description Utility class to work with the FileSystem in any OS.
 */
abstract class FileSystemUtil {

    /**
     * It creates a temporal folder in the temporal OS folder.
     * @param name of the folder to be created.
     */
    static createTempFile(name: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const folderPath = path.join(os.tmpdir(), name);
            fs.mkdtemp(folderPath, (err, folder) => {
                if (err) {
                    reject(err);
                }
                resolve(folderPath);
            });
        });
    }

    /**
     * It writes the content in a created temporal file.
     * @param content to be written.
     * @param extension of the file to be created.
     * @return the path of the created file.
     */
    static writeInATempFile(content: string, extension: string): string {
        const filePath = path.join(os.tmpdir(), Date.now() + '.' + extension);
        fs.writeFileSync(filePath, content);
        return filePath;
    }

    /**
     * It removes the given file path.
     * @param filePath to be removed.
     */
    static removeFile(filePath: string) {
        fs.unlinkSync(filePath);
    }

    /**
     * It removes the given folder path.
     * @param folderPath to be removed.
     */
    static removeFolder(folderPath: string) {
        /**
         * Remove directory recursively
         * @param {string} dir_path
         * @see https://stackoverflow.com/a/42505874/3027390
         */
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(function (entry) {
                var entry_path = path.join(folderPath, entry);
                if (fs.lstatSync(entry_path).isDirectory()) {
                    FileSystemUtil.removeFolder(entry_path);
                } else {
                    fs.unlinkSync(entry_path);
                }
            });
            fs.rmdirSync(folderPath);
        }

    }
}

export default FileSystemUtil;
