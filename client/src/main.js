import App from './App.svelte';

const app = new App({
    target: document.body,
    props: {
        server: 'http://localhost:6980',
    },
});

export default app;
