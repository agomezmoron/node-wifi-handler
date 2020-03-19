"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WifiProfile_1 = __importDefault(require("./WifiProfile"));
class WPAEnterpriseProfile extends WifiProfile_1.default {
    constructor(ssid) {
        super(ssid);
        this.serverNames = [];
        this.anonymous = '';
        this.caCertificates = [];
    }
    applyConfig(config) {
        if (!!config.serverNames) {
            this.serverNames = config.serverNames;
        }
        if (!!config.anonymous) {
            this.anonymous = config.anonymous;
        }
        if (!!config.caCertificates) {
            this.caCertificates = config.caCertificates;
        }
        if (!!config.authenticationMethod) {
            this.authenticationMethod = config.authenticationMethod;
        }
    }
}
WPAEnterpriseProfile.AUTH_MSCHAP = 'MSCHAP';
WPAEnterpriseProfile.AUTH_MSCHAPv2 = 'MSCHAPv2';
WPAEnterpriseProfile.AUTH_PAP = 'PAP';
WPAEnterpriseProfile.AUTH_GTC = 'GTC';
exports.default = WPAEnterpriseProfile;
//# sourceMappingURL=WPAEnterpriseProfile.js.map