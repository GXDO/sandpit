# Testing Syntax - This is a "Comment" and should be ignored!
# !@#$%$%^/n\n

var x =  1; # Ignore this!
var y = -1;

var s = 'string';
var S = "STRING";

function f(a,b){
  return a + b;
}

var a = [1,2,3]; # Array

var p = s['indexOf'](); # This should not be allowed

var w = s['no']['way']; # W rap these with parseInt

var n = -123;   # Negative
var d = 0.123;  # Decimals
var h = 0x001;  # Hex
var o = 0123;   # Octal

var b = 1.0e+10; #big
var t = 1.0e-8; #tiny

var z00w = "ok"; # test numbers in identifier
var e00w = "ok"; # test special cases of 'E' in vars

# External stuff can only be accessed via $scope;
if($Console){
  $Console.log("Hello",$Settings.message);
}

return (0 == f(x,y));