// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.
// author: Wanze liu, z5137189
'use strict';

chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        // only can be used blow the any github page
        pageUrl: { hostEquals: 'github.com'},
      })],
      actions: [new chrome.declarativeContent.ShowPageAction()]
    }]);
  });
  return true;
});


// listen the message from content script and response them 
chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.contentScriptQuery) {
      chrome.storage.sync.get(['key'], function (result) {
        localStorage.setItem("token",result.key)
        console.log(token);
      })
      let token = localStorage.getItem("token")
      // request to the backend 
      let url =
        "http://127.0.0.1:5000/ChatService/chatbot?message=" +
        request.contentScriptQuery +
        "?huaci=" +
        request.huaci;
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
