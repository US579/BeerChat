// author: Wanze liu, z5137189

// help function
function createElement(tag, data, options = {}) {
  const ele = document.createElement(tag);
  ele.textContent = data;
  return Object.entries(options).reduce((element, [field, value]) => {
    element.setAttribute(field, value);
    return element;
  }, ele);
}

// inital chat page
function initPage() {
  const app = createElement("div", null, {
    class: "container",
    id: "maaaaan",
    style: "display:none"
  });
  let talk_con = createElement("div", null, { class: "talk_con" });
  const bt = createElement("button", null, { id: "btt", alt: "" });

  //Set up listening mode.
  const modebt = createElement("button", null, { id: "mtt", alt: "" });
  bt.onclick = function() {
    app.style.display = "none";
    sessionStorage.setItem("mentor", 0);
  };
  talk_con.append(bt);
  let talk_show = createElement("div", null, {
    class: "talk_show",
    id: "words"
  });
  let Atalk = createElement("div", null, { class: "atalk" });
  let Btalk = createElement("div", null, { class: "btalk" });
  Atalk.appendChild(
    createElement(
      "span",
      "Hi, in here, you could ask questions about python open source project coding.",
      { id: "asay" }
    )
  );
  Atalk.appendChild(
    createElement(
      "span",
      "If you want to ask any specific function to python type, please input eg: String type function first then begin search.",
      { id: "asay" }
    )
  );
  talk_show.appendChild(Atalk);
  // store the chat history in the sessionStorage
  if (sessionStorage.length) {
    for (var i = 0; i < sessionStorage.length; i++) {
      if (sessionStorage.getItem(i) == null) {
        continue;
      }
      let ans = sessionStorage.getItem(i);
      if (ans.slice(0, 2) === "b:") {
        let Atalk = createElement("div", null, { class: "btalk" });
        Atalk.appendChild(createElement("span", ans.slice(2), { id: "asay" }));
        talk_show.appendChild(Atalk);
      } else {
        var myIndex = ans.slice(2).indexOf("@");
        if (myIndex != -1) {
          var name = ans.slice(2).slice(0, myIndex);
          var content = ans.slice(2).slice(myIndex + 1);
          let div = createElement("div",null,{})
          div.appendChild(createElement("p",name,{id:"name"}))
          let Btalk = createElement("div", null, { class: "atalk" });
          Btalk.appendChild(createElement('span',content,{}))
          div.appendChild(Btalk)
          talk_show.appendChild(div);
        } else {
          let Btalk = createElement("div", null, { class: "atalk" });
          Btalk.appendChild(
            createElement("span", ans.slice(2), { id: "bsay" })
          );
          talk_show.appendChild(Btalk);
        }
      }
    }
  }
  let talk_input = createElement("div", null, { class: "talk_input" });
  talk_input.appendChild(
    createElement("input", null, {
      type: "text",
      class: "talk_word",
      id: "talkwords"
    })
  );
  talk_input.appendChild(
    createElement("input", null, {
      type: "button",
      value: "Send",
      class: "talk_sub",
      id: "talksub"
    })
  );
  talk_input.appendChild(
    createElement("input", null, {
      type: "button",
      value: "Switch",
      class: "talk_sub",
      id: "Mentor_mode"
    })
  );
  talk_con.appendChild(talk_show);
  talk_con.appendChild(talk_input);
  app.appendChild(talk_con);
  document.body.appendChild(app);
}

// call initial page
initPage();

document.οnkeydοwn = function(e) {
  var keyNum = window.event ? e.keyCode : e.which;
  if (keyNum == 108) {
    alert("enter");
  }
};

// clear the token and chat history
function clearLocalStorage() {
  chrome.storage.local.clear(function() {
    var error = chrome.runtime.lastError;
    if (error) {
      console.error(error);
    }
  });
}

