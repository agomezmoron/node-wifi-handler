/**
 * Simple factory depending on the OS.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "./wifi/wifi-handler";
import LinuxHandler from "./wifi/linux/LinuxHandler";

/**
 * Main class to expose the plugin utilities.
 * @description Main class to expose the plugin utilities.
 */
abstract class OSFactory {

  public static getInstance(config) : WifiHandler {
    const instance : WifiHandler = null;

    switch (process.platform) {
        case 'linux':
          instance = new LinuxHandler();
          break;
        case 'darwin':
          // macOS
          break;
        case 'win32':
          break;
    }
    return instance;
  }

};

export default OSFactory;
