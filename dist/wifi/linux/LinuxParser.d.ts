import Parser from "../Parser";
import Network from "../Network";
declare class LinuxParser implements Parser {
    parseScan(input: any, config?: any): Network[];
    parseSavedNetworks(input: any, config?: any): Network[];
}
export default LinuxParser;
