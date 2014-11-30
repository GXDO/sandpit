module.exports = function compile(tokens,options){  

  var script = '';
  
  // Build timeout and checkpoint helpers
  script += 'var _time = Date.now();\n';
  script += 'function _checkpoint(){\n';
  script += ' if((Date.now()-_time) > _options.timeout){\n';
  script += '   var e = new Error();\n';
  script += '   e.name = "Timeout";\n';
  script += '   e.message = "The script timed out.";\n';
  script += '   throw e;\n';
  script += ' }\n';
  script += '}\n';
  
  var token = '';
  
  // Compile the tokens into a script and build a function we can execute
  // We can mostly just write to output and let the new Function() catch the errors
  // But we need to check for identifiers, scope our vars, insert timeout, handle our little differences etc.
  for(var i = 0;i < tokens.length;i++){
    token = tokens[i].token; 

    if(token.indexOf('#')===0){
      script += '//' + token;
    }else if(token === '{'){ 
      script += '{_checkpoint();'; // Add Checkpoint to any open block
    }else if(['}','[',']','(',')'].indexOf(token)>-1){
      script += token;
    }else if(['var','function','break','return','while','if','else'].indexOf(token)>-1){
      script += token;
    }else if(['true','false','Infinity','undefined','null','NaN'].indexOf(token)>-1){
      script += token;
    }else if(token === '='){ //EQUALS
      script += token;
    }else if(['=','+=','-=','*=','/=','%='].indexOf(token)>-1){ //ASSIGNMENT
      script += token;
    }else if(['+','-','*','/','%'].indexOf(token)>-1){ // ARITHMETIC
      script += token;
    }else if(['+','-','++','--'].indexOf(token)>-1){ //UNARY
      script += token;
    }else if(['==','!=','>','>=','<','<=','===','!=='].indexOf(token)>-1){ //COMPARISON
      script += token;
    }else if(['||','&&','!'].indexOf(token)>-1){ // LOGICAL
      script += token;
    }else if(['&','|','^','<<','>>','>>>','~'].indexOf(token)>-1){ // BITWISE
      script += token;
    }else if(['"',"'"].indexOf(token.charAt(0))>-1){ //STRING
      script += token;
    }else if(token === '.'){  
      script += token;
    }else if(token === ','){
      script += token;
    }else if(token === ';'){
      script += token;
    }else if(token === ' '){ //WHITESPACE
      script += token;
    }else if(token === '\n'){
      script += token;
    }else if(!isNaN(token)){ //NUMERIC
      script += token;
    }else if(token.indexOf('$')===0){ //SCOPED
      script += '$scope.' + token;
    }else{
      script += 'SANDPIT__' + token;
    }
  }  
    
  
  console.log(tokens);
  console.log(script);
  
  var fn = new Function('_options','$scope',script);
  return fn;
};
