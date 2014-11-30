// Tokenize a source string
// @param {String} source
// @return {Array} tokens
module.exports = function tokenize(source){  
  
  var ESCAPE = '\\';
  var QUOTES = '"\'';
  var COMMENT = '#';
  var WHITESPACE = ' \t';
  var NEWLINE = '\n'; 
  var SPECIAL = '=;+*/-.,!&|^<>{}()[]'; // Anything that can seperate tokens
  var NUMBERS = '1234567890.+-eEx';
  var MULTI = '=!<>&|+-^*%/'; // If starts with any of these can be multi string operators ==, +=, != etc.

  var tokens = [];  // List of tokens to output
  var token = '';   // Current token part
  var line = 0;     // Line count for errors
  var quote = '';   // Current quote
  var comment = ''; // Current comment
  var char = '';    // Current char
  var last = '';    // Last char
  
  // Inspect source 1 character at a time
  for(var i = 0; i <= source.length; i++){
    last = char;
    char = source.charAt(i);
    if(comment.length > 0 ) { // If in comment wait for end of line
      if(NEWLINE.indexOf(char) > -1){
        tokens.push({token:token+'\n',index:i,line:line});
        token = '';
        comment = '';
      }else{
        token += char;
      }
    }else if(COMMENT.indexOf(char) > -1 ){ // Look for a comment start
      comment=char;
      if(token.length > 0 ){ // End of last token        
        tokens.push({token:token,index:i,line:line});
      }
      token = comment; // Start a new comment token
    }else if(quote.length > 0){ // If inside a quote wait for the quote end
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
    }else if(WHITESPACE.indexOf(char)>-1){ // Whitespace 
      if(token.length >0 ){ // End of last token
        tokens.push({token:token,index:i,line:line});
        token = '';
      }
      tokens.push({token:' ',index:i,line:line});

    }else if(token.length === 0){ // Token is empty so start a new one
      token=char;
    }else if(NUMBERS.indexOf(char) > -1 && NUMBERS.indexOf(token.charAt(0)) > -1){ // Do numbers before special to handle special chars in numbers
      token += char;
    }else if(SPECIAL.indexOf(char) > -1){ // Char is special
      //if(MULTI.indexOf(token.charAt(0)) > -1){//TODO need to tes all!
      if(isChars(token,MULTI)){
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
};

//Check token only contains chars
function isChars(token,chars){
  for(var t = 0;t<token.length;t++){
    if(chars.indexOf(token.charAt(t)) < 0){
      return false;
    }
  }
  return true;
}