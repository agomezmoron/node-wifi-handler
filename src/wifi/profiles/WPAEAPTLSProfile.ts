import WPAEnterpriseProfile from "./WPAEnterpriseProfile";

/**
 * WPAEAPTLSProfile as an abstraction of a typical WPA EAP Profile (EAP type 13) wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEAPTLSProfile extends WPAEnterpriseProfile {

    /**
     * Path to the certificate.
     */
    clientCertificate: string;

    passphrase: string;

    constructor(ssid) {
        super(ssid);
        this.eapType = 13;
    }

    applyConfig(config: {
        serverNames: string[],
        anonymous: string,
        caCertificates: string []
        authenticationMethod?: string
        clientCertificate: string,
        passphrase: string
    }) {
        super.applyConfig(config);
        this.clientCertificate = config.clientCertificate;
        this.passphrase = config.passphrase;
    }

}

export default WPAEAPTLSProfile;