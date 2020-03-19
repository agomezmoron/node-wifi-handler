"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinuxParser_1 = __importDefault(require("../linux/LinuxParser"));
class ParserFactory {
    static getInstance() {
        let instance = null;
        switch (process.platform) {
            case 'linux':
                instance = new LinuxParser_1.default();
                break;
            case 'darwin':
                break;
            case 'win32':
                break;
        }
        return instance;
    }
}
exports.default = ParserFactory;
//# sourceMappingURL=ParserFactory.js.map