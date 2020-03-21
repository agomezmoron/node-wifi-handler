import WPAEnterpriseProfile from "./WPAEnterpriseProfile";
declare class WPAEAPTLSProfile extends WPAEnterpriseProfile {
    clientCertificate: string;
    privateClientKey: string;
    passphrase: string;
    constructor(ssid: any);
    applyConfig(config: {
        serverNames: string[];
        anonymous: string;
        caCertificates: string[];
        authenticationMethod?: string;
        clientCertificate: string;
        privateClientKey: string;
        passphrase: string;
    }): void;
}
export default WPAEAPTLSProfile;
