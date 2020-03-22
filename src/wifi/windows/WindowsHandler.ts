/**
 * WifiHandler for Windows.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import WifiProfile from "../profiles/WifiProfile";
import WPAPersonalProfile from "../profiles/WPAPersonalProfile";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";
import WPAEAPPEAPProfile from "../profiles/WPAEAPPEAPProfile"
import WPAEAPTTLSProfile from "../profiles/WPAEAPTTLSProfile"
import WPAEAPTLSProfile from "../profiles/WPAEAPTLSProfile"
import FileSystemUtil from "../util/FileSystemUtil"

/**
 * Wifi handler for Winows OS.
 * It uses https://docs.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh
 * @description Wifi handler for Windows OS.
 */
class WindowsHandler extends WifiHandler {

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor(config) {
        super(config);
    }

    protected getCommand(option: string): string {
        switch (option) {
            case this.commandTypes.SCAN:
                return 'netsh';
                break;
            case this.commandTypes.SAVED:
            case this.commandTypes.DELETE:
            case this.commandTypes.CREATE:
                return '';// TODO
                break;
            default:
                return '';// TODO
                break;
        }
    }

    protected getArgs(option: string, config?): string[] {
        let args = [];
        switch (option) {
            case this.commandTypes.SCAN:
                args.push('wlan');
                args.push('show');
                args.push('networks');
                args.push('mode=Bssid');
                break;
            case this.commandTypes.SAVED:
                // TODO
                break;
            case this.commandTypes.DELETE:
                // TODO
                break;
            case this.commandTypes.CREATE:
                // TODO
                break;
        }
        return args;
    }

    /**
     * In this handler we overrides this function to create an enterprise network.
     * @param profile WPAEnterpriseProfile to be configured.
     */
    async createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            // TODO
        });
    }
}

export default WindowsHandler;
