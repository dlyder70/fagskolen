const express = require('express'); // bruker node.js express web app framework 
const app = express(); // get app instance (express function) 
//env var PORT hentes inn fra fila .env som definert under scripts 
// start
// dette er verdien som hentes av process.env.PORT 
const port = process.env.PORT || '3333'; //default til port 3333 
function announceTime(clock) { 
clock = clock || Date // Unix epoch 
var utcSec = clock.now() / 1000 // sekunder 
var convdate = new Date(0); 
convdate.setUTCSeconds(utcSec); 
return 'Applikasjonen startet ' + convdate 
} 
var clockNow = announceTime(); 
app.get('/', (req, res) => { 
var accessedBy = req.ip.split(":").pop(); 
res.send(clockNow + '. <br/><br/>Kalkulator på <a href="./timeconv">/timeconv</a> .<br/>UnixEpochTime på <a href="./unixepoch">/unixepoch</a> .<br><br>Aksessert fra ' + accessedBy); 
}); 
function announceUxEpoch(clock) { 
    clock = clock || Date 
    var uxEpoch = clock.now() 
    return 'Unix epoch: ' + uxEpoch + ' (ms)' 
} 
var uxEpochNow = announceUxEpoch(); 
app.get('/unixepoch', (req, res) => { 
    res.send(uxEpochNow); 
}); 
app.get('/timeconv', (req, res)=>{ 
res.sendFile(__dirname + "/timeconv/" + "timeconv.html"); 
}); 
app.get('/timeconv/timeconv_stylesheet.css', (req, res)=>{ 
res.sendFile(__dirname + "/timeconv/" + 
"timeconv_stylesheet.css"); 
}); 
app.listen(port, (error) => { 
if(!error) 
console.log('Applikasjonen er aktiv på http://localhost:' 
+ port +'/timeconv'); 
else 
console.log('Applikasjonen feiler'); 
});