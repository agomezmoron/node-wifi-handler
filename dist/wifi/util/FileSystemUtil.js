"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const os = __importStar(require("os"));
class FileSystemUtil {
    static createTempFile(name) {
        return new Promise((resolve, reject) => {
            const folderPath = path.join(os.tmpdir(), name);
            fs.mkdtemp(folderPath, (err, folder) => {
                if (err) {
                    reject(err);
                }
                resolve(folderPath);
            });
        });
    }
    static writeInATempFile(content, extension) {
        const filePath = path.join(os.tmpdir(), Date.now() + '.' + extension);
        fs.writeFileSync(filePath, content);
        return filePath;
    }
    static removeFile(filePath) {
        fs.unlinkSync(filePath);
    }
    static removeFolder(folderPath) {
        if (fs.existsSync(folderPath)) {
            fs.readdirSync(folderPath).forEach(function (entry) {
                var entry_path = path.join(folderPath, entry);
                if (fs.lstatSync(entry_path).isDirectory()) {
                    FileSystemUtil.removeFolder(entry_path);
                }
                else {
                    fs.unlinkSync(entry_path);
                }
            });
            fs.rmdirSync(folderPath);
        }
    }
}
exports.default = FileSystemUtil;
//# sourceMappingURL=FileSystemUtil.js.map