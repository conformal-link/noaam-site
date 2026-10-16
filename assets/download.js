// Download links go through noaam.dev/download, which counts the download and
// redirects to the latest DMG. The utm_ tags a visitor arrived with, and the site
// they came from, are passed along on that link so downloads can be counted per
// campaign. They're kept in sessionStorage, so only for this tab.
(function () {
  var keys = ['utm_source', 'utm_medium', 'utm_campaign'];
  var params = new URLSearchParams(location.search), from = {};
  try { from = JSON.parse(sessionStorage.getItem('noaam-from') || '{}'); } catch (e) {}
  if (keys.some(function (k) { return params.get(k); })) {
    var ref = from.ref; from = {};
    keys.forEach(function (k) { if (params.get(k)) from[k] = params.get(k); });
    if (ref) from.ref = ref;
  }
  if (!from.ref && document.referrer) {
    try {
      var host = new URL(document.referrer).hostname;
      if (host !== location.hostname) from.ref = host;
    } catch (e) {}
  }
  try { sessionStorage.setItem('noaam-from', JSON.stringify(from)); } catch (e) {}
  var query = new URLSearchParams(from).toString();
  if (!query) return;
  document.querySelectorAll('a[href="/download"]').forEach(function (a) { a.href = '/download?' + query; });
})();
