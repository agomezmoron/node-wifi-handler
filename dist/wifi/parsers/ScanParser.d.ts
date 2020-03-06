import Parser from './Parser';
import Network from "../Network";
interface ScanParser extends Parser {
    parse(input: any, config?: any): Network[];
}
export default ScanParser;
