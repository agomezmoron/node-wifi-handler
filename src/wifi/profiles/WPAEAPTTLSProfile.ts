import WPAEnterpriseProfile from "./WPAEnterpriseProfile";

/**
 * WPAEAPTLSProfile as an abstraction of a typical WPA EAP TTLS Profile (EAP type 21) wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEAPTTLSProfile extends WPAEnterpriseProfile {

    constructor(ssid: string) {
        super(ssid);
        this.eapType = 21;
    }

}

export default WPAEAPTLSProfile;