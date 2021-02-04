
let allTabsList = [];
let isLoaded = false;

function sendUrls( msg){
  chrome.extension.onConnect.addListener(function(port) {
      console.log("Connected .....");
      // port.onMessage.addListener(function(msg) {
      //      console.log("message recieved" + msg);
      //      port.postMessage("Hi popup.js");
      // });
    port.postMessage(msg);
  })
} 
function handleCreated(tab) {
  console.log(tab);

 chrome.tabs.onUpdated.addListener(function(tabId ,info){
    if( info.status === 'complete'){
      isLoaded = true;
    }
  })

  chrome.tabs.query({}, function (tabs) {
      for(let i=0;i<tabs.length;i++){
            tabURL = tabs[i].url;
            if(! allTabsList.includes(tabURL)){
              console.log(tabURL);
              allTabsList.push(tabURL);
              console.log("push kiya jane wala url" , tabURL);
              sendUrls(tabURL);
            } 
            if(isLoaded){
             removeTab(tabs[i]);
            } 
      }
  });
}
  
chrome.tabs.onCreated.addListener(handleCreated);

function removeTab(tab){
  chrome.tabs.remove(tab.id ,function(){})
  isLoaded = false;  
}











  