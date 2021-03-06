"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const LinuxHandler_1 = __importDefault(require("../linux/LinuxHandler"));
const WindowsHandler_1 = __importDefault(require("../windows/WindowsHandler"));
class WifiFactory {
    static getInstance(config) {
        let instance = null;
        switch (process.platform) {
            case 'linux':
                instance = new LinuxHandler_1.default(config);
                break;
            case 'darwin':
                break;
            case 'win32':
                instance = new WindowsHandler_1.default(config);
                break;
        }
        return instance;
    }
}
exports.default = WifiFactory;
//# sourceMappingURL=WifiFactory.js.map