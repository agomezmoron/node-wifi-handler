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
Object.defineProperty(exports, "__esModule", { value: true });
const child = __importStar(require("child_process"));
class WifiHandler {
    constructor(config) {
        this.interface = undefined;
        this.debug = false;
        this.configure(config);
    }
    execute(command, args) {
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
    scan() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                this.execute(this.getScanCommand(), this.getScanArgs())
                    .then(result => {
                    resolve(this.parseScanOutput(result));
                })
                    .catch(err => {
                    this.showDebug(err);
                    reject([]);
                });
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
//# sourceMappingURL=wifi-handler.js.map