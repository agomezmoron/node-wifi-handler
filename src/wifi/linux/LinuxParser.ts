/**
 * Linux Scan parser class.
 * Author: Alejandro Gomez @agomezmoron
 */

import Parser from "../Parser"
import Network from "../Network";
import NetworkUtils from "../util/NetworkUtils";

class LinuxParser implements Parser{

    /**
     * Custom parser for Linux for the scan output.
     * @param input
     * @param config
     */
    parseScan(input, config?): Network[] {
        const networks: Network[] = [];

        var lines = input.split('\n');

        if (!!config && config.interface) {
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

    /**
     * Custom parser for Linux for the saved networks output.
     * @param input
     * @param config
     */
    parseSavedNetworks(input, config?): Network[] {
        const networks: Network[] = [];

        var lines = input.split('\n');
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] != '' && lines[i].includes(' ')) {
                var fields = lines[i].split(" ").filter(Boolean);
                if (fields.length >= 4) {
                    const network: Network = new Network();

                    network.ssid = fields[0];
                    network.bssid = fields[1];
                    network.mode = fields[2];

                    networks.push(network);
                }
            }
        }

        return networks;
    }

}

export default LinuxParser;