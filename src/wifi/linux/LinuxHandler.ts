/**
 * WifiHandler for Linux.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import WifiProfile from "../profiles/WifiProfile";
import WPAPersonalProfile from "../profiles/WPAPersonalProfile";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";

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
        } else if (profile instanceof WPAEnterpriseProfile) {
            // TODO: complete here

        }
        return args;
    }

    private getWPASupplicantConf(profile: WPAEnterpriseProfile) {

    }

}

export default LinuxHandler;