window.onload = function() {
  var Words = document.getElementById("words");
  var TalkWords = document.getElementById("talkwords");
  var mentor_mode = document.getElementById("Mentor_mode");
  var Mode_on = false;
  var TalkSub = document.getElementById("talksub");
  var socket = new WebSocket("ws://localhost:8080/ws");
  if (!window.WebSocket) {
    window.WebSocket = window.MozWebSocket;
  }
  //chat response
  if (window.WebSocket) {
    socket.onmessage = function(event) {
      var Words = document.getElementById("words");
      if (!sessionStorage.getItem(sessionStorage.length)) {
        sessionStorage.setItem(sessionStorage.length, "a:" + event.data);
      }
      let data = event.data;
      var myIndex = data.indexOf("@");
      var name = data.slice(0, myIndex);
      var content = data.slice(myIndex + 1);
      let str3 =
        '<div><p id="name">' +
        name +
        '</p><div class="atalk"><span>' +
        content +
        "</span></div></div>";
      if (Mode_on) {
        Words.innerHTML = Words.innerHTML + str3;
      }
      Words.scrollTop = words.scrollHeight;
    };
  } else {
    alert("you browser not support WebSocket！");
  }

  // mentor chat part (send the message to the backend)
  function send(message) {
    if (!window.WebSocket) {
      return;
    }
    if (socket.readyState == WebSocket.OPEN) {
      socket.send(message);
    } else {
      alert("connect is not open");
    }
  }

  TalkSub.onclick = function() {
    // check whether user login or not
    chrome.storage.sync.get(["key"], function(result) {
      var key = result.key;
      if (!key) {
        var Words = document.getElementById("words");
        let warn =
          '<div style="text-align: center; padding:5px 10px;">' +
          "Oops! you haven't login yet" +
          "</div>";
        TalkWords.value = "";
        Words.innerHTML = Words.innerHTML + warn;
        Words.scrollTop = Words.scrollHeight;
        return;
      } else {
        if (sessionStorage.getItem("mentor") == 1) {
          if (TalkWords.value == "") {
            alert("Input can not be empty");
            return;
          }
          send(TalkWords.value);
          var Words = document.getElementById("words");
          let str4 =
            '<div class="btalk"><span>' + TalkWords.value + "</span></div>";
          sessionStorage.setItem(sessionStorage.length, "b:" + TalkWords.value);
          Words.innerHTML = Words.innerHTML + str4;
          TalkWords.value = "";
          Words.scrollTop = words.scrollHeight;
          return;
        }
        // check input
        var str = "";
        if (TalkWords.value == "") {
          alert("Input can not be empty");
          return;
        }
        str = '<div class="btalk"><span>' + TalkWords.value + "</span></div>";
        sessionStorage.setItem(sessionStorage.length, "b:" + TalkWords.value);
        if (sessionStorage.getItem("mentor") != 1) {
          chrome.runtime.sendMessage(
            { contentScriptQuery: TalkWords.value, huaci: "False" },
            function(res) {
              var Words = document.getElementById("words");
              Words.innerHTML = Words.innerHTML + str;
              var str2 =
                '<div class="atalk"><span>' + res.messge + "</span></div>";
              sessionStorage.setItem(sessionStorage.length, "a:" + res.messge);
              TalkWords.value = "";
              Words.innerHTML = Words.innerHTML + str2;
              Words.scrollTop = Words.scrollHeight;
            }
          );
        }
        TalkWords.value = "";
        words.scrollTop = words.scrollHeight;
      }
    });
  };

  // metor mode eventlistener
  mentor_mode.onclick = function() {
    if (Mode_on == true) {
      Mode_on = !Mode_on;
      alert("Mentor mode has been turned off!");
      sessionStorage.setItem("mentor", 0);
    } else {
      Mode_on = !Mode_on;
      alert("Mentor mode has been turned on!");
      sessionStorage.setItem("mentor", 1);
    }
  };
};

// add listener to reopen the chatbox
chrome.runtime.onMessage.addListener(function(sendResponse) {
  let maaaan = document.getElementById("maaaaan");
  maaaan.style.display = "block";
  sendResponse({ farewell: "ok" });
});

// hypertranslation
(function() {
  "use strict";
  var trsBlock = createBlock();
  document.body.appendChild(trsBlock);
  window.onmousedown = () => hideElement(trsBlock);
  window.onmouseup = e => translation(getWord(), trsBlock, e);
})();

function createBlock() {
  var block = document.createElement("div");
  block.className =
    "card bg-light mb-3 shadow bg-white rounded max-width:100px";
  block.style.cssText = "position: absolute; z-index: 999999;";
  return block;
}

function hideElement(el) {
  el.style.display = "none";
  el.innerHTML = "";
}
// send the message to the backend.js to request and receive response than display on the webpage
function translation(word, el, e) {
  if (word === null || word === undefined) return null;
  var result = "";
  chrome.storage.sync.get(["key"], function(result) {
    var key = result.key;
    if (key) {
      chrome.storage.sync.get(["onoff"], function(result) {
        if (result.onoff === 0) {
          chrome.runtime.sendMessage(
            { contentScriptQuery: word, huaci: "True" },
            function(res) {
              let result = res.messge;
              el.style.left = "" + e.pageX + "px";
              el.style.top = "" + e.pageY + "px";
              let title = createElement("h4", word, { class: "card-header" });
              let trans = createElement("p", result, { class: "card-text" });
              el.appendChild(title);
              el.appendChild(trans);
              el.style.display = "block";
            }
          );
        }
      });
    }
  });
  return result;
}

//get the word text when user select
function getWord() {
  var word = window.getSelection().toString();
  if (word === "") return;
  return word;
}

// the function to obtain the x , y position
function mouseCoords(ev) {
  if (ev.pageX || ev.pageY) {
    return { x: ev.pageX, y: ev.pageY };
  }
  return {
    x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
    y: ev.clientY + document.body.scrollTop - document.body.clientTop
  };
}
