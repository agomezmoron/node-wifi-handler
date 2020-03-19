import WifiProfile from "../profiles/WifiProfile";
declare abstract class WifiProfileFactory {
    static getInstance(config: {
        ssid: string;
        password?: string;
        type: string;
        eapType?: number;
        caCertificates: string[];
        serverNames?: string;
        anonymous?: string;
        clientCertificate?: string;
        passphrase?: string;
    }): WifiProfile;
}
export default WifiProfileFactory;
