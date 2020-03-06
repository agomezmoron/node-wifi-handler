import WifiHandler from "../Wifi-Handler";
declare abstract class WifiFactory {
    static getInstance(config?: any): WifiHandler;
}
export default WifiFactory;
