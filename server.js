const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const request = require("request")
const app = express();
const config = require("./src/config")

app.use(express.static(path.join(__dirname, 'build')))

function paramsToRequest(req, url){
 var options = { 
    url: url, 
    headers: {
      'Authorization': config.auth,
      'Content-Type' : 'application/json'
    }
 }
 return options
}

app.get('/businesses', function (req, res) {
 var params = Object.keys(req.query).map(k => {return {[k]: req.query[k] }} )
 var esc = encodeURIComponent
 var query = params.map( o => Object.keys(o).map(k => esc(k) + "=" + esc(o[k]))).join("&")
 var options = paramsToRequest(req, config.url+query)

 request.get(options, (error, response, body) => {
      res.send(body)
    })
});

app.get('/image', function(req, res){
  var options = paramsToRequest(req, req.query.url)
  request.get(options, (error, response, body) => {
    res.send(body)
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});


app.listen(process.env.PORT || 8080);