"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wifi_Factory_1 = __importDefault(require("./wifi/util/Wifi-Factory"));
const WifiWrapper = {
    getWifiHandler(config) {
        return Wifi_Factory_1.default.getInstance(config);
    }
};
exports.default = WifiWrapper;
//# sourceMappingURL=index.js.map