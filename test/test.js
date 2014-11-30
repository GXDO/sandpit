var Sandpit = require('../index.js');
var assert = require("assert");
var fs = require("fs");
var package = require("../package.json");

var Parser = require('../lib/grammer.js');


describe('Peg', function(){
    it('should parse', function(){
      var parsed = Parser.parse(fs.readFileSync('./examples/syntax.js', 'utf8'));
      console.log(parsed);
      
      assert.equal(true,true);
      
    });
});

/*
describe('Constructor', function(){
    

    it('should output correct version', function(){      
      assert.equal(Sandpit.version,package.version);
    });

    it('should throw or return an error calling run with no script', function(){
      var sandpit = new Sandpit();    

      assert.throws(function(){sandpit.run()},Error,'should throw error');
      
      sandpit.run(function(e,result){
        assert.ok(e,'should return error');
      });
      
    });

    it('should return "Hello World!"', function(){
      var sandpit = new Sandpit();    

      sandpit.parse(fs.readFileSync('./examples/hello.js', 'utf8'));
      
      sandpit.run(function(e,result){
        assert.equal(result,'Hello World!','should return async');
      });
      
      assert.equal(sandpit.run(),'Hello World!','should return sync');
      
    });

});


describe('Syntax', function(){
    it('should compile', function(){
      var sandpit = new Sandpit();    

      sandpit.parse(fs.readFileSync('./examples/syntax.js', 'utf8'));
      
    
      assert.equal(sandpit.run(),true);
      
    });
});
*/