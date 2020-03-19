import WifiHandler from "../Wifi-Handler";

/**
 * WifiProfile as an abstraction of a typical wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

abstract class WifiProfile {

    static readonly PERSONAL: string = 'PERSONAL';
    static readonly ENTERPRISE: string = 'ENTERPRISE';

    ssid : string;

    constructor(ssid : string) {
        this.ssid = ssid;
    }

    abstract applyConfig(config);

}

export default WifiProfile;