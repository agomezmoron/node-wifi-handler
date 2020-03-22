"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = __importDefault(require("../Network"));
const NetworkUtils_1 = __importDefault(require("../util/NetworkUtils"));
class WindowsParser {
    parseScan(input, config) {
        const networks = [];
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
            if (networksTmp[i] && networksTmp[i].length > 0) {
                network = new Network_1.default();
                network.mac = networkTmp[4] ? networkTmp[4].match(/.*?:\s(.*)/)[1] : '';
                network.bssid = network.mac;
                network.ssid = networkTmp[0] ? networkTmp[0].match(/.*?:\s(.*)/)[1] : '';
                network.channel = networkTmp[7]
                    ? parseInt(networkTmp[7].match(/.*?:\s(.*)/)[1])
                    : -1;
                network.frequency = network.channel
                    ? parseInt(NetworkUtils_1.default.frequencyFromChannel(network.channel))
                    : 0;
                network.signal_level = networkTmp[5]
                    ? NetworkUtils_1.default.dBFromQuality(networkTmp[5].match(/.*?:\s(.*)/)[1])
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
    parseSavedNetworks(input, config) {
        const networks = [];
        input = input
            .toString('utf8')
            .split('\r')
            .join('')
            .split('\n');
        input.forEach(line => {
            console.log('Line: ' + line);
            let lineParts = line.split(':');
            lineParts.forEach((value, index, lineParts) => {
                lineParts[index] = value.split(/\s/).join('');
            });
            lineParts = lineParts.filter(item => item);
            if (lineParts.length == 2) {
                let network = new Network_1.default();
                network.ssid = lineParts[1];
                networks.push(network);
            }
        });
        return networks;
    }
}
exports.default = WindowsParser;
//# sourceMappingURL=WindowsParser.js.map