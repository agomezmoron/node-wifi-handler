/**
 * Network interface.
 */

/**
 * Network interface
 * @description It describes a network.
 */
interface Network {
    bssid : string;
    ssid : string;
    channel: string;
    frecuency : number;
    signalLevel : string;
    quality: string;
    security: string;
    securityFlags : string[];
}

export default Network;
