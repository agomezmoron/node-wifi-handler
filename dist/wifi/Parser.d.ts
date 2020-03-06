import Network from "./Network";
interface Parser {
    parseScan(input: any, config?: any): Network[];
    parseSavedNetworks(input: any, config?: any): Network[];
}
export default Parser;
