import WifiHandler from "../Wifi-Handler";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";
declare class LinuxHandler extends WifiHandler {
    constructor(config: any);
    protected getCommand(option: string): string;
    protected getArgs(option: string, config?: any): string[];
    private getCreateArgs;
    private getWPASupplicantConf;
    private getWPASupplicantCAParts;
    createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean>;
}
export default LinuxHandler;
