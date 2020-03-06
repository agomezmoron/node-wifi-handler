import WifiProfile from "./WifiProfile";

/**
 * WPAPersonalProfile as an abstraction of a typical WPA Personal wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAPersonalProfile extends WifiProfile{

    password: string;

    constructor(ssid : string, password: string) {
        super(ssid);
        this.password = password;
    }

}

export default WPAPersonalProfile;