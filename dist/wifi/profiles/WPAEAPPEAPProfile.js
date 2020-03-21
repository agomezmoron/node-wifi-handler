"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WPAEnterpriseProfile_1 = __importDefault(require("./WPAEnterpriseProfile"));
class WPAEAPPEAPProfile extends WPAEnterpriseProfile_1.default {
    constructor(ssid, username, password) {
        super(ssid);
        this.eapType = 23;
        this.username = username;
        this.password = password;
    }
}
exports.default = WPAEAPPEAPProfile;
//# sourceMappingURL=WPAEAPPEAPProfile.js.map