"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WifiProfile_1 = __importDefault(require("./WifiProfile"));
class WPAPersonalProfile extends WifiProfile_1.default {
    constructor(ssid) {
        super(ssid);
    }
    applyConfig(config) {
        this.password = config.password;
    }
}
exports.default = WPAPersonalProfile;
//# sourceMappingURL=WPAPersonalProfile.js.map