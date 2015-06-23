var _AppHelper = (function() {
    var
        ajax = function (options) {
            var prepData = function (data) {
                var polishedData = [];

                if (typeof data === 'object') {
                    for (var index in data) {
                        var value = data[index];
                        polishedData.push(encodeURIComponent(index) + '=' + encodeURIComponent(value));
                    }
                }

                return polishedData.join('&');
            };

            var url = options.url,
                xhr = new XMLHttpRequest(),
                type = (options.type) ? options.type : 'GET',
                data = prepData(options.data);

            if (! url) {
                console.error('Url not supplied for the request!!');
                return false;
            }

            xhr.onreadystatechange = function () {
                if(xhr.readyState < 4) {
                    return;
                }

                if (xhr.status == 200) {
                    if (options.success) {
                        options.success(xhr.responseText, xhr.readyState);
                    }
                } else {
                    console.error("FailureResponse --> State:" + xhr.readyState + "Status:" + xhr.status);
                }
            };

            if ('POST' === type) {
                xhr.open(type, url, true);
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xhr.send(data);
            }

            if ('GET' === type) {
                url += ("" === data) ? "" : ("?" + data);
                xhr.open(type, url);
                xhr.send();
            }
        };

    return {
        ajax: ajax
    }
})();