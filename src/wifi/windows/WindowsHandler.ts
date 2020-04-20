/**
 * WifiHandler for Windows.
 * Author: Alejandro Gomez @agomezmoron
 */

import WifiHandler from "../Wifi-Handler";
import WifiProfile from "../profiles/WifiProfile";
import WPAPersonalProfile from "../profiles/WPAPersonalProfile";
import WPAEnterpriseProfile from "../profiles/WPAEnterpriseProfile";
import WPAEAPPEAPProfile from "../profiles/WPAEAPPEAPProfile"
import WPAEAPTTLSProfile from "../profiles/WPAEAPTTLSProfile"
import WPAEAPTLSProfile from "../profiles/WPAEAPTLSProfile"
import FileSystemUtil from "../util/FileSystemUtil"
import {switchCase} from "@babel/types";

/**
 * Wifi handler for Winows OS.
 * It uses https://docs.microsoft.com/en-us/windows-server/networking/technologies/netsh/netsh
 * @description Wifi handler for Windows OS.
 */
class WindowsHandler extends WifiHandler {

    private templates = {
        WPA_PERSONAL: 'wpa-personal.xml',
        WPA2_PERSONAL: 'wpa2-personal.xml'
    };

    /**
     * Parametrized constructor.
     * @param config Object with 2 attributes:
     *  - 'interface' with the network interface name
     *  - 'debug' flag to know if true / false.
     */
    constructor(config) {
        super(config);
    }

    protected getCommand(option: string): string {
        switch (option) {
            case this.commandTypes.SCAN:
            case this.commandTypes.SAVED:
            case this.commandTypes.DELETE:
                return 'netsh';
                break;
            case this.commandTypes.CREATE:
                return '';// TODO
                break;
            default:
                return '';// TODO
                break;
        }
    }

    protected getArgs(option: string, config?): string[] {
        let args = [];
        switch (option) {
            case this.commandTypes.SCAN:
                args.push('wlan');
                args.push('show');
                args.push('networks');
                args.push('mode=Bssid');
                break;
            case this.commandTypes.SAVED:
                args.push('wlan');
                args.push('show');
                args.push('profiles');
                break;
            case this.commandTypes.DELETE:
                args.push('wlan');
                args.push('delete');
                args.push('profile');
                if (!!config && config.ssid) {
                    args.push('name="' + config.ssid + '"');
                }
                break;
            case this.commandTypes.CREATE:
                if (!!config && config.profile) {
                    args = this.getCreateArgs(config.profile);
                }
                break;
        }
        return args;
    }

    /**
     * It gets the create args (for the PERSONAL) type.
     * @param profile to build the args.
     */
    private async getCreateArgs(profile: WifiProfile): string[] {
        const args = [];
        let wpaConfig = {
            '__WIFI_PROFILE_SSID__': profile.ssid,
            '__WIFI_PROFILE_NAME__': profile.ssid
        };
        args.push('wlan');
        args.push('add');
        args.push('profile');
        const profileFileName = new Date().getTime() + '.xml';
        const profileFilePath = await FileSystemUtil.createTempFile(profileFileName);
        args.push('filename="' + profileFilePath + '"');
        if (profile instanceof WPAPersonalProfile) {
            wpaConfig['__WIFI_PROFILE_PASSWORD__'] = profile.password;
            FileSystemUtil.replaceAll(this.templates.WPA_PERSONAL, wpaConfig, profileFilePath);
        } else if (profile instanceof WPAPersonalProfile) {
            wpaConfig['__WIFI_PROFILE_PASSWORD__'] = profile.password;
            FileSystemUtil.replaceAll(this.templates.WPA2_PERSONAL, wpaConfig, profileFilePath);
        }
        return args;
    }

    /**
     * In this handler we overrides this function to create an enterprise network.
     * @param profile WPAEnterpriseProfile to be configured.
     */
    async createAnEnterpiseNetwork(profile: WPAEnterpriseProfile): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            this.execute(this.getCommand(this.commandTypes.CREATE), this.getArgs(this.commandTypes.CREATE, {profile: profile}))
                .then(result => {
                    // once connected, the profile should exist
                    this.existsNetwork(profile.ssid)
                        .then(exists => {
                            if (exists) {
                                resolve(true);
                            } else {
                                reject(false);
                            }
                        })
                        .catch(err => {
                            reject(false);
                        })
                })
                .catch(err => {
                    this.showDebug(err);
                    resolve(false);
                });
        });
    }
}

export default WindowsHandler;
