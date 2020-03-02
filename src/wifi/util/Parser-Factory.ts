/**
 * Simple factory depending on the OS.
 * Author: Alejandro Gomez @agomezmoron
 */

import Parser from "../Parser";
import LinuxHandler from "../linux/LinuxHandler";
import LinuxParser from "../linux/LinuxParser";

/**
 * Parser factory to build parsers depending on the OS.
 * @description Main class to expose the plugin utilities.
 */
abstract class ParserFactory {

    /**
     * Method to get an instance of ScanParser depending on the OS.
     */
  public static getInstance() : Parser {
      let instance : Parser = null;
      switch (process.platform) {
          case 'linux':
              instance = new LinuxParser();
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

export default ParserFactory;
