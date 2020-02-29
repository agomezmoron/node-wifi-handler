import LinuxHandler from "../linux/LinuxHandler";

/**
 * Set of utilities to work with the networks.
 **/

class NetworkUtils {

    private channels = {};

    // cf [wlan channels frequency](https://en.wikipedia.org/wiki/List_of_WLAN_channels)
    private frequency = 2412;

    constructor() {
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

    /**
     * It retrieves the frequency for the given channel.
     * @param channelId to look for its frequency.
     */
    public frequencyFromChannel(channelId) : string {
        return this.channels[parseInt(channelId)];
    }

    /**
     * It calculates the dB from the given quality.
     * @param quality to calculate its dB.
     */
    public dBFromQuality(quality) : number {
        return parseFloat(quality) / 2 - 100;
    }

    /**
     * It calculates the quality from the given dB.
     * @param db to calculate its quality.
     */
    public qualityFromDB(db) : number {
        return 2 * (parseFloat(db) + 100);
    }
}

export default new NetworkUtils();