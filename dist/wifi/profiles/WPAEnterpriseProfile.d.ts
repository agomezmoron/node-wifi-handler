import WifiProfile from "./WifiProfile";
declare class WPAEnterpriseProfile extends WifiProfile {
    static readonly AUTH_MSCHAP = "MSCHAP";
    static readonly AUTH_MSCHAPv2 = "MSCHAPv2";
    static readonly AUTH_PAP = "PAP";
    static readonly AUTH_GTC = "GTC";
    eapType: number;
    serverNames: string[];
    anonymous: string;
    caCertificates: string[];
    authenticationMethod: string;
    constructor(ssid: string);
    applyConfig(config: {
        serverNames?: string[];
        anonymous?: string;
        caCertificates?: string[];
        authenticationMethod?: string;
    }): void;
}
export default WPAEnterpriseProfile;
