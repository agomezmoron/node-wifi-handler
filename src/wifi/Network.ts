/**
 * Network interface.
 */

/**
 * Network interface
 * @description It describes a network.
 */
class Network {
    bssid : string;
    ssid : string;
    mode : string;
    //channel: number;
    frecuency : number;
    signalLevel : number;
    quality: number;
    security: string;
    securityFlags : Object;
}

export default Network;
