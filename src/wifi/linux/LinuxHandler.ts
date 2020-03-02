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
            case this.comamndTypes.SCAN:
            case this.comamndTypes.EXIST:
                return 'nmcli';
                break;
            default:
                return 'nmcli';
                break;
        }
    }

    protected getArgs(option : string): string[] {
        const args = [];
        switch (option) {
            case this.comamndTypes.SCAN:
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
            case this.comamndTypes.EXIST:
                args.push('connection');
                args.push('list');
                break;
        }
        return args;
    }

    parseScanOutput(str): Network[] {
        const networks: Network[] = [];

        var lines = str.split('\n');

        if (!!this.interface) {
            lines.shift();
        }

        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != '' && lines[i].includes(':')) {
                var fields = lines[i].replace(/\\:/g, '&&').split(':');
                if (fields.length >= 9) {
                    const network: Network = new Network();

                    network.ssid = fields[1].replace(/&&/g, ':')
                        .replace('\'', '').replace('\'', '');
                    network.bssid = fields[2].replace(/&&/g, ':');
                    network.mode = fields[3].replace(/&&/g, ':');
                    network.frecuency = parseInt(fields[4].replace(/&&/g, ':'));
                    network.signalLevel = NetworkUtils.dBFromQuality(fields[5].replace(/&&/g, ':'));
                    network.quality = parseFloat(fields[5].replace(/&&/g, ':'));
                    network.security = fields[6].replace(/&&/g, ':') != '(none)' ? fields[6].replace(/&&/g, ':') : 'none';
                    network.securityFlags = {
                        wpa: fields[7].replace(/&&/g, ':'),
                        rsn: fields[8].replace(/&&/g, ':')
                    };
                    //network.channel = parseInt(fields[9].replace(/&&/g, ':'));

                    networks.push(network);
                }
            }
        }

        return networks;
    }

}

export default LinuxHandler;
