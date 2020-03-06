import WifiHandler from "./wifi/Wifi-Handler";
declare const WifiWrapper: {
    getWifiHandler(config?: {
        interface?: string;
        debug?: boolean;
    }): WifiHandler;
};
export default WifiWrapper;
