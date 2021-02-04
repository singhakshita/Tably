var port = chrome.extension.connect({
    name: "Sample Communication"
});
//port.postMessage("Hi BackGround");
port.onMessage.addListener(function(msg) {
    console.log("message recieved" + msg);
    addToList(msg);
});

let ul = document.querySelector("#ul");

function addToList(activeTabUrl){
   let a =document.createElement('a');
   a.setAttribute("href" ,activeTabUrl);
   a.setAttribute("class" , "link");
   a.innerHTML = activeTabUrl;
   ul.appendChild(a);
}

window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
      chrome.tabs.create({url:e.target.href})
    }
})





