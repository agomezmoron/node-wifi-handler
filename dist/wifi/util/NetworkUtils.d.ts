declare class NetworkUtils {
    private channels;
    private frequency;
    constructor();
    frequencyFromChannel(channelId: any): string;
    dBFromQuality(quality: any): number;
    qualityFromDB(db: any): number;
}
declare const _default: NetworkUtils;
export default _default;
