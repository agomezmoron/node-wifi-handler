/**
 * Simple factory depending on the OS.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import LinuxHandler from "../linux/LinuxHandler";
import WindowsHandler from "../windows/WindowsHandler"

/**
 * Factory to build WifiHandlers.
 * @description Factory to build WifiHandlers.
 */
abstract class WifiFactory {

    /**
     * Method to get an instance of WifiHandler depending on the OS.
     * @param config optional config about debug or interface name.
     */
    public static getInstance(config?): WifiHandler {
        let instance: WifiHandler = null;

        switch (process.platform) {
            case 'linux':
                instance = new LinuxHandler(config);
                break;
            case 'darwin':
                // macOS
                break;
            case 'win32':
                instance = new WindowsHandler(config);
                break;
        }
        return instance;
    }

}

export default WifiFactory;
