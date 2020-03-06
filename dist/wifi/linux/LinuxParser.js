"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Network_1 = __importDefault(require("../Network"));
const NetworkUtils_1 = __importDefault(require("../util/NetworkUtils"));
class LinuxParser {
    parseScan(input, config) {
        const networks = [];
        var lines = input.split('\n');
        if (!!config && config.interface) {
            lines.shift();
        }
        for (var i = 0; i < lines.length; i++) {
            if (lines[i] != '' && lines[i].includes(':')) {
                var fields = lines[i].replace(/\\:/g, '&&').split(':');
                if (fields.length >= 9) {
                    const network = new Network_1.default();
                    network.ssid = fields[1].replace(/&&/g, ':')
                        .replace('\'', '').replace('\'', '');
                    network.bssid = fields[2].replace(/&&/g, ':');
                    network.mode = fields[3].replace(/&&/g, ':');
                    network.frecuency = parseInt(fields[4].replace(/&&/g, ':'));
                    network.signalLevel = NetworkUtils_1.default.dBFromQuality(fields[5].replace(/&&/g, ':'));
                    network.quality = parseFloat(fields[5].replace(/&&/g, ':'));
                    network.security = fields[6].replace(/&&/g, ':') != '(none)' ? fields[6].replace(/&&/g, ':') : 'none';
                    network.securityFlags = {
                        wpa: fields[7].replace(/&&/g, ':'),
                        rsn: fields[8].replace(/&&/g, ':')
                    };
                    networks.push(network);
                }
            }
        }
        return networks;
    }
    parseSavedNetworks(input, config) {
        const networks = [];
        var lines = input.split('\n');
        for (var i = 1; i < lines.length; i++) {
            if (lines[i] != '' && lines[i].includes(' ')) {
                var fields = lines[i].split(" ").filter(Boolean);
                if (fields.length >= 4) {
                    const network = new Network_1.default();
                    network.ssid = fields[0];
                    network.bssid = fields[1];
                    network.mode = fields[2];
                    networks.push(network);
                }
            }
        }
        return networks;
    }
    parseCreated(input, config) {
        console.log(input);
        return null;
    }
}
exports.default = LinuxParser;
//# sourceMappingURL=LinuxParser.js.map