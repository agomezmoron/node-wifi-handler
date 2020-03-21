"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wifi_Handler_1 = __importDefault(require("../Wifi-Handler"));
const WPAPersonalProfile_1 = __importDefault(require("../profiles/WPAPersonalProfile"));
const WPAEAPPEAPProfile_1 = __importDefault(require("../profiles/WPAEAPPEAPProfile"));
const WPAEAPTTLSProfile_1 = __importDefault(require("../profiles/WPAEAPTTLSProfile"));
const WPAEAPTLSProfile_1 = __importDefault(require("../profiles/WPAEAPTLSProfile"));
const FileSystemUtil_1 = __importDefault(require("../util/FileSystemUtil"));
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
    getWifiInterfaceName() {
        return new Promise((resolve, reject) => {
            this.execute('iw', ['dev', '|', 'grep', '-Po', "\'^\\sInterface\\s\\K.*$\'"])
                .then(name => {
                resolve(name);
            })
                .catch(err => {
                reject(err);
            });
        });
    }
    getWPASupplicantConf(profile) {
        let conf = "network={\n" +
            "  ssid=\"" + profile.ssid + "\"\n" +
            "  priority=1\n";
        if (profile instanceof WPAEAPPEAPProfile_1.default || profile instanceof WPAEAPTTLSProfile_1.default) {
            conf += "  key_mgmt=WPA-EAP\n";
            if (profile instanceof WPAEAPPEAPProfile_1.default) {
                const castedProfile = profile;
                conf += "  identity=\"" + castedProfile.username + "\"\n" +
                    "  password=\"" + castedProfile.password + "\"\n" +
                    "  eap=PEAP\n";
            }
            else {
                const castedProfile = profile;
                conf += "  identity=\"" + castedProfile.username + "\"\n" +
                    "  password=\"" + castedProfile.password + "\"\n" +
                    "  eap=TLS\n";
            }
            conf += "  pairwise=CCMP\n" + this.getWPASupplicantCAParts(profile) + "\n" +
                "  altsubject_match=\"" + profile.serverNames.join(';') + "\"\n" +
                "  phase2=\"auth=" + profile.authenticationMethod + "\"\n" +
                "  anonymous_identity=\"" + profile.anonymous + "\"\n";
        }
        else if (profile instanceof WPAEAPTLSProfile_1.default) {
            const castedProfile = profile;
            conf += "  key_mgmt=WPA-EAP \n" +
                "  anonymous_identity=\"" + profile.anonymous + "\"\n" +
                "  eap=TLS\n +" +
                "  pairwise=CCMP\n" + this.getWPASupplicantCAParts(profile) + "\n" +
                "  altsubject_match=\"" + profile.serverNames.join(';') + "\"\n" +
                "  phase2=\"auth=" + profile.authenticationMethod + "\"\n" +
                "  client_cert=\"" + castedProfile.clientCertificate + "\"\n" +
                "  private_key=\"" + castedProfile.privateClientKey + "\"\n" +
                "  private_key_passwd=\"" + castedProfile.passphrase + "\"\n";
        }
        conf += "}";
        return conf;
    }
    getWPASupplicantCAParts(profile) {
        let caParts = '';
        let cont = 1;
        profile.caCertificates.forEach(caPath => {
            if (cont > 1) {
                caParts += "\nca_cert" + cont + "=\"" + caPath;
            }
            else {
                caParts += "ca_cert=\"" + caPath;
            }
            cont++;
        });
        return caParts;
    }
    createAnEnterpiseNetwork(profile) {
        return new Promise((resolve, reject) => {
            this.existsNetwork(profile.ssid)
                .then(exists => {
                if (exists) {
                    this.showDebug('The network exists and it shouldn\'t');
                    reject(null);
                }
                else {
                    const filePath = FileSystemUtil_1.default.writeInATempFile(this.getWPASupplicantConf(profile), 'conf');
                    this.getWifiInterfaceName()
                        .then(interfaceName => {
                        this.execute('wpa_supplicant', ['-B', '-i', 'interface', interfaceName, '-c', filePath])
                            .then(result => {
                            resolve(true);
                        })
                            .catch(err => {
                            reject(false);
                        });
                    })
                        .catch(err => {
                        reject(false);
                    });
                }
            })
                .catch(err => {
                this.showDebug(err);
                resolve(false);
            });
        });
    }
}
exports.default = LinuxHandler;
//# sourceMappingURL=LinuxHandler.js.map