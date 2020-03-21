/// <reference types="node" />
import Network from "./Network";
import Parser from "./Parser";
import WifiProfile from "./profiles/WifiProfile";
import WPAEnterpriseProfile from "./profiles/WPAEnterpriseProfile";
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
    createNetwork(profile: any): Promise<boolean>;
    abstract createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean>;
    protected isAnPersonalProfile(profile: WifiProfile): boolean;
    protected abstract getCommand(option: string): string;
    protected abstract getArgs(option: string, config?: any): string[];
    private getCurrentConfig;
    protected execute(command: string, args: string[]): Promise<any>;
    protected showDebug(msg: string): void;
    protected getEnvVars(): NodeJS.ProcessEnv & {
        LANG: string;
        LC_ALL: string;
        LC_MESSAGES: string;
        encoding: string;
    };
    private configure;
}
export default WifiHandler;
