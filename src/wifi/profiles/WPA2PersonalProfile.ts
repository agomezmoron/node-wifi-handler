import WifiProfile from "./WifiProfile";

/**
 * WPA2PersonalProfile as an abstraction of a typical WPA Personal wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPA2PersonalProfile extends WifiProfile {

    password: string;

    constructor(ssid : string) {
        super(ssid);
    }

    applyConfig(config: {
        password: string
    }) {
        this.password = config.password;
    }

}

export default WPA2PersonalProfile;