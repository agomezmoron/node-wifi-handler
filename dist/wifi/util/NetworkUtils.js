"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NetworkUtils {
    constructor() {
        this.channels = {};
        this.frequency = 2412;
        for (var i = 1; i < 15; i++) {
            this.channels[i] = this.frequency.toString();
            this.frequency = this.frequency + 5;
        }
        this.frequency = 5180;
        for (var j = 36; j <= 64; j += 2) {
            this.channels[j] = this.frequency.toString();
            this.frequency += 10;
        }
        this.frequency = 5500;
        for (var k = 100; k <= 144; k += 2) {
            this.channels[k] = this.frequency.toString();
            this.frequency += 10;
        }
        this.frequency = 5745;
        for (var l = 149; l <= 161; l += 2) {
            this.channels[l] = this.frequency.toString();
            this.frequency += 10;
        }
        this.frequency = 5825;
        for (var m = 165; m <= 173; m += 4) {
            this.channels[m] = this.frequency.toString();
            this.frequency += 20;
        }
    }
    frequencyFromChannel(channelId) {
        return this.channels[parseInt(channelId)];
    }
    dBFromQuality(quality) {
        return parseFloat(quality) / 2 - 100;
    }
    qualityFromDB(db) {
        return 2 * (parseFloat(db) + 100);
    }
}
exports.default = new NetworkUtils();
//# sourceMappingURL=NetworkUtils.js.map