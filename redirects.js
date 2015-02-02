var assert = require('assert'),
  http = require('http');

var delayPerRequest = 1000;
describe('Redirects', function(){
  var urls = [
    {
      from: 'http://brainfarmcinema.com/blog/tag/video/page/2',
      to: 'http://brainfarmcinema.com/tag/video'
    },
    {
      from: 'http://brainfarmcinema.com/who_we_are.aspx',
      to: 'http://brainfarmcinema.com/who-we-are/'
    },
    {
      'from': 'http://brainfarm.wpengine.com/',
      'to': 'http://brainfarmcinema.com/'
    },
    {
      'from': 'http://brainfarm.wpengine.com',
      'to': 'http://brainfarmcinema.com/'
    },
    {
      from: 'http://brainfarmcinema.com/blog/index.php/category/video/',
      to: 'http://brainfarmcinema.com/category/video'
    },
    {
      from: 'http://brainfarmcinema.com/blog/index.php/category/video/page/3',
      to: 'http://brainfarmcinema.com/category/video'
    },
    {
      from: 'http://brainfarmcinema.com/blog/category/video/',
      to: 'http://brainfarmcinema.com/category/video'
    },
    {
      from: 'http://brainfarmcinema.com/blog/index.php/tag/video/',
      to: 'http://brainfarmcinema.com/tag/video'
    },
    {
      from: 'http://brainfarmcinema.com/blog/tag/video/',
      to: 'http://brainfarmcinema.com/tag/video'
    }
  ];
  for (var i = 0; i < urls.length; i++) {
    var from = urls[i].from,
        to = urls[i].to;
    /* stagger our requests -- because their synchronous, they'll
    all wait {delay} milliseconds before firing again, so we
    don't need to have a multiplier of milliseconds */
    setupNewTest(from, to, delayPerRequest);
  }
});

function setupNewTest(from, to, delay) {
  describe('From: ' + from + ' To: ' + to, function(){
    var redirectTo = null, code = null;
    before(function(done){
      setTimeout(function(done){
        http.get(from, function(response){
          redirectTo = response.headers.location || false,
          code = response.statusCode;
          done();
        })
        .on('error', function(err){
          done(new Error('WHOOPS, THERE WAS AN ERROR: ' + err.message));
        });
      }, delay, done);
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
