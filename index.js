/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { ScriptManager, Script, Federated } from "@callstack/repack/client";

console.log('before');

const containers = {
    mini_app1: "http://localhost:3011/[name][ext]",
};

ScriptManager.shared.addResolver(async (scriptId, caller) => {
    // if (scriptId === "mini_app1") {
    // return {
    //     url: Script.getDevServerURL(scriptId),
    // };
    // }

    const resolveURL = Federated.createURLResolver({ containers });

    const url = resolveURL(scriptId, caller);
    console.log(url);
    if (url) {
        return {
            url,
            query: { platform: Platform.OS },
            // verifyScriptSignature: __DEV__ ? "off" : "strict",
            verifyScriptSignature: "strict",
        };
    }
})

AppRegistry.registerComponent(appName, () => App);
