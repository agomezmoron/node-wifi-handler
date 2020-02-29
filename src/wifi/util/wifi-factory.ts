/**
 * Simple factory depending on the OS.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../wifi-handler";
import LinuxHandler from "../linux/LinuxHandler";

/**
 * Main class to expose the plugin utilities.
 * @description Main class to expose the plugin utilities.
 */
abstract class WifiFactory {

  public static getInstance(config) : WifiHandler {
    let instance : WifiHandler = null;

    switch (process.platform) {
        case 'linux':
          instance = new LinuxHandler(config);
          break;
        case 'darwin':
          // macOS
          break;
        case 'win32':
          break;
    }
    return instance;
  }

}

export default WifiFactory;
