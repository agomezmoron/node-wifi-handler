/**
 * WifiHandler for Linux.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import Network from "../Network";
import NetworkUtils from "../util/NetworkUtils";

/**
 * Wifi handler for Linux OS.
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

    protected getCommand(option : string): string {
        switch (option) {
            case this.commandTypes.SCAN:
            case this.commandTypes.SAVED:
            case this.commandTypes.DELETE:
                return 'nmcli';
                break;
            default:
                return 'nmcli';
                break;
        }
    }

    protected getArgs(option : string, config?): string[] {
        const args = [];
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
        }
        return args;
    }

}

export default LinuxHandler;
