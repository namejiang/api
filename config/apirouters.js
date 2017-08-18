var path    = require("path")  
var api    =  require("../app/controllers/api/index")

module.exports = function(app){

    app.get('/', api.index)
    // app.post('/contact/comment', Index.comment)
}