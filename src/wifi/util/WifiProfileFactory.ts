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
     *     username_: 'username' // for ENTERPRISE
     *     type: WifiProfile.PERSONAL or WifiProfile.ENTERPRISE,
     *     password: '[Optional] Only valid for the WifiProfile.PERSONAL networks',
     *     caCertificates: '[Optional] Array with all the certificates (paths)
     *     anonymous: '[Optional] Anonymous identity for the configuration',
     *     clientCertificate: [Optional] Path to the client certificate,
     *     passphrase: [Optional (but mandatory if clientCertificate is given) of the clientCertificate
     * }
     */
    public static getInstance(config: {
        ssid: string,
        username?: string, // ENTERPRISE
        password?: string,
        type: string, // PERSONAL or ENTERPRISE
        eapType?: number // only for ENTERPRISE
        caCertificates: string[], // ENTERPRISE
        serverNames?: string, // ENTERPRISE
        anonymous?: string, // ENTERPRISE
        clientCertificate?: string, // ENTERPRISE
        passphrase?: string // ENTERPRISE
    }): WifiProfile {
        let instance: WifiProfile = null;

        switch (config.type) {
            case WifiProfile.ENTERPRISE:
                switch (config.eapType) {
                    case 13:
                        instance = new WPAEAPTLSProfile(config.ssid);
                        break;
                    case 23:
                        instance = new WPAEAPPEAPProfile(config.ssid, config.username, config.password);
                        break;
                    case 21:
                    default:
                        instance = new WPAEAPTTLSProfile(config.ssid, config.username, config.password);
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
