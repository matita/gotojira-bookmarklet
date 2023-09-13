javascript:(function(){
  var bookmarkletTemplateUrl = 'https://threeiem.github.io/gotojira-bookmarklet/';
  var defaultProj = '';
  var baseUrls = {
    /*"PROJ" : "https://jira.companyname.tld/"*/
  };
  var text;
  
  if (window.getSelection) {
    text = window.getSelection().toString();
  } else if (document.selection && document.selection.type != "Control") {
    text = document.selection.createRange().text;
  }
  
  if (!text) {
    text = prompt('JIRA identifier ex.) "1337" or "PROJ-1337")');
  }
  
  if (text) {
    var m = text.match(/((\w+)-)?(\d+)/);

    if (!m) {
      return alert('Pattern not matched (ex. PROJ-1337)');
    }
    
    var proj = (m[2] || defaultProj).toUpperCase();
    var id = m[3];
    var jiraId = proj + '-' + id;
    var baseUrl = baseUrls[proj];
    var maps = [];

    if (!baseUrl) {

      if (proj) {

        if (confirm('No url found for project "' + proj + '". Do you want to set it now?')) {


          for (var p in baseUrls) {
            maps.push(encodeURIComponent(p) + '|' + encodeURIComponent(baseUrls[p]));
          }

          window.open(bookmarkletTemplateUrl + '?proj=' + maps.join(',') + ',' + proj + '|');

        } else {
          return;
        }
      } else {

        if (confirm('No default project set. Do you want to set it now?')) {

          if (maps.length > 0) {
            window.open(bookmarkletTemplateUrl + '?proj=' + maps.join(',') + ',' + proj + '|');
          } else {
            window.open(bookmarkletTemplateUrl + '#customize');
          }


        }
      }
    }

    var url = baseUrl + (baseUrl[baseUrl.length - 1] == '/' ? '' : '/') + 'browse/' + jiraId;

    window.open(url);
  }
})();
