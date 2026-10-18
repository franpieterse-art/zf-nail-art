(()=>{
let installPrompt=null;const button=document.getElementById('installApp'),dialog=document.getElementById('installGuide'),status=document.getElementById('appStatus');
function standalone(){return window.matchMedia('(display-mode: standalone)').matches||window.navigator.standalone===true}
function refresh(){button.hidden=standalone();status.textContent=navigator.onLine?'App ready · saves designs on this device':'Offline · your nail studio is available'}
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();installPrompt=event;button.textContent='Install app'});
button.addEventListener('click',async()=>{if(installPrompt){try{await installPrompt.prompt();const choice=await installPrompt.userChoice;installPrompt=null;if(choice.outcome==='accepted'){button.hidden=true;status.textContent='App installed · open ZF Nails from your home screen'}}catch(error){dialog.showModal()}}else dialog.showModal()});
document.getElementById('closeInstall').onclick=()=>dialog.close();dialog.addEventListener('click',event=>{if(event.target===dialog)dialog.close()});window.addEventListener('appinstalled',()=>{installPrompt=null;button.hidden=true;status.textContent='ZF Nails installed'});window.addEventListener('online',refresh);window.addEventListener('offline',refresh);refresh();
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost'||location.hostname==='127.0.0.1')){navigator.serviceWorker.register('./sw.js').then(()=>navigator.serviceWorker.ready).then(()=>{status.textContent=navigator.onLine?'Ready to install · offline designs available':'Offline · your nail studio is available'}).catch(()=>{status.textContent='Online app ready · offline setup could not complete'})}
})();
