import WifiHandler from "../Wifi-Handler";
declare class LinuxHandler extends WifiHandler {
    constructor(config: any);
    protected getCommand(option: string): string;
    protected getArgs(option: string, config?: any): string[];
    private getCreateArgs;
    private getWPASupplicantConf;
}
export default LinuxHandler;
