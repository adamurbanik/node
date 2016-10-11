// ********* SCOPE CHAINS CLOSURES ****** /////

//1
function foo() {
  var bar;
}


//2
function foo() {
  var bar;
  function zip() {
    var quux;
  }
}


//3
function foo() {
  var bar;
  quux = 0;
  function zip() {
    var quux = 1;
  }
}


//4
function foo() {
  var bar;
  quux = 0;
  
  function zip() {
    var quux = 1;
    bar = true;
  }

  return zip;
}



