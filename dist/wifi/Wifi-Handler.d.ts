import Network from "./Network";
import Parser from "./Parser";
import WifiProfile from "./profiles/WifiProfile";
declare abstract class WifiHandler {
    protected commandTypes: {
        SCAN: string;
        SAVED: string;
        DELETE: string;
        CREATE: string;
    };
    protected interface: string;
    protected debug: boolean;
    protected parser: Parser;
    constructor(config?: {
        interface: string;
        debug: boolean;
    });
    scan(): Promise<Network[]>;
    getSavedNetworks(): Promise<Network[]>;
    existsNetwork(ssid: any): Promise<boolean>;
    deleteNetwork(ssid: any): Promise<void>;
    createNetwork(profile: WifiProfile): Promise<Network>;
    protected abstract getCommand(option: string): string;
    protected abstract getArgs(option: string, config?: any): string[];
    private getCurrentConfig;
    private execute;
    private showDebug;
    private getEnvVars;
    private configure;
}
export default WifiHandler;
