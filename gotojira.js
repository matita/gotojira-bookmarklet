javascript:(function(){
	var defaultProj = '';
	var baseUrls = {};
	var text;
	
	if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
	
	if (!text)
		text = prompt('Write the JIRA identifier (e.g. "662" or "MAN-662")');
	
	if (text) {
		var m = text.match(/((\w+)-+)?(\d+)/);
		if (!m)
			return alert('Pattern not matched (e.g. MAN-662)');
		var proj = (m[1] || defaultProj).toUpperCase();
		var id = m[3];
		var jiraId = proj + '-' + id;
		var baseUrl = []
		var url = baseUrl + (baseUrl[baseUrl.length - 1] == '/' ? '' : '/') + 'browse/' + jiraId;
		window.open(url);
	}
})();