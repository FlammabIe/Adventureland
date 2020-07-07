
var urls = [
	
	"https://raw.githubusercontent.com/FlammabIe/AdventurelandRepo/master/warrior/targeting.js",
	
	"https://raw.githubusercontent.com/FlammabIe/AdventurelandRepo/master/warrior/movement.js",
	
	"https://raw.githubusercontent.com/FlammabIe/AdventurelandRepo/master/warrior/skills.js",
	
	"https://raw.githubusercontent.com/FlammabIe/AdventurelandRepo/master/warrior/main.js"];

// https://www.w3schools.com/xml/dom_httprequest.asp
function loadURLs( url ) {
  var ajax = new XMLHttpRequest();
  ajax.open( 'GET', url, false ); // <-- the 'false' makes it synchronous
  ajax.onreadystatechange = function () {
    var script = ajax.response || ajax.responseText;
    if (ajax.readyState === 4) {
      switch( ajax.status) {
        case 200:
          eval.apply( window, [script] );
          game_log("SUCCESS: Script Loaded! ", url);
          break;
        default:
          game_log("ERROR: Script Not Loaded. ", url);
      }
    }
  };
  ajax.send(null);
}

loadURLs(urls);

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
