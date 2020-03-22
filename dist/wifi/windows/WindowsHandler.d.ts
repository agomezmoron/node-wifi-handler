import WifiHandler from "../Wifi-Handler";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";
declare class WindowsHandler extends WifiHandler {
    constructor(config: any);
    protected getCommand(option: string): string;
    protected getArgs(option: string, config?: any): string[];
    createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean>;
}
export default WindowsHandler;
