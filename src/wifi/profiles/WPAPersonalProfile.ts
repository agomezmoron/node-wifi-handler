import WifiProfile from "./WifiProfile";

/**
 * WPAPersonalProfile as an abstraction of a typical WPA Personal wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAPersonalProfile extends WifiProfile {

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

export default WPAPersonalProfile;