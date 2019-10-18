
function createElement(tag, data, options = {}) {
  const ele = document.createElement(tag);
  ele.textContent = data;
  return Object.entries(options).reduce((element, [field, value]) => {
    element.setAttribute(field, value);
    return element;
  }, ele);
}


const app = createElement("div", null, { class: "container", id: "maaaaan", style:"display:none"});
// header 
// const chat = createElement("div",null,{class:"bootstrapchat",id:"chat1"})
// const nav = createElement("nav", null, { class: "navbar navbar-light bg-light"})
// nav.appendChild(createElement("a","cChat", {class:"navbar-brand"}))
// const bt = createElement("button", "close", { width: "30", height: "30", class: "d-inline-block align-top", alt: "" })
// bt.onclick = function () {
//     app.style.display = "none";
// }
// nav.appendChild(bt)
// app.appendChild(nav)

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
let select= createElement("select",null,{class:"whotalk",id:"who"})
select.appendChild(createElement("option",null,{value:"0"}))
select.appendChild(createElement("option", null, {value:"1"}))
talk_input.appendChild(createElement("input",null,{type:"text",class:"talk_word",id:"talkwords"}))
talk_input.appendChild(createElement("input", null, { type: "button", value:"send",class: "talk_sub", id: "talksub" }))

talk_con.appendChild(talk_show)
talk_con.appendChild(talk_input)
app.appendChild(talk_con)
// const content = createElement("div", null, { id: "scrolldIV",style : "overflow:auto; height: 300px; width: 250px; border: 1px solid #999;"})
// app.appendChild(content)

// footer
// const postComment = createElement("div", null, { id: "footer", style: "display:inline"})
// postComment.appendChild(createElement("input", null, {id:"input", class: "foot",style:"width:60%", type: "text", placeholder: "input here"}))
// const sendbt = createElement("button", "send", { id: "send", class: "foot", type: "button" })
// sendbt.addEventListener("click",(event)=>{
   
//     const form = document.getElementById("input");
//     const content = form.value;
//     // alert(content); //user的值
//     document.getElementById("scrolldIV").innerHTML = content

// })
// postComment.appendChild(sendbt)

// app.appendChild(postComment)
document.body.appendChild(app);



window.onload = function () {
    var Words = document.getElementById("words");
    var Who = document.getElementById("who");
    var TalkWords = document.getElementById("talkwords");
    var TalkSub = document.getElementById("talksub");
    TalkSub.onclick = function () {
        var str = "";
        if (TalkWords.value == "") {
            alert("input can not be empty");
            return;
        }
        
        if (localStorage.getItem("flag")==1){
            localStorage.setItem("flag", 0)
            str = '<div class="atalk"><span>A说 :' + TalkWords.value + '</span></div>';
            TalkWords.value ='';
        }else{
            localStorage.setItem("flag", 1)
            str = '<div class="btalk"><span>B说 :' + TalkWords.value + '</span></div>';
            TalkWords.value = '';
        }

        // if (Who.value == 0) {
        //     str = '<div class="atalk"><span>A说 :' + TalkWords.value + '</span></div>';
        // }
        // else {
        //     str = '<div class="btalk"><span>B说 :' + TalkWords.value + '</span></div>';
        // }
        Words.innerHTML = Words.innerHTML + str;
        words.scrollTop = words.scrollHeight;
    }

}


// add listener to reopen the chatbox
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // sendResponse('我已收到你的消息：' + JSON.stringify(request));//做出回应
    let maaaan = document.getElementById("maaaaan");
    maaaan.style.display = "block";
});


