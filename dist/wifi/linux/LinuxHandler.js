"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wifi_Handler_1 = __importDefault(require("../Wifi-Handler"));
const WPAPersonalProfile_1 = __importDefault(require("../profiles/WPAPersonalProfile"));
class LinuxHandler extends Wifi_Handler_1.default {
    constructor(config) {
        super(config);
    }
    getCommand(option) {
        switch (option) {
            case this.commandTypes.SCAN:
            case this.commandTypes.SAVED:
            case this.commandTypes.DELETE:
            case this.commandTypes.CREATE:
                return 'nmcli';
                break;
            default:
                return 'nmcli';
                break;
        }
    }
    getArgs(option, config) {
        let args = [];
        switch (option) {
            case this.commandTypes.SCAN:
                args.push('--terse');
                args.push('--fields');
                args.push('ACTIVE,SSID,BSSID,MODE,FREQ,SIGNAL,SECURITY,WPA-FLAGS,RSN-FLAGS');
                args.push('device');
                args.push('wifi');
                args.push('list');
                if (!!this.interface) {
                    args.push('ifname');
                    args.push(this.interface);
                }
                break;
            case this.commandTypes.SAVED:
                args.push('connection');
                args.push('list');
                break;
            case this.commandTypes.DELETE:
                args.push('connection');
                args.push('delete');
                args.push('id');
                if (!!config && config.ssid) {
                    args.push(config.ssid);
                }
                break;
            case this.commandTypes.CREATE:
                if (!!config && config.profile) {
                    args = this.getCreateArgs(config.profile);
                }
                break;
        }
        return args;
    }
    getCreateArgs(profile) {
        const args = [];
        if (profile instanceof WPAPersonalProfile_1.default) {
            args.push('device');
            args.push('wifi');
            args.push('connect');
            args.push('"' + profile.ssid + '"');
            if (!!profile.password && profile.password != '') {
                args.push('password');
                args.push(profile.password);
            }
        }
        return args;
    }
}
exports.default = LinuxHandler;
//# sourceMappingURL=LinuxHandler.js.map