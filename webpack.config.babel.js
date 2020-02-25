import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

export default {
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.(jpe?g|png|gif|svg)$/i,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'assets/'
              }
            }
          ]
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: 'css-loader',
              options: { sourceMap: true
              },
            },
            {
              loader: "resolve-url-loader",
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'sass-loader',
              options: { sourceMap: true },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: '[name].[ext]',
                outputPath: 'fonts/'
              }
            }
          ]
        },


      ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Custom template',
            filename: 'index.html',
            template: path.join(__dirname, 'index.html')
        }),
        new ScriptExtHtmlWebpackPlugin({
            defaultAttribute: 'defer'
        }),
      new MiniCssExtractPlugin({
        filename: 'bundle.css'
      })
    ],
    stats: {
        colors: true
    },
    devtool: 'source-map', 
    mode:"development",
    devServer: {
            contentBase: './dist',
            inline:true,
            port: 3000 //my prefered port for development, but change as you see fit
    }
};