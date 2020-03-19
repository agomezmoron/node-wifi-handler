"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const WifiFactory_1 = __importDefault(require("./wifi/util/WifiFactory"));
const WifiWrapper = {
    getWifiHandler(config) {
        return WifiFactory_1.default.getInstance(config);
    }
};
exports.default = WifiWrapper;
//# sourceMappingURL=index.js.map