import WPAEnterpriseProfile from "./WPAEnterpriseProfile";
declare class WPAEAPTTLSProfile extends WPAEnterpriseProfile {
    username: string;
    password: string;
    constructor(ssid: string, username: string, password: string);
}
export default WPAEAPTTLSProfile;
