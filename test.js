var assert = require('assert'),
  http = require('http');

describe('Redirects', function(){
  var urls = [
    {
      'from': 'http://brainfarm.wpengine.com/',
      'to': 'http://brainfarmcinema.com/'
    },
    {
      'from': 'http://brainfarm.wpengine.com',
      'to': 'http://brainfarmcinema.com/'
    },
  ];
  for (var i = 0; i < urls.length; i++) {
    var from = urls[i].from,
        to = urls[i].to;
    setupNewTest(from, to);
  }
});

function setupNewTest(from, to) {
  describe('From: ' + from + ' To: ' + to, function(){
    var redirectTo = null, code = null;
    before('Get Response', function(done){
      http.get(from, function(response){
        redirectTo = response.headers.location || false,
        code = response.statusCode;
        done();
      })
      .on('error', function(err){
        done(new Error('WHOOPS, THERE WAS AN ERROR: ' + err.message));
      });
    });
    it('should have a 301 response code', function(done){
      if ( code !== 301 ) {
        done(new Error('Status code was not 301.  Received a ' + response.statusCode + ' instead.'));
      }
      else {
        done();
      }
    });

    it('should redirect to expected location', function(done){
      if ( !redirectTo ) {
        done(new Error('Location was not in the headers.'));
      }
      else if ( redirectTo !== to ) {
        done(new Error('Redirect location was not as expected.  Expected: ' + to + ' Received: ' + redirectTo ));
      }
      else {
        done();
      }
    });
  });

}
