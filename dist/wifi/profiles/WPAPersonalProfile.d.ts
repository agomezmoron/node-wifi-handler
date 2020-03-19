import WifiProfile from "./WifiProfile";
declare class WPAPersonalProfile extends WifiProfile {
    password: string;
    constructor(ssid: string);
    applyConfig(config: {
        password: string;
    }): void;
}
export default WPAPersonalProfile;
