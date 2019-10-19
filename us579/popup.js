// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let chatbox = document.getElementById('chatbox');
chatbox.onclick = function (element) {
  // var bg = chrome.extension.getBackgroundPage();
  // bg.test();
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, { message: "close" }, function (response) {
    });//end  sendMessage   
  }); //end query
};

