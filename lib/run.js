// Execute a function with given scope and return in callback
function run(fn,options,scope,callback){
  // Make sure we have a function to run
  if ((typeof fn !== 'function')) {
    var e = new Error();
    e.name = 'Function Error';
    e.message = 'Function is not defined';
    if (typeof callback === 'function') {
      callback(e,null);
    }else{
      throw e;
    }  
    return;
  }
  
  // Wrap in try catch and callback
  var executable = function(){
    var result;
    var err;
    
    try{
      result = fn(options,scope);
    }
    catch(e){
      err = e;
    }
    finally{
      // Execute callback outside of try incase it throws error
      if (typeof callback === 'function') {
        callback(err,result);
      }else if (err){
        throw err;
      }else{
        return result;
      }
    }    
  };
  
  // If we have a callback run async else return sync
  if (typeof callback === 'function') {
    if (typeof process === 'undefined' || !(process.nextTick)) {
      if (typeof setImmediate === 'function') {
        setImmediate(executable);
      }
      else {
        setTimeout(executable, 0);
      }
    }else {
      process.nextTick(executable);
    }
  }else{
    return executable();
  }
}
  
module.exports = run;
