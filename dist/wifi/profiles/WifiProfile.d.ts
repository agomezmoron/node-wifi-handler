declare abstract class WifiProfile {
    static readonly PERSONAL: string;
    static readonly ENTERPRISE: string;
    ssid: string;
    constructor(ssid: string);
    abstract applyConfig(config: any): any;
}
export default WifiProfile;
