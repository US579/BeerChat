
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
const nav = createElement("nav", null, { class: "navbar navbar-light bg-light"})
nav.appendChild(createElement("a","cChat", {class:"navbar-brand"}))
const bt = createElement("button", "close", { width: "30", height: "30", class: "d-inline-block align-top", alt: "" })
bt.onclick = function () {
    app.style.display = "none";
}
nav.appendChild(bt)
app.appendChild(nav)

const content = createElement("div", null, { id: "scrolldIV",style : "overflow:auto; height: 300px; width: 250px; border: 1px solid #999;"})
app.appendChild(content)

// footer
const postComment = createElement("div", null, { id: "footer", style: "display:inline"})
postComment.appendChild(createElement("input", null, {id:"input", class: "foot",style:"width:60%", type: "text", placeholder: "input here"}))
const sendbt = createElement("button", "send", { id: "send", class: "foot", type: "button" })
sendbt.addEventListener("click",(event)=>{
   
    const form = document.getElementById("input");
    const content = form.value;
    // alert(content); //user的值
    document.getElementById("scrolldIV").innerHTML = content

})
postComment.appendChild(sendbt)

app.appendChild(postComment)
document.body.appendChild(app);


// add listener to reopen the chatbox
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    // sendResponse('我已收到你的消息：' + JSON.stringify(request));//做出回应
    let maaaan = document.getElementById("maaaaan");
    maaaan.style.display = "block";
});


