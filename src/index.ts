import WMToolkit from './WMToolkit';

/*import Application from './app/Application';

const app = new Application();
app.start().catch((e) => {
    console.error('WM Toolkit stop with error');
    console.error(e);
}); */
const app = new WMToolkit();
app.start();
