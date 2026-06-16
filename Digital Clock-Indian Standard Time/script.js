let timeElement=document.getElementById("time")
const dateElement=document.getElementById("date")
let is24Hour=false;
const togglebtn=document.getElementById("toggle-btn")

function updateTime(){
const now=new Date()
hours=now.getHours()

minutes=now.getMinutes().toString().padStart(2,"0")
seconds=now.getSeconds().toString().padStart(2,"0")

let date = now.getDate().toString().padStart(2,"0");
month=(now.getMonth()+1).toString().padStart(2,"0");
year=now.getFullYear();
dateElement.textContent= date + "/" + month + "/" + year;
let ampm="";

if (is24Hour===false){
ampm= hours >=12 ? "PM": "AM";
hours=hours % 12;
hours=hours ? hours : 12;
}
else{
    hours=hours.toString().padStart(2,"0")
}
timeElement.innerText=hours+ ":" + minutes + ":" + seconds + " " + ampm ;

updateTime()
}
togglebtn.addEventListener("click" ,e =>{
    is24Hour=!is24Hour
    if(is24Hour===true){
        togglebtn.textContent="Switch to 12-Hour Format"
    }
    else{
        togglebtn.textContent="Switch to 24-Hour Format"
    }
}

)
setInterval(updateTime, 1000)