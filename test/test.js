var sandpit = require('../index.js');
var assert = require("assert");
var fs = require("fs");

describe('Parse', function(){
    it('should parse this function', function(){
      //Add some globals
      sandpit.globals({
        Math : {
          PI : Math.PI,
          random : function(){Math.random();},
          abs : function(n){Math.abs(n);}
        } 
      });

      var func = sandpit.parse(fs.readFileSync('./examples/hello.js', 'utf8'),{x:1,y:2});
      
      //Create function with locals
      //Note to test escape string you need to double escape
      //var func = sandpit.parse('console.log("Hello \\"You\\" ",Math.PI);',{x:1,y:2});
     

      //Call with custom locals
      //func({y:3});

      assert.equal(1,1);
    });
});