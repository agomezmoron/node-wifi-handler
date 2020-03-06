import WifiHandler from "../wifi-handler";
declare abstract class WifiFactory {
    static getInstance(config?: any): WifiHandler;
}
export default WifiFactory;
