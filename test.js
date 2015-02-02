var assert = require('assert'),
  http = require('http');

function testUrl(from, to) {
  it(from + ' should redirect to ' + to, function(done){
    http
      .get(from, function(response){
        var redirectTo = response.headers.location || false,
        code = response.statusCode;
        console.log(response.headers.location);
        if ( code !== 301 ) {
          done(new Error('Status code was not 301.  Received a ' + response.statusCode + ' instead.'));
        }
        else if ( redirectTo === false ) {
          done(new Error('Location was not in the headers.'));
        }
        else if ( redirectTo !== to ) {
          done(new Error('Redirect location was not as expected.  Expected: ' + to + ' Received: ' + redirectTo ));
        }
        else {
          done();
        }
      })
      .on('error', function(err){
        done(new Error('WHOOPS, THERE WAS AN ERROR: ' + err.message));
      });
  });
}
describe('Redirects', function(){
  var urls = [
    {
      'from': 'http://brainfarm.wpengine.com/',
      'to': 'http://2brainfarmcinema.com/'
    },
    {
      'from': 'http://brainfarm.wpengine.com/',
      'to': 'http://brainfarmcinema.com/'
    },
  ];
  for (var i = 0; i < urls.length; i++) {
    var from = urls[i].from,
      to = urls[i].to;
      testUrl(from, to);
  }
});
