// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// author: Wanze liu, z5137189
'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#6ab759'}, function() {
    console.log('The color is green.');
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { hostEquals: 'github.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
});

function test(){
  let maaaan = document.getElementById("maaaaan");
  maaaan.style.display = "block";
  console.log("click");
  alert("llllllllllllll")
  // chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  //   chrome.tabs.executeScript(
  //     tabs[0].id,
  //     { code: 'document.body.style.backgroundColor = "' + "black" + '";' });
  // });
};



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
