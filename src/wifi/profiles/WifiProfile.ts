import WifiHandler from "../Wifi-Handler";

/**
 * WifiProfile as an abstraction of a typical wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

abstract class WifiProfile {

    ssid : string;

    constructor(ssid : string) {
        this.ssid = ssid;
    }

}

export default WifiProfile;