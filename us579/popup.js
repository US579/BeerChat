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

// for login
let onBut1 = document.getElementById("login");
const dc1 = document.getElementById("login-popup");
let onBut2 = document.getElementById("signup");
const dc2 = document.getElementById("signup-popup");
onBut1.onclick = () => {
  if (dc2.style.display == "block") {
    return
  }
  if (dc1.style.display == "none") {
    dc1.style.display = "block";
  } else {
    dc1.style.display = "none";
  }
};

//for signup
onBut2.onclick = () => {
  if (dc1.style.display == "block"){
    return
  }
    if (dc2.style.display == "none") {
      dc2.style.display = "block";
    } else {
      dc2.style.display = "none";
    }
};