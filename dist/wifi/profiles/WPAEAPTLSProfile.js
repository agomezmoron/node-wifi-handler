"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WPAEnterpriseProfile_1 = __importDefault(require("./WPAEnterpriseProfile"));
class WPAEAPTLSProfile extends WPAEnterpriseProfile_1.default {
    constructor(ssid) {
        super(ssid);
        this.eapType = 13;
    }
    applyConfig(config) {
        super.applyConfig(config);
        this.clientCertificate = config.clientCertificate;
        this.passphrase = config.passphrase;
    }
}
exports.default = WPAEAPTLSProfile;
//# sourceMappingURL=WPAEAPTLSProfile.js.map