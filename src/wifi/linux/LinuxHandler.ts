/**
 * WifiHandler for Linux.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../wifi-handler";

/**
 * Wifi handler for Linux OS.
 * @description Wifi handler for Linux OS.
 */
class LinuxHandler extends WifiHandler{

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor (config) {
        super(config);
    }

    scan() : string[] {
        const networks : string[] = [];




        return networks;
    }

}

export default LinuxHandler;
