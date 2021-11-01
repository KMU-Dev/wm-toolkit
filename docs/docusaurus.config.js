// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'WM Toolkit',
  tagline: 'KMU E-Learning toolkit tampermonkey script',
  url: 'https://wm.kmu.webzyno.com',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'KMU-Dev', // Usually your GitHub org/user name.
  projectName: 'wm-toolkit', // Usually your repo name.

  presets: [
    [
      '@docusaurus/preset-classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/KMU-Dev/wm-toolkit/edit/master/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/KMU-Dev/wm-toolkit/edit/master/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'WM Toolkit',
        logo: {
          alt: 'WM Toolkit Logo',
          src: 'img/favicon.ico',
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: '教學',
          },
          // {to: '/blog', label: 'Blog', position: 'left'},
          {
            href: 'https://github.com/KMU-Dev/wm-toolkit',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: '文件',
            items: [
              {
                label: '教學',
                to: '/docs',
              },
              {
                label: '考古製作',
                to: '/docs/past-exam/claim-exam',
              },
              {
                label: '插件',
                to: '/docs/extension/install',
              },
            ],
          },
          {
            title: '社群',
            items: [
              {
                label: 'KMU E-Learning',
                href: 'https://wm.kmu.edu.tw',
              },
              /* {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/docusaurus',
              },
              {
                label: 'Discord',
                href: 'https://discordapp.com/invite/docusaurus',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/docusaurus',
              }, */
            ],
          },
          {
            title: '更多',
            items: [
              /* {
                label: 'Blog',
                to: '/blog',
              }, */
              {
                label: 'Status',
                href: 'https://status.kmu.webzyno.com',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/KMU-Dev/wm-toolkit',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} KMU Development Team, Inc. Built with Docusaurus.`,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
      gtag: {
        // You can also use your "G-" Measurement ID here.
        trackingID: 'G-XRHJS73HRQ',
      },
    }),
};

module.exports = config;
