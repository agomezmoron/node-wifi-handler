/**
 * Windows parser class.
 * Author: Alejandro Gomez @agomezmoron
 */

import Parser from "../Parser"
import Network from "../Network";
import NetworkUtils from "../util/NetworkUtils";

class WindowsParser implements Parser {

    /**
     * Custom parser for Windows for the scan output.
     * @param input
     * @param config
     */
    parseScan(input, config?): Network[] {
        const networks: Network[] = [];

        // This part was copied from https://github.com/friedrith/node-wifi/blob/master/src/windows-scan.js#L17
        input = input
            .toString('utf8')
            .split('\r')
            .join('')
            .split('\n')
            .slice(5, input.length);

        let numNetworks = -1;
        let currentLine = 0;
        let networkTmp;
        let networksTmp = [];
        let network;

        for (let i = 0; i < input.length; i++) {
            if (input[i] === '') {
                numNetworks++;
                networkTmp = input.slice(currentLine, i);
                networksTmp.push(networkTmp);
                currentLine = i + 1;
            }
        }

        for (let i = 0; i < numNetworks; i++) {
            // skip empty networks
            if (networksTmp[i] && networksTmp[i].length > 0) {
                network = new Network();

                network.mac = networkTmp[4] ? networkTmp[4].match(/.*?:\s(.*)/)[1] : '';
                network.bssid = network.mac;
                network.ssid = networkTmp[0] ? networkTmp[0].match(/.*?:\s(.*)/)[1] : '';
                network.channel = networkTmp[7]
                    ? parseInt(networkTmp[7].match(/.*?:\s(.*)/)[1])
                    : -1;
                network.frequency = network.channel
                    ? parseInt(NetworkUtils.frequencyFromChannel(network.channel))
                    : 0;
                network.signal_level = networkTmp[5]
                    ? NetworkUtils.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1])
                    : Number.MIN_VALUE;
                network.quality = networkTmp[5]
                    ? parseFloat(networkTmp[5].match(/.*?:\s(.*)/)[1])
                    : 0;
                network.security = networkTmp[2] ? networkTmp[2].match(/.*?:\s(.*)/)[1] : '';
                network.security_flags = networkTmp[3]
                    ? networkTmp[3].match(/.*?:\s(.*)/)[1]
                    : '';
                network.mode = 'Unknown';

                networks.push(network);
            }
        }

        return networks;
    }

    /**
     * Custom parser for Windows for the saved networks output.
     * @param input
     * @param config
     */
    parseSavedNetworks(input, config?): Network[] {
        const networks: Network[] = [];

        input = input
            .toString('utf8')
            .split('\r')
            .join('')
            .split('\n');

        input.forEach( line => {
            console.log('Line: ' + line);
            let lineParts = line.split(':');
            // trimming all the parts
            lineParts.forEach((value, index, lineParts) => {
                lineParts[index] = value.split(/\s/).join('');
            });
            // removing the empty strings
            lineParts =  lineParts.filter(item => item);
            // if the line is candidate
            if (lineParts.length == 2) {
                // building the Network object
                let network: Network = new Network();
                network.ssid = lineParts[1];
                networks.push(network);
            }
        });

        return networks;
    }

}

export default WindowsParser;