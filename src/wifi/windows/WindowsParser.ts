/**
 * Windows parser class.
 * Author: Alejandro Gomez @agomezmoron
 */

import Parser from "../Parser"
import Network from "../Network";
import NetworkUtils from "../util/NetworkUtils";

class WindowsParser implements Parser{

    /**
     * Custom parser for Windows for the scan output.
     * @param input
     * @param config
     */
    parseScan(input, config?): Network[] {
        const networks: Network[] = [];

        //TODO

        return networks;
    }

    /**
     * Custom parser for Windows for the saved networks output.
     * @param input
     * @param config
     */
    parseSavedNetworks(input, config?): Network[] {
        const networks: Network[] = [];

        // TODO

        return networks;
    }

}

export default WindowsParser;