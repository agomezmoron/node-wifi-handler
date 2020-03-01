/**
 * Library entrypoint.
 * Author: Alejandro Gomez @agomezmoron
 */

/**
 * Main class to expose the plugin utilities.
 * @description Main class to expose the plugin utilities.
 */
import WifiHandler from "./wifi/wifi-handler";
import WifiFactory from "./wifi/util/wifi-factory";

const WifiWrapper = {

    /**
     * It gets the needed handler to work with the Wi-Fi.
     * @param config Object with the given configuration with 2 parameters:
     *  - interface: network interface. Optional.
     *  - debug: true if you want to enable the debug mode.
     */
    getWifiHandler(config?: {
        interface: string,
        debug: boolean
    }): WifiHandler {
        return WifiFactory.getInstance(config);
    }

};

export default WifiWrapper;