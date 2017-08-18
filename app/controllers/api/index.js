var fs = require('fs')

// 首页
exports.index = function(req,res){
    res.render('api/index',{
        title: '首页'
    })
}