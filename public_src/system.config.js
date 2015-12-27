System.config({
    defaultJSExtension: true,
    packages: {
        'app': {
            format: 'register'
        },
        'components/navigator': {
            format: 'register'
        }
    }
});
System.import('app/bootstrap').then(null, console.error.bind(console));
