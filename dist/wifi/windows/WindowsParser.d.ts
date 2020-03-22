import Parser from "../Parser";
import Network from "../Network";
declare class WindowsParser implements Parser {
    parseScan(input: any, config?: any): Network[];
    parseSavedNetworks(input: any, config?: any): Network[];
}
export default WindowsParser;
