import ScanParser from "../../parsers/ScanParser";
import Network from "../../Network";
declare class LinuxScanParser implements ScanParser {
    parse(input: any, config?: any): Network[];
}
export default LinuxScanParser;
