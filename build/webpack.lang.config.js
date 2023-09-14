const path = require('path');
module.exports = {
    entry:{
        'zh-cn':path.resolve(__dirname, '../src/language/zh-cn.ts'),
        'en-us':path.resolve(__dirname, '../src/language/en-us.ts')
    },
    output:{
        filename:'[name].bundle.js',
        path:path.resolve(__dirname, '../public/lang')
    },
    mode:'production',
    module:{
        rules: [
            {
                // test指定规则生效的文件
                test: /\.ts$/,
                // 要使用的loader
                use: [
                    {
                        loader:'babel-loader',
                        options:{
                            presets:[
                                '@babel/preset-env'
                            ]
                        }
                    },
                    {
                        loader:'ts-loader',
                        options:{
                            allowTsInNodeModules:true
                        }
                    }
                ]
            }
        ] 
    },
    resolve: {
        extensions: ['.ts','.js'] ,
        modules: ['src','node_modules'],
        alias:{
            '@':path.resolve('__dirname','../src')
        }
    }
}