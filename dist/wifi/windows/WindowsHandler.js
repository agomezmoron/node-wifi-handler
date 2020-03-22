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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wifi_Handler_1 = __importDefault(require("../Wifi-Handler"));
class WindowsHandler extends Wifi_Handler_1.default {
    constructor(config) {
        super(config);
    }
    getCommand(option) {
        switch (option) {
            case this.commandTypes.SCAN:
            case this.commandTypes.SAVED:
            case this.commandTypes.DELETE:
            case this.commandTypes.CREATE:
                return '';
                break;
            default:
                return '';
                break;
        }
    }
    getArgs(option, config) {
        let args = [];
        switch (option) {
            case this.commandTypes.SCAN:
                break;
            case this.commandTypes.SAVED:
                break;
            case this.commandTypes.DELETE:
                break;
            case this.commandTypes.CREATE:
                break;
        }
        return args;
    }
    createAnEnterpiseNetwork(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
            });
        });
    }
}
exports.default = WindowsHandler;
//# sourceMappingURL=WindowsHandler.js.map