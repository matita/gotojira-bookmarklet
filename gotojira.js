javascript:(function(){
	var nest = 'http://matita.github.io/gotojira-bookmarklet/';
	var defaultProj = '';
	var baseUrls = {
		/*"project": "http://jiraurl/"*/
	};
	var text;
	
	if (window.getSelection) {
		text = window.getSelection().toString();
	} else if (document.selection && document.selection.type != "Control") {
		text = document.selection.createRange().text;
	}
	
	if (!text)
		text = prompt('Write the JIRA identifier (e.g. "662" or "MAN-662")');
	
	if (text) {
		var m = text.match(/((\w+)-)?(\d+)/);
		if (!m)
			return alert('Pattern not matched (e.g. MAN-662)');
		
		var proj = (m[2] || defaultProj).toUpperCase();
		var id = m[3];
		var jiraId = proj + '-' + id;
		var baseUrl = baseUrls[proj];

		if (!baseUrl) {
			if (confirm('No url found for project "' + proj + '". Do you want to set it now?')) {
				var maps = [];
        for (var proj in baseUrls)
          maps.push(encodeURIComponent(proj) + '|' + encodeURIComponent(baseUrls[proj]));
				window.location = nest + '?proj=' + maps.join(',');
			} else {
				return;
			}
		}

		var url = baseUrl + (baseUrl[baseUrl.length - 1] == '/' ? '' : '/') + 'browse/' + jiraId;
		window.open(url);
	}
})();