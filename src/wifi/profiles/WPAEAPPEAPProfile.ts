import WPAEnterpriseProfile from "./WPAEnterpriseProfile";

/**
 * WPAEAPTLSProfile as an abstraction of a typical WPA EAP PEAP Profile (EAP type 23) wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEAPPEAPProfile extends WPAEnterpriseProfile {

    constructor(ssid: string) {
        super(ssid);
        this.eapType = 23;
    }

}

export default WPAEAPPEAPProfile;