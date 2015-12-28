System.config({
    defaultJSExtension: true,
    packages: {
        'app': {
            format: 'register'
        },
        'components/navigator': {
            format: 'register'
        },
        'core': {
            format: 'register'
        },
        'services': {
            format: 'register'
        }
    }
});
System.import('app/bootstrap').then(null, console.error.bind(console));
