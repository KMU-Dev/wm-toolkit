const path = require("path");
const WebpackUserscript = require("webpack-userscript");

const dev = process.env.NODE_ENV === "development";

module.exports = {
    mode: dev ? "development" : "production",
    entry: path.resolve(__dirname, "src", "index.ts"),
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "wm-downloader.user.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8080,
    },
    devtool: dev ? 'eval-source-map' : undefined,
    plugins: [
        new WebpackUserscript({
            headers: {
                name: "WM Downloader",
                namespace: "https://github.com/KMU-Dev/wm-downloader",
                version: dev ? `[version]-build.[buildNo]` : `[version]`,
                description: "Google Meet notification tampermonkey script",
                author: "Chao Tzu-Hsien",
                match: ["https://wm.kmu.edu.tw/*"],
                icon: "https://wm.kmu.edu.tw/base/10001/door/tpl/icon.ico",
                grant: [
                    "GM_download",
                    "GM_registerMenuCommand",
                    "GM_info",
                ],
                noframes: true,
                homepage: "https://github.com/KMU-Dev/wm-downloader",
                updateURL: "https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/wm-downloader/job/master/lastSuccessfulBuild/artifact/dist/wm-downloader.meta.js",
                downloadURL: "https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/wm-downloader/job/master/lastSuccessfulBuild/artifact/dist/wm-downloader.user.js",
                supportURL: "https://github.com/KMU-Dev/wm-downloader/issues",
            },
            proxyScript: {
                baseUrl: "http://127.0.0.1:8080",
                filename: "[basename].proxy.user.js",
                enable: dev,
            },
        }),
    ],
};
