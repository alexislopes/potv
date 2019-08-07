if(process.env.NODE_ENV === 'production'){
    module.exports = {
        devServer: {
            proxy: 'http://localhost:' + process.env.PORT + '/',
        }
    }
} else {
    module.exports = {
        devServer: {
            proxy: 'http://localhost:5000/',
        }
    }
}

