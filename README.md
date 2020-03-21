# Node Wifi Handler

Node module to work with the Wi-Fi inspired on [node-wifi](https://github.com/friedrith/node-wifi) with TypeScript support and other features (WPA Personal and WPA enterprise).

Nowadays it's Work In Progress but


| Features                         | Linux             | Mac | Windows |
| -------------------------------- | ------------------| ----| --------|
| Connect - WPA Personal           | :heavy_check_mark:| WIP | WIP     |
| Connect - WPA Enterpise - EAP 13 | :heavy_check_mark:| WIP | WIP     |
| Connect - WPA Enterpise - EAP 21 | :heavy_check_mark:| WIP | WIP     |
| Connect - WPA Enterpise - EAP 23 | :heavy_check_mark:| WIP | WIP     |
| Scan                             | :heavy_check_mark:| WIP | WIP     |
| List current wifi connections    | :heavy_check_mark:| WIP | WIP     |
| Delete connection information    | :heavy_check_mark:| WIP | WIP     |


Depending on the OS System, some native tools are used:
* Linux: Uses **[nmcli](https://developer.gnome.org/NetworkManager/stable/nmcli.html)**.


---

## Install

```bash
# Use as a module
npm install node-wifi-handler

# Use as a CLI
npm install node-wifi-handler -g
```


## Getting started

```typescript

import WifiHandler from "node-wifi-handler"

const handler: WifiHandler = WifiWrapper.getWifiHandler();

const profile: WifiProfile = new WPAPersonalProfile('SSID', 'PASSWORD');

handler.createNetwork(profile)
    .then(output => console.log('Profile configured'))
    .catch(err => console.error('An error occurred'));

```


## Contribute

Please feel free to provide a pull request or create any needed issue.

## License

[MIT](/LICENSE)
