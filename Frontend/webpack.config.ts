import {Configuration} from 'webpack';
import path from 'node:path';
import CopyPlugin from 'copy-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const config: Configuration & { devServer: any } = {
    entry: './src/index.tsx',
    target: 'web',
    output: {
        filename: 'bundle.[fullhash].js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
                resolve: {
                    extensions: ['.tsx', '.ts', '.js'],
                    alias: {}
                }
            },
            {
                test: /\.css$/i,
                loader: 'css-loader',
                options: {
                    exportType: 'string',
                    import: false
                }
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource'
            },
            {
                test: /\.svg$/,
                type: 'asset/resource'
            }
        ]
    },
    optimization: {
        minimize: false
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                {
                    from: 'public',
                    globOptions: {
                        ignore: ['**/index.html']
                    }
                }
            ]
        }),

        new HtmlWebpackPlugin({
            template: 'public/index.html'
        })
    ],
    resolve: {
        fallback: {
            'typescript': false,
            'process': false
        }
    },
    devServer: {
        port: 3000,
        static: {
            directory: path.join(__dirname, 'public')
        },
        proxy: [
            {
                context: ['/api'],
                target: 'http://127.0.0.1:7071'
            }
        ]
    }
};

module.exports = (_: any, argv: any): Configuration => {
    if (argv.mode === 'development') {
        config.devtool = 'inline-source-map';
    }
    return config;
};
