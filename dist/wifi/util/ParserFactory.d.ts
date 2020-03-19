import Parser from "../Parser";
declare abstract class ParserFactory {
    static getInstance(): Parser;
}
export default ParserFactory;
