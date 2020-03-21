/**
 * WifiHandler for Linux.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import WifiProfile from "../profiles/WifiProfile";
import WPAPersonalProfile from "../profiles/WPAPersonalProfile";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";
import WPAEAPPEAPProfile from "../profiles/WPAEAPPEAPProfile"
import WPAEAPTTLSProfile from "../profiles/WPAEAPTTLSProfile"
import FileSystemUtil from "../util/FileSystemUtil"

/**
 * Wifi handler for Linux OS.
 * It uses https://developer.gnome.org/NetworkManager/stable/nmcli.html
 * @description Wifi handler for Linux OS.
 */
class LinuxHandler extends WifiHandler {

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor(config) {
        super(config);
    }

    protected getCommand(option: string): string {
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

    protected getArgs(option: string, config?): string[] {
        let args = [];
        switch (option) {
            case this.commandTypes.SCAN:
                args.push('--terse');
                args.push('--fields');
                //args.push('ACTIVE,SSID,BSSID,MODE,FREQ,SIGNAL,SECURITY,WPA-FLAGS,RSN-FLAGS,CHAN');
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

    private getCreateArgs(profile: WifiProfile): string[] {
        const args = [];
        if (profile instanceof WPAPersonalProfile) {
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

    /**
     * Method that builds all the wpa_supplicant configuration.
     * @param profile
     */
    private getWPASupplicantConf(profile: WPAEnterpriseProfile): string {
        // https://linux.die.net/man/5/wpa_supplicant.conf
        let conf: string = "network={\n" +
            "  ssid=\"" + profile.ssid + "\"\n" +
            "  priority=1\n";
        if (profile instanceof WPAEAPPEAPProfile || profile instanceof WPAEAPTTLSProfile) {

            conf += "  key_mgmt=WPA-EAP\n";
            if (profile instanceof WPAEAPPEAPProfile) {
                const castedProfile: WPAEAPPEAPProfile = profile;
                conf += "  identity=\"" + castedProfile.username + "\"\n" +
                    "  password=\"" + castedProfile.password + "\"\n" +
                    "  eap=PEAP\n";
            } else {
                const castedProfile: WPAEAPTTLSProfile = profile;
                conf += "  identity=\"" + castedProfile.username + "\"\n" +
                    "  password=\"" + castedProfile.password + "\"\n" +
                    "  eap=TLS\n";
            }
            conf += "  pairwise=CCMP\n" + this.getWPASupplicantCAParts(profile) + "\n" +
                "  altsubject_match=\"" + profile.serverNames.join(';') + "\"\n" +
                "  phase2=\"auth=" + profile.authenticationMethod + "\"\n" +
                "  anonymous_identity=\"" + profile.anonymous + "\"\n";
        } else {
            // EAP 13: TODO
        }
        conf += "}";
        return conf;
    }

    /**
     * It builds all the CA part related to multiple CA (if exists).
     * @param profile to be used.
     */
    private getWPASupplicantCAParts(profile: WPAEnterpriseProfile): string {
        let caParts = '';
        let cont = 1;
        profile.caCertificates.forEach(caPath => {
            if (cont > 1) {
                caParts += "\nca_cert" + cont + "=\"" + caPath;
            } else {
                caParts += "ca_cert=\"" + caPath;
            }
            cont++;
        });
        return caParts;
    }

    /**
     * In this handler we overrides this function to create an enterprise network.
     * @param profile
     */
    async createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.existsNetwork(profile.ssid)
                .then(exists => {
                    if (exists) {
                        this.showDebug('The network exists and it shouldn\'t');
                        reject(null);
                    } else {
                        const filePath = FileSystemUtil.writeInATempFile(this.getWPASupplicantConf(profile), 'conf');
                        //TODO: perform the wpa_supplicant command
                    }
                })
                .catch(err => {
                    this.showDebug(err);
                    resolve(false);
                });
        });
    }
}

export default LinuxHandler;
