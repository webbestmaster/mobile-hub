require('babel-register')({
    presets: [
        'env',
        'stage-2',
        'react',
        'flow'
    ]
});
require('./server');
