import Network from "./Network";
declare abstract class WifiHandler {
    protected interface: string;
    protected debug: boolean;
    constructor(config?: {
        interface: string;
        debug: boolean;
    });
    protected execute(command: string, args: string[]): Promise<any>;
    scan(): Promise<Network[]>;
    protected abstract getScanCommand(): string;
    protected abstract getScanArgs(): string[];
    abstract parseScanOutput(str: any): Network[];
    private showDebug;
    private getEnvVars;
    private configure;
}
export default WifiHandler;
