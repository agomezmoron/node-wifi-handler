"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child = __importStar(require("child_process"));
const Parser_Factory_1 = __importDefault(require("./util/Parser-Factory"));
class WifiHandler {
    constructor(config) {
        this.commandTypes = {
            SCAN: 'scan',
            SAVED: 'saved',
            DELETE: 'delete',
            CREATE: 'create'
        };
        this.interface = undefined;
        this.debug = false;
        this.parser = null;
        this.configure(config);
        this.parser = Parser_Factory_1.default.getInstance();
    }
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.execute(this.getCommand(this.commandTypes.SCAN), this.getArgs(this.commandTypes.SCAN))
                    .then(result => {
                    resolve(this.parser.parseScan(result, this.getCurrentConfig()));
                })
                    .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
            });
        });
    }
    getSavedNetworks() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.execute(this.getCommand(this.commandTypes.SAVED), this.getArgs(this.commandTypes.SAVED))
                    .then(result => {
                    resolve(this.parser.parseSavedNetworks(result, this.getCurrentConfig()));
                })
                    .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
            });
        });
    }
    existsNetwork(ssid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.getSavedNetworks().then(networks => {
                    resolve(networks.find(network => network.ssid == ssid) !== undefined);
                }).catch(err => {
                    reject(false);
                });
            });
        });
    }
    deleteNetwork(ssid) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.existsNetwork(ssid).then(exists => {
                    if (exists) {
                        this.execute(this.getCommand(this.commandTypes.DELETE), this.getArgs(this.commandTypes.DELETE, { ssid: ssid }))
                            .then(output => {
                            resolve();
                        })
                            .catch(err => {
                            this.showDebug(err);
                            reject(err);
                        });
                    }
                    else {
                        resolve();
                    }
                }).catch(err => {
                    this.showDebug(err);
                    reject(false);
                });
            });
        });
    }
    createNetwork(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.existsNetwork(profile.ssid)
                    .then(exists => {
                    if (exists) {
                        this.showDebug('The network exists and it shouldn\'t');
                        reject(null);
                    }
                    else {
                        this.execute(this.getCommand(this.commandTypes.CREATE), this.getArgs(this.commandTypes.CREATE, { profile: profile }))
                            .then(result => {
                            this.existsNetwork(profile.ssid)
                                .then(exists => {
                                if (exists) {
                                    resolve(true);
                                }
                                else {
                                    reject(false);
                                }
                            })
                                .catch(err => {
                                reject(false);
                            });
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
        });
    }
    getCurrentConfig() {
        return { interface: this.interface, debug: this.debug };
    }
    execute(command, args) {
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
    showDebug(msg) {
        if (this.debug) {
            console.warn(msg);
        }
    }
    getEnvVars() {
        return Object.assign(process.env, {
            LANG: 'en_US.UTF-8',
            LC_ALL: 'en_US.UTF-8',
            LC_MESSAGES: 'en_US.UTF-8',
            encoding: 'utf8'
        });
    }
    configure(config) {
        if (config && config.debug) {
            this.debug = true;
        }
        if (config && config.interface) {
            this.interface = config.interface;
        }
    }
}
exports.default = WifiHandler;
//# sourceMappingURL=Wifi-Handler.js.map