module.exports = {
  globals : function(object){
    
  },
  parse : function(source,object){
    
    var tokens = tokenize(source);
    console.log(tokens);
    
    //var script = parse(tokens);
    //var script = source;
    //return new Function("locals",script);   
  }
};

function tokenize(source){  
  var ESCAPE = '\\';
  var QUOTES = '"\'';
  var WHITESPACE = ' \t';
  var NEWLINE = '\n'; 
  var SPECIAL = '=;+*/-.,!&|^<>{}()[]'; // Anything that can seperate tokens
  var MULTI = '=!<>&|+-^*%' ; // If starts with any of these can be multi string operators ==, +=, != etc.

  var tokens = [];  // List of tokens to output
  var token = '';   // Current token part
  var line = 0;     // Line count for errors
  var quote = '';   // Current quote
  var char = '';    // Current char
  var last = '';    // Last char

  // Inspect source 1 character at a time
  for(var i = 0; i <= source.length; i++){
    last = char;
    char = source.charAt(i);

    if(quote.length > 0){ // If inside a quote wait for the quote end
      if((char == quote) && (last != ESCAPE)){ // Look for a mathching quote end but not after an escape character
        token += quote;
        tokens.push({token:token,index:i,line:line});
        token = '';      
        quote = '';
      }else{
        token += char;
      }  
    }else if(QUOTES.indexOf(char) > -1 ){ // Look for a quote start
      quote=char;
      if(token.length > 0 ){ // End of last token        
        tokens.push({token:token,index:i,line:line});
      }
      token = quote; // Start a new quote with given delimeter
    }else if(NEWLINE.indexOf(char) > -1){ // Handle newlines after strings so we can have multi-line strings
      if(token.length >0 ){ // End of last token          
        tokens.push({token:token,index:i,line:line});
        token = '';
      }
      tokens.push({token:'\n',index:i,line:line});
      line++; //Increment line count for debugging        
    }else if(WHITESPACE.indexOf(char)>-1){ // Ignore Whitespace 
      if(token.length >0 ){ // End of last token
        tokens.push({token:token,index:i,line:line});
        token = '';
      }
    //}else if(token.length === 0){ // WHY??
    //  //Token is empty so start a new one
   //   token=char;
    }else if(SPECIAL.indexOf(char) > -1){ // Char is special
      if(MULTI.indexOf(token.charAt(0)) > -1){
        //token is operator that could be multiple eg != so append
        token += char;
      }else{ // Token is not multi so start new 
        tokens.push({token:token,index:i,line:line});
        token = char;
      }  
    }else if(SPECIAL.indexOf(token.charAt(0)) > -1){ //Token is special char is not so start new
      tokens.push({token:token,index:i,line:line});
      token = char;        
    }else{ // Just add char to current token
      token += char;
    }
  }
  return tokens;
}

function parser(tokens){
  var script = '';
  
  
  
  return script;
}