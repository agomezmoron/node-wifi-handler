/**
 * WifiHandler interface.
 * Author: Alejandro Gomez @agomezmoron
 */

import * as child from 'child_process';
import Network from "./Network";

/**
 * Interface that every handler should implement.
 * @description Interface that every handler should implement.
 */
abstract class WifiHandler {

    protected comamndTypes = {
        SCAN : 'scan',
        EXIST : 'exist'
    };
    protected interface: string = undefined; // by default
    protected debug: boolean = false; // by default

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor(config?: {
        interface: string,
        debug: boolean
    }) {
        this.configure(config);
    }

    /**
     * Scan mode to retrieve the Networks that are in the range.
     */
    async scan(): Promise<Network[]> {
        return new Promise<Network[]>((resolve, reject) => {
            this.execute(this.getCommand(this.comamndTypes.SCAN), this.getArgs(this.comamndTypes.SCAN))
                .then(result => {
                    resolve(this.parseScanOutput(result));
                })
                .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
        });
    }

    async

    /**
     * Command for the given option.
     */
    protected abstract getCommand(option : string): string;

    /**
     * Args for the given option.
     */
    protected abstract getArgs(option : string): string[];

    /**
     * It parses the scan command output.
     * @param str with the output.
     */
    abstract parseScanOutput(str): Network[];

    /**
     * Method to wrap the command execution.
     * @param command to be executed.
     * @param args of the command.
     */
    private execute(command: string, args: string[]): Promise<any> {
        const exec = child.execFile;
        const envVars = this.getEnvVars();
        return new Promise((resolve, reject) => {
            exec(command, args, envVars, (error, stdout, stderr) => {
                if (error) {
                    reject(error);
                }
                resolve(stdout ? stdout : stderr);
            });
        });
    }

    /**
     * It showes the given message if it's in debug mode.
     * @param msg to be shown.
     */
    private showDebug(msg: string) {
        if (this.debug) {
            console.warn(msg);
        }
    }

    /**
     * It returns to the process.enreturn new Promise((resolve, reject) => {
        });v the ones we want.
     */
    private getEnvVars() {
        return Object.assign(process.env, {
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            LC_MESSAGES: 'en_US.UTF-8',
            encoding: 'utf8'
        });
    }

    /**
     * Method to configure the Handler.
     * It configures the internal attributes.
     */
    private configure(config?) {
        if (config && config.debug) {
            this.debug = true;
        }
        if (config && config.interface) {
            this.interface = config.interface;
        }
    }

}

export default WifiHandler;
