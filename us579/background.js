// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// author: Wanze liu, z5137189
'use strict';

chrome.runtime.onInstalled.addListener(function() {
  // chrome.storage.sync.set({color: '#6ab759'}, function() {
  //   console.log('The color is green.');
  // });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'github.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  return true;
});


chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery) {
       var token =
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJlbWFpbCI6IjEiLCJleHAiOjE1NzE1NTg1OTN9.y6TTqBu2rlRSUQWTvZHLRqFU5TREnzNX0G3xobV6q8s";
      let url = "http://127.0.0.1:5000/ChatService/chatbot?message=" + request.contentScriptQuery ;
        console.log(url)
        fetch(url, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Token': token
            }
        })
        .then(res=>res.json())
        .then(res => sendResponse(res))
        .catch(error=>console.log(error))
      return true;  // Will respond asynchronously.
    }
  });

// async function doSomethingWith(request) {
//   var key = await getKey();
//   // await .....
//   return key;
// }

// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//   if (request.clearIcon) {
//     chrome.browserAction.setBadgeText({ text: "" })
//   } else if (request.makeRequest) {
//     fetch(request.url, request.options)
//       .then(response => response.json())
//       .then(data => {
//         sendResponse({
//           ok: true,
//           data: data
//         })
//         console.log(data)
//       })
//       .catch(error => {
//         sendResponse({
//           data: error,
//           ok: false
//         })
//         console.error("Error:", error)
//       })

//     // fetch(request.url, request.options).then(
//     //     function(response) {

//     //         return response.text().then(function(text) {
//     //             sendResponse([
//     //                 {
//     //                     body: text,
//     //                     status: response.status,
//     //                     statusText: response.statusText
//     //                 },
//     //                 null
//     //             ])
//     //         })
//     //     },
//     //     function(error) {
//     //         sendResponse([null, error])
//     //     }
//     // )
//     return true
//   }
// })
