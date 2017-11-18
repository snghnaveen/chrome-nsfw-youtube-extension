document.addEventListener('DOMContentLoaded', function () {
    chrome.tabs.getSelected(null, function (tab) {
        var currentTabUrl = tab.url;

        if ((currentTabUrl).match('youtube.com')) {
            var videoId = getVideoId(currentTabUrl);

            if (videoId !== null) {
                chrome.tabs.create({
                    url: "https://www.youtube.com/embed/" + videoId
                });
            }
            else {
                document.getElementById('status').textContent = 'Video id not found :(';
            }
        } else {
            document.getElementById('status').textContent = 'No Youtube URL Found';
        }
    });
});


function getVideoId(url) {
    var videoId = getParameterByName('v', url);
    if (videoId === null) {
        var nextQueryParam = getParameterByName('next', url);
        var alternativeUrl = "https://www.youtube.com" + nextQueryParam;
        videoId = getParameterByName('v', alternativeUrl);
    }
    return videoId;

}

/**
 * @param name
 * @param url
 * @returns {*}
 * @link https://stackoverflow.com/a/901144
 */
function getParameterByName(name, url) {
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}