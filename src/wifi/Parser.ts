/**
 * Parser interface.
 * Author: Alejandro Gomez @agomezmoron
 */

import Network from "./Network";

interface Parser {

    /**
     * Custom parse for the scan utility.
     * @param input to be parsed.
     * @param config any extra needed configuration.
     */
    parseScan(input, config?): Network[];

    /**
     * Custom parse for the saved networks utility.
     * @param input to be parsed.
     * @param config any extra needed configuration.
     */
    parseSavedNetworks(input, config?): Network[];

    /**
     * Custom parse for the created networks utility.
     * @param input to be parsed.
     * @param config any extra needed configuration.
     */
    parseCreated(input, config?): Network;

}

export default Parser;