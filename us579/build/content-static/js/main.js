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
function initPage(){
    const app = createElement("div", null, { class: "container", id: "maaaaan", style:"display:none"});
    let talk_con = createElement("div", null, { class: "talk_con"})
    const bt = createElement("button",null, { id:"btt", alt: "" })
    bt.onclick = function () {
        app.style.display = "none";
    }
    talk_con.append(bt)
    let talk_show = createElement("div",null, { class: "talk_show",id:"words"})
    let Atalk = createElement("div",null,{class:"atalk"})
    let Btalk = createElement("div", null, { class: "btalk" })
    Atalk.appendChild(createElement("span","any problems for open source ?",{id:"asay"}))
    Btalk.appendChild(createElement("span", "a lot", { id:"bsay" }))
    talk_show.appendChild(Atalk);
    talk_show.appendChild(Btalk);
    let talk_input = createElement("div",null,{class:"talk_input"})
    talk_input.appendChild(createElement("input",null,{type:"text",class:"talk_word",id:"talkwords"}))
    talk_input.appendChild(createElement("input", null, { type: "button", value:"send",class: "talk_sub", id: "talksub" }))
    talk_con.appendChild(talk_show)
    talk_con.appendChild(talk_input)
    app.appendChild(talk_con)
    document.body.appendChild(app);
}

//
window.onload = function () {
    var Words = document.getElementById("words");
    var TalkWords = document.getElementById("talkwords");
    var TalkSub = document.getElementById("talksub");
    TalkSub.onclick = function () {
        var str = "";
        if (TalkWords.value == "") {
            alert("Input can not be empty");
            return;
        }

        // fill the code
        // connect with backend api

        if (localStorage.getItem("flag")==1){
            localStorage.setItem("flag", 0)
            str = '<div class="atalk"><span>A说 :' + TalkWords.value + '</span></div>';
            TalkWords.value ='';
        }else{
            localStorage.setItem("flag", 1)
            str = '<div class="btalk"><span>B说 :' + TalkWords.value + '</span></div>';
            TalkWords.value = '';
        }
        Words.innerHTML = Words.innerHTML + str;
        words.scrollTop = words.scrollHeight;
    }
}

// add listener to reopen the chatbox
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    let maaaan = document.getElementById("maaaaan");
    maaaan.style.display = "block";
});


