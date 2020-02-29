/**
 * WifiHandler interface.
 * Author: Alejandro Gomez @agomezmoron
 */

/**
 * Interface that every handler should implement.
 * @description Interface that every handler should implement.
 */
abstract class WifiHandler {

    private interface : string = undefined; // by default
    private debug : boolean = false; // by default

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor (config : {
        interface : string,
        debug : boolean
    }) {
        this.configure(config);
    }

    abstract scan() : string[] ;

    /**
     * Method to configure the Handler.
     * It configures the internal attributes.
     */
    private configure(config) {
        if (config && config.debug) {
            this.debug = true;
        }
        if (config && config.interface) {
            this.interface = config.interface;
        }
    }

}

export default WifiHandler;
