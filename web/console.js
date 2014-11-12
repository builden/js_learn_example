var srcConsoleLog = console.log;

$('#testbtn').click(function() {
  console.log("a23");
});


$('#closebtn').click(function() {
  switchConsole();
})

var hooked = false;

function switchConsole() {
  if (hooked) {
    console.log = function(str) {
      var ul = $('#testul');
      if (ul) {
        ul.append('<li>' + str + '</li>')
      }
    }
  } else {
    console.log = srcConsoleLog;
  }
  hooked = !hooked;
}

$('#contain').mousedown(function() {
  console.log('mousedown');
});

$('#contain').mouseup(function(event) {
  console.log('mouseup')
});

$('#contain').click(function(event) {
  console.log('contain click')
});

switchConsole();
