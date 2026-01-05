import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as Repack from '@callstack/repack';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Rspack configuration enhanced with Re.Pack defaults for React Native.
 *
 * Learn about Rspack configuration: https://rspack.dev/config/
 * Learn about Re.Pack configuration: https://re-pack.dev/docs/guides/configuration
 */
const config = (_env) => {
  const { mode } = _env
  console.log(mode)
  return Repack.defineRspackConfig({
    context: __dirname,
    entry: './index.js',
    resolve: {
      ...Repack.getResolveOptions(),
    },
    output: {
      uniqueName: 'host_app',
      clean: true,
      filename: "index.bundle",
      chunkFilename: "[name].chunk.bundle",
      path: "[context]/build/generated/[platform]",
    },
    module: {
      rules: [
        {
          test: /\.[cm]?[jt]sx?$/,
          type: 'javascript/auto',
          use: {
            loader: '@callstack/repack/babel-swc-loader',
            parallel: true,
            options: {},
          },
        },
        ...Repack.getAssetTransformRules(),
      ],
    },
    plugins: [
      new Repack.RepackPlugin(),
      new Repack.plugins.CodeSigningPlugin({
        enabled: true,
        privateKeyPath: "./code-signing.pem",
      }),
      new Repack.plugins.ModuleFederationPluginV2({
        name: 'host_app',
        shared: {
          react: { singleton: true, eager: true, requiredVersion: '19.1.0' },
          'react-native': { singleton: true, eager: true, requiredVersion: '0.80.0' },
          'react-native-screens': { singleton: true, eager: true },
          'react-native-safe-area-context': { singleton: true, eager: true },
          '@react-native/new-app-screen': { singleton: true, eager: true },
          '@react-navigation/native': { singleton: true, eager: true },
          '@react-navigation/native-stack': { singleton: true, eager: true },
          '@react-navigation/elements': { singleton: true, eager: true },
          '@react-navigation/bottom-tabs': { singleton: true, eager: true },
          '@react-native-masked-view/masked-view': { singleton: true, eager: true },
          'react-native-vision-camera': { singleton: true, eager: true },
          'react-native-permissions': { singleton: true, eager: true },
          'react-native-config': { singleton: true, eager: true },
        },
        dts: false
      })
    ],
  });
}

export default config