import WPAEnterpriseProfile from "./WPAEnterpriseProfile";
declare class WPAEAPPEAPProfile extends WPAEnterpriseProfile {
    username: string;
    password: string;
    constructor(ssid: string, username: string, password: string);
}
export default WPAEAPPEAPProfile;
