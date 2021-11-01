import Application from './app/Application';

const app = new Application();
app.start().catch((e) => {
    console.error('WM Toolkit stop with error');
    console.error(e);
});
