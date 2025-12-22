/**
 * @format
 */

import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';
import { ScriptManager, Script } from "@callstack/repack/client";

console.log('before');

ScriptManager.shared.addResolver(async (scriptId) => {
    if (scriptId === "mini_app1") {
        return {
            url: Script.getDevServerURL("mini_app1"),
        };
    }
})

AppRegistry.registerComponent(appName, () => App);
