/*globals require */
var tokenize = require('./tokenize');
var compile = require('./compile');
var run = require('./run');


function Sandpit(options, scope) {
  
  var self = this;
  
  if (!(self instanceof Sandpit)) {
    return new Sandpit(options, scope);
  }


  // Default Options
  self.options = {
    timeout: 1000
  };
  
  // Local Scope
  self.scope = {};
    
  //Current code to run (needs to handle options, scope, throw its own timeouts etc.)
  //var compiled = new Function('options','scope','return');
  var compiled;

  // If has callback it will run async else it will return result
  // run([locals],[callback])
  // run([callback],[locals])
  // run([locals])
  // run([callback])
  self.run = function(){
    var scope = self.scope;
    
    if (typeof arguments[0] === 'function') {
      //TODO - Merge scope with arguments[1]
      return run(compiled,self.options,scope,arguments[0]);
    }else if (typeof arguments[1] === 'function') {
      //TODO - Merge scope with arguments[0]
      return run(compiled,self.options,scope,arguments[1]);
    }else{
      return run(compiled,self.options,scope);
    }
  };
  
  self.parse = function(script){
    var tokens = tokenize(script);
    compiled = compile(tokens,self.options);
    return self;
  };
  
}

//Sandpit.prototype.options = function(){};

Sandpit.version = require('../package.json').version;
Sandpit.globals = {timeout:500};


module.exports = Sandpit;