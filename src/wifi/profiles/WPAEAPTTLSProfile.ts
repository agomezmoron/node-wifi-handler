import WPAEnterpriseProfile from "./WPAEnterpriseProfile";

/**
 * WPAEAPTLSProfile as an abstraction of a typical WPA EAP TTLS Profile (EAP type 21) wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEAPTTLSProfile extends WPAEnterpriseProfile {

    username: string;

    password: string;

    constructor(ssid: string, username: string, password: string) {
        super(ssid);
        this.eapType = 21;
        this.username = username;
        this.password = password;
    }

}

export default WPAEAPTLSProfile;