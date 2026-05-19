const list=document.getElementById("booklist")
let arr=["book1", "book2", "book3", "book4", "book5"]
for(let i=0; i < arr.length; i++){

let listItem=document.createElement("li");

listItem.textContent=arr[i];
list.appendChild(listItem);
}