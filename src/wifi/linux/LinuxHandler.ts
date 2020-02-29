/**
 * WifiHandler for Linux.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../wifi-handler";
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

    getScanCommand(): string {
        return 'nmcli';
    }

    getScanArgs(): string[] {
        const args = [];
        args.push('--terse');
        args.push('--fields');
        args.push(
            'active,ssid,bssid,mode,chan,freq,signal,security,wpa-flags,rsn-flags'
        );
        args.push('device');
        args.push('wifi');
        args.push('list');

        if (!!this.interface) {
            args.push('ifname');
            args.push(this.interface);
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

                    network.ssid = fields[1].replace(/&&/g, ':');
                    network.bssid = fields[2].replace(/&&/g, ':');
                    network.mode = fields[3].replace(/&&/g, ':');
                    network.channel = parseInt(fields[4].replace(/&&/g, ':'));
                    network.frecuency = parseInt(fields[5].replace(/&&/g, ':'));
                    network.signalLevel = NetworkUtils.dBFromQuality(fields[6].replace(/&&/g, ':'));
                    network.quality = parseFloat(fields[6].replace(/&&/g, ':'));
                    network.security = fields[7].replace(/&&/g, ':') != '(none)' ? fields[7].replace(/&&/g, ':') : 'none';
                    network.securityFlags = {
                        wpa: fields[8].replace(/&&/g, ':'),
                        rsn: fields[9].replace(/&&/g, ':')
                    };

                    networks.push(network);
                }
            }
        }

        return networks;
    }

}

export default LinuxHandler;
