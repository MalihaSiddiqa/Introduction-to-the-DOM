
const timeElement=document.getElementById("time")
function updateTime(){
    const now=new Date();
    let hours= now.getHours()
    let minutes=now.getMinutes().toString().padStart(2,"0")
    let seconds=now.getSeconds().toString().padStart(2,"0")
let date=now.getDate().toString().padStart(2,"0")
let month=(now.getMonth()+1).toString().padStart(2,"0")
let year=now.getFullYear()
dateElement.textContent=date + "/" + month + "/" + year;
let ampm="";
if (is24Hour === false) {
    ampm=hours>=12 ? "PM" : "AM";
    hours= hours % 12 ;
    hours= hours ? hours : 12;
} 
else{
    hours=hours.toString().padStart(2,"0");
}
timeElement.textContent= hours + ":" + minutes + ":" + seconds + ampm ;

}
const dateElement=document.getElementById("date");

let is24Hour= false;
const toggleBtn=document.getElementById("toggle-btn");
toggleBtn.addEventListener("click", e => {
is24Hour=!is24Hour;
    if (is24Hour===true) {
        toggleBtn.textContent="Switch to 12-hour format"
    }
    else {
        toggleBtn.textContent="Switch to 24-hour format"
    }
})
updateTime();
setInterval(updateTime, 1000);
