let table=document.getElementById("multiplicationTable");


const headerRow = table.insertRow();
  const th1 = document.createElement("th");
  th1.textContent = "Number";
  const th2 = document.createElement("th");
  th2.textContent = "x5 Result";
  headerRow.appendChild(th1);
  headerRow.appendChild(th2);

for (let i = 1; i<=10; i++) {
    const row=table.insertRow();
    const column1=row.insertCell();
    const column2=row.insertCell();

    column1.textContent=i;
    column2.textContent=i*5;
}
