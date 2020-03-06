import WifiProfile from "./WifiProfile";
declare class WPAPersonalProfile extends WifiProfile {
    password: string;
    constructor(ssid: string, password: string);
}
export default WPAPersonalProfile;
