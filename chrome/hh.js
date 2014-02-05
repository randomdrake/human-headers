"use strict";

var filter = {urls: ['<all_urls>']},
    displayedMessages = [],
    opt_extraInfoSpec = ['responseHeaders'],
    callback = function (details) {
        var headers = details.responseHeaders,
            ii = 0,
            message = '';

        for (ii; ii < headers.length; ii++) {
            if (headers[ii].name.slice(0, 7) === 'X-Human') {
                if (!message.length) {
                    message = 'A developer left some Human Headers here!\n\n';
                }

                message += headers[ii].name.slice(8) + ': ' + headers[ii].value + '\n';
            } 
        }

        if (message.length && displayedMessages.indexOf(message) === -1) {
            if (confirm(message)) {
                displayedMessages.push(message);
            }
        } 
    };

chrome.webRequest.onHeadersReceived.addListener(callback, filter, opt_extraInfoSpec);
