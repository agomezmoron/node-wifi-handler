import WifiProfile from "./WifiProfile";

/**
 * WPAEnterpriseProfile as an abstraction of a typical WPA Enterprise wifi profile.
 * Author: Alejandro Gomez @agomezmoron
 */

class WPAEnterpriseProfile extends WifiProfile {

    static readonly AUTH_MSCHAP = 'MSCHAP';
    static readonly AUTH_MSCHAPv2 = 'MSCHAPv2';
    static readonly AUTH_PAP = 'PAP';
    static readonly AUTH_GTC = 'GTC';

    eapType: number;

    serverNames: string [] = [];

    anonymous: string = '';

    /**
     * Paths to the certificate files.
     */
    caCertificates: string [] = [];

    /**
     * Optional parameter
     */
    authenticationMethod: string;

    constructor(ssid: string) {
        super(ssid);
    }

    applyConfig(config: {
        serverNames?: string[],
        anonymous?: string,
        caCertificates?: string []
        authenticationMethod?: string
    }) {
        if (!!config.serverNames) {
            this.serverNames = config.serverNames;
        }
        if (!!config.anonymous) {
            this.anonymous = config.anonymous;
        }
        if (!!config.caCertificates) {
            this.caCertificates = config.caCertificates;
        }
        if (!!config.authenticationMethod) {
            this.authenticationMethod = config.authenticationMethod;
        }
    }

}

export default WPAEnterpriseProfile;