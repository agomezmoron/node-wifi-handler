/**
 * WifiHandler interface.
 * Author: Alejandro Gomez @agomezmoron
 */

import * as child from 'child_process';
import Network from "./Network";
import ParserFactory from "./util/ParserFactory";
import Parser from "./Parser";
import WifiProfile from "./profiles/WifiProfile";

/**
 * Interface that every handler should implement.
 * @description Interface that every handler should implement.
 */
abstract class WifiHandler {

    protected commandTypes = {
        SCAN: 'scan',
        SAVED: 'saved',
        DELETE: 'delete',
        CREATE: 'create'
    };
    protected interface: string = undefined; // by default
    protected debug: boolean = false; // by default
    protected parser: Parser = null;

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
        this.parser = ParserFactory.getInstance();
    }

    /**
     * Scan mode to retrieve the Networks that are in the range.
     */
    async scan(): Promise<Network[]> {
        return new Promise<Network[]>((resolve, reject) => {
            this.execute(this.getCommand(this.commandTypes.SCAN), this.getArgs(this.commandTypes.SCAN))
                .then(result => {
                    resolve(this.parser.parseScan(result, this.getCurrentConfig()));
                })
                .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
        });
    }

    /**
     * It retrieves all the saved networks.
     */
    async getSavedNetworks(): Promise<Network[]> {
        return new Promise<Network[]>((resolve, reject) => {
            this.execute(this.getCommand(this.commandTypes.SAVED), this.getArgs(this.commandTypes.SAVED))
                .then(result => {
                    resolve(this.parser.parseSavedNetworks(result, this.getCurrentConfig()));
                })
                .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
        });
    }

    /**
     * It checks if a network exists by ssid.
     * @param ssid to check if it exists.
     */
    async existsNetwork(ssid): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.getSavedNetworks().then(networks => {
                resolve(networks.find(network => network.ssid == ssid) !== undefined);
            }).catch(err => {
                reject(false);
            });
        });
    }

    /**
     * It deletes a network - if exists.
     * @param ssid to be deleted.
     */
    async deleteNetwork(ssid): Promise<void> {
        return new Promise<void>((resolve, reject) => {
            this.existsNetwork(ssid).then(exists => {
                if (exists) {
                    this.execute(this.getCommand(this.commandTypes.DELETE), this.getArgs(this.commandTypes.DELETE, {ssid: ssid}))
                        .then(output => {
                            resolve();
                        })
                        .catch(err => {
                            this.showDebug(err);
                            reject(err);
                        })
                } else {
                    resolve();
                }
            }).catch(err => {
                this.showDebug(err);
                reject(false);
            });
        });
    }

    /**
     * It creates a network (but if shouldn't exists!).
     * @param profile to be created.
     */
    async createNetwork(profile: WifiProfile): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.existsNetwork(profile.ssid)
                .then(exists => {
                    if (exists) {
                        this.showDebug('The network exists and it shouldn\'t');
                        reject(null);
                    } else {
                        this.execute(this.getCommand(this.commandTypes.CREATE), this.getArgs(this.commandTypes.CREATE, {profile: profile}))
                            .then(result => {
                                // once connected, the profile should exist
                                this.existsNetwork(profile.ssid)
                                    .then(exists => {
                                        if (exists) {
                                            resolve(true);
                                        } else {
                                            reject(false);
                                        }
                                    })
                                    .catch(err => {
                                        reject(false);
                                    })
                            })
                            .catch(err => {
                                this.showDebug(err);
                                resolve(false);
                            });
                    }
                })
                .catch(err => {
                    this.showDebug(err);
                    resolve(false);
                });
        });
    }

    /**
     * Command for the given option.
     * @param option to get the specific command.
     */
    protected abstract getCommand(option: string): string;

    /**
     * Args for the given option.
     * @param option to get the specific Args.
     * @param config extra parameters.
     */
    protected abstract getArgs(option: string, config?): string[];

    /**
     * It retrieves all the current config of the handler as an Object.
     */
    private getCurrentConfig() {
        return {interface: this.interface, debug: this.debug};
    }

    /**
     * Method to wrap the command execution.
     * @param command to be executed.
     * @param args of the command.
     */
    private execute(command: string, args: string[]): Promise<any> {
        const exec = child.execFile;
        const envVars = this.getEnvVars();
        return new Promise((resolve, reject) => {
            this.showDebug(command + ' ' + args.join(' '));
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
