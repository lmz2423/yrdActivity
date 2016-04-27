#!/usr/bin/env node

/**
 * 使用yargs模块
 * yrd start --template==small 小模板
 * yrd start --template==angular 大模板
 * yrd init  --template==angular 初始化
 * yrd serve  开启开发模式
 * yrd deploy 打包
 * yrd test   部署到测试服务器
 * yrd online 上线
 * yrd --help
 *
 */

var argv = require('yargs').argv;

var paramsArray = argv._;

var exec = require('child_process').exec;

var PROJECT_TEMPLATES = {
    small: "git@github.com:lmz2423/yrd-small-acitivity-template.git",
    angular: 'todo'
};

/**
 *
 * @param number if number == 0 获取小模板 or number == 1 获取angular的模板
 * @private 获取不同的模板
 */

function _getTemplate(number) {
    var comm = 'git clone ';

    if (number === 0) {
        console.log('xx');
        comm = comm + PROJECT_TEMPLATES.small;
        exec(comm, _execCallBack);
    }

    if (number === 1) {
        comm = comm + PROJECT_TEMPLATES.angular;
        exec(comm, _execCallBack);
    }
}

function _execCallBack(err, stdout, stderr) {
    if (err) throw err;
    console.log(stdout);
    console.log('模板下载完成');
}

/**
 * 执行命令
 */

function run() {
    //开启下载模板
    if (paramsArray.indexOf('start') > -1) {
        console.log('start down template ');
        switch (argv.template) {

            case "small"://普通模板
                _getTemplate(0);
                break;
            case "angular"://angular模板
                _getTemplate(1);
                break;
            default:
                _getTemplate(0);//默认加载普通模板

        }
    }

    //初始化服务
    if (paramsArray.indexOf('init') > -1) {
        console.log('down the depend npm');
        exec('cnpm install', _execCallBack);
    }

    //开启服务
    if (paramsArray.indexOf('serve') > -1) {
        console.log('start up serve');
        exec('gulp serve', _execCallBack);
    }

    //打包
    if (paramsArray.indexOf('deploy') > -1) {
        console.log('start deploy');
        exec('gulp deploy', _execCallBack);
    }

    //部署测试服务 todo

    if (paramsArray.indexOf('test') > -1) {
        console.log('sorry it is not to do');
    }

    //上线 todo
    if (paramsArray.indexOf('online') > -1) {
        console.log('sorry it is not to do')
    }
}

run();




