"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WifiProfile_1 = __importDefault(require("../profiles/WifiProfile"));
const WPAPersonalProfile_1 = __importDefault(require("../profiles/WPAPersonalProfile"));
const WPAEAPPEAPProfile_1 = __importDefault(require("../profiles/WPAEAPPEAPProfile"));
const WPAEAPTLSProfile_1 = __importDefault(require("../profiles/WPAEAPTLSProfile"));
const WPAEAPTTLSProfile_1 = __importDefault(require("../profiles/WPAEAPTTLSProfile"));
class WifiProfileFactory {
    static getInstance(config) {
        let instance = null;
        switch (config.type) {
            case WifiProfile_1.default.ENTERPRISE:
                switch (config.eapType) {
                    case 13:
                        instance = new WPAEAPTLSProfile_1.default(config.ssid);
                        break;
                    case 23:
                        instance = new WPAEAPPEAPProfile_1.default(config.ssid);
                        break;
                    case 21:
                    default:
                        instance = new WPAEAPTTLSProfile_1.default(config.ssid);
                        break;
                }
                instance.applyConfig(config);
                break;
            case WifiProfile_1.default.PERSONAL:
                instance = new WPAPersonalProfile_1.default(config.ssid);
            default:
        }
        return instance;
    }
}
exports.default = WifiProfileFactory;
//# sourceMappingURL=WifiProfileFactory.js.map