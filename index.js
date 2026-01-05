/**
 * @format
 */

import { AppRegistry, Platform } from 'react-native';
import App from './src/App';
import { name as appName } from './app.json';
import { ScriptManager, Script, Federated } from '@callstack/repack/client';

console.log('before');

const remotes = {
    containers: {
        mini_app1: 'http://localhost:3011/android/[name][ext]',
    }
}

ScriptManager.shared.addResolver(async (scriptId, caller) => {
    console.log('resolver called for ', scriptId, caller);
    //   if (scriptId === 'mini_app1') {
    //     return {
    //       url: Script.getDevServerURL(scriptId),
    //       query: { platform: Platform.OS },
    //       verifyScriptSignature: __DEV__ ? 'off' : 'strict',
    //     };
    //   }

    const resolveURL = Federated.createURLResolver(remotes);
    const url = resolveURL(scriptId, caller);
    console.log(Script.getRemoteURL(url));
    if (scriptId === 'mini_app1') {
        if (url) {
            return {
                url,
                query: { platform: Platform.OS },
                // verifyScriptSignature: __DEV__ ? "off" : "strict",
                verifyScriptSignature: 'strict',
            };
        }
    }
    console.log(url);
    if (url) {
        return {
            url,
            query: { platform: Platform.OS },
            // verifyScriptSignature: __DEV__ ? "off" : "strict",
            verifyScriptSignature: 'strict',
        };
    }
});

AppRegistry.registerComponent(appName, () => App);
