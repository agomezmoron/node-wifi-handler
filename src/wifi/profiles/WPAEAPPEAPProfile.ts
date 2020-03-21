import WPAEnterpriseProfile from "./WPAEnterpriseProfile";

/**
 * WPAEAPTLSProfile as an abstraction of a typical WPA EAP PEAP Profile (EAP type 23) wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEAPPEAPProfile extends WPAEnterpriseProfile {

    username: string;

    password: string;

    constructor(ssid: string, username: string, password: string) {
        super(ssid);
        this.eapType = 23;
        this.username = username;
        this.password = password;
    }

}

export default WPAEAPPEAPProfile;