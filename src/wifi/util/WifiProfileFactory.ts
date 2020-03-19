/**
 * Simple factory for WifiProfiles.
 * Author: Alejandro Gomez @agomezmoron
 */
import WifiProfile from "../profiles/WifiProfile";
import WPAPersonalProfile from "../profiles/WPAPersonalProfile";
import WPAEAPPEAPProfile from "../profiles/WPAEAPPEAPProfile";
import WPAEAPTLSProfile from "../profiles/WPAEAPTLSProfile";
import WPAEAPTTLSProfile from "../profiles/WPAEAPTTLSProfile";

/**
 * Simple factory to create WifiProfile depending on an Object element.
 * @description Factory to build WifiProfile instances.
 */
abstract class WifiProfileFactory {

    /**
     * Method to get an instance of WifiProfile depending the given configuration.
     * config = {
     *     ssid: 'SSID of the wifi',
     *     type: WifiProfile.PERSONAL or WifiProfile.ENTERPRISE,
     *     password: '[Optional] Only valid for the WifiProfile.PERSONAL networks',
     *     caCertificates: '[Optional] Array with all the CACertificates with the format -----BEGIN CERTIFICATE-----xxx-----END CERTIFICATE-----',
     *     anonymous: '[Optional] Anonymous identity for the configuration',
     *
     * }
     */
    public static getInstance(config: {
        ssid: string,
        password?: string,
        type: string, // PERSONAL or ENTERPRISE
        eapType?: number // only for ENTERPRISE
        caCertificates: string[],
        serverNames?: string,
        anonymous?: string,
        clientCertificate?: string,
        passphrase?: string
    }): WifiProfile {
        let instance: WifiProfile = null;

        switch (config.type) {
            case WifiProfile.ENTERPRISE:
                switch (config.eapType) {
                    case 13:
                        instance = new WPAEAPTLSProfile(config.ssid);
                        break;
                    case 23:
                        instance = new WPAEAPPEAPProfile(config.ssid);
                        break;
                    case 21:
                    default:
                        instance = new WPAEAPTTLSProfile(config.ssid);
                        break;

                }
                instance.applyConfig(config);
                break;
            case WifiProfile.PERSONAL:
                instance = new WPAPersonalProfile(config.ssid);
            default:
        }

        return instance;
    }

}

export default WifiProfileFactory;
