if(process.env.NODE_ENV === 'production'){
    module.exports = require('./prod-env')
} else if (process.env.NODE_ENV === 'test'){
    module.exports = require('./test-env')
} else {
    module.exports = require('./dev-env')
}