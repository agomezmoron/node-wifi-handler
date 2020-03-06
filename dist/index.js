"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Wifi_Factory_1 = __importDefault(require("./wifi/util/Wifi-Factory"));
const WPAPersonalProfile_1 = __importDefault(require("./wifi/profiles/WPAPersonalProfile"));
const WifiWrapper = {
    getWifiHandler(config) {
        return Wifi_Factory_1.default.getInstance(config);
    }
};
exports.default = WifiWrapper;
const handler = WifiWrapper.getWifiHandler({ debug: true });
const profile = new WPAPersonalProfile_1.default('Alejandro\'s iPhone', 'pixones2006');
handler.createNetwork(profile)
    .then(output => console.log('OK: ' + output))
    .catch(err => console.error('ERROR:' + err));
//# sourceMappingURL=index.js.map