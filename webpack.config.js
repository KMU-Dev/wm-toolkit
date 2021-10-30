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
        filename: "wm-toolkit.user.js",
    },
    devServer: {
        contentBase: path.resolve(__dirname, "dist"),
        port: 8080,
    },
    devtool: dev ? 'eval-source-map' : undefined,
    plugins: [
        new WebpackUserscript({
            headers: {
                name: "WM Toolkit",
                namespace: "https://github.com/KMU-Dev/wm-toolkit",
                version: dev ? `[version]-build.[buildNo]` : `[version]`,
                description: "KMU E-Learning toolkit.",
                author: "Chao Tzu-Hsien",
                match: ["https://wm.kmu.edu.tw/*"],
                icon: "https://wm.kmu.edu.tw/base/10001/door/tpl/icon.ico",
                "run-at": "document-start",
                grant: [
                    "GM_download",
                    "GM_registerMenuCommand",
                    "GM_info",
                    "GM_getValue",
                    "GM_setValue",
                    "GM_openInTab",
                ],
                noframes: true,
                homepage: "https://github.com/KMU-Dev/wm-toolkit",
                updateURL: "https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/wm-toolkit/job/master/lastSuccessfulBuild/artifact/dist/wm-toolkit.meta.js",
                downloadURL: "https://jenkins.webzyno.com/job/KMU%20Development%20Team/job/wm-toolkit/job/master/lastSuccessfulBuild/artifact/dist/wm-toolkit.user.js",
                supportURL: "https://github.com/KMU-Dev/wm-toolkit/issues",
            },
            proxyScript: {
                baseUrl: "http://127.0.0.1:8080",
                filename: "[basename].proxy.user.js",
                enable: dev,
            },
        }),
    ],
};
