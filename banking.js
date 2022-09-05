let table = [];


let DB;
var email = location.search.split('name')[1]




    // create the database


    const  Bank= "LoginData";
    let ScheduleDB = window.indexedDB.open("Bank", 1);
    console.log(ScheduleDB);

   
    ScheduleDB.onerror = function () {
        console.log("error");
    };
    
    ScheduleDB.onsuccess = function () {
    

        DB = ScheduleDB.result;
        console.log(DB);

       
    };

    ScheduleDB.onupgradeneeded = function (e) {
        let db = e.target.result;

        db.objectStore = db.createObjectStore("Data", {
           
            autoIncrement: true,
        });
    };

function addData(data) {
    

    let transaction = DB.transaction("Data", "readwrite");
    let objectStore = transaction.objectStore("Data");
   

    let request = objectStore.add(data);
    request.onsuccess = () => {
       
    };
    transaction.oncomplete = () => {
        
       
    };
    transaction.onerror = () => {
       
    };
}
//  input value
function getInputValue(inputId) {
    const inputField = document.getElementById(inputId);
    
    const inputAmountT = inputField.value;
   
    const InputBalance = parseFloat(inputAmountT);
   

    //  clear input field

    inputField.value = "";
  
    return InputBalance;
}
//  update value
function updateTotalField(value, amount) {
    const showBalance = document.getElementById(value);

    const previousBalanceCheck = showBalance.innerText;
    console.log(previousBalanceCheck);
    const previousTotal = parseFloat(previousBalanceCheck);
    
    showBalance.innerText = previousTotal + amount;
}

function getCurrentBalance() {
    const balanceTotal = document.getElementById("balance-total");
   

    const previousBalanceCheck = balanceTotal.innerText;
    const previousBalanceTotal = parseFloat(previousBalanceCheck);


    return previousBalanceTotal;
}
//  Update balance
function updateBalance(amount, isAdd) {
    const balanceTotal = document.getElementById("balance-total");



    const previousBalanceTotal = getCurrentBalance();
    

    if (isAdd == true) {
        balanceTotal.innerText = previousBalanceTotal + amount;
    } else {
        balanceTotal.innerText = previousBalanceTotal - amount;
    }
}


// deposit side
document
    .getElementById("deposit-button")
    .addEventListener("click", function () {
        
        const depositAmount = getInputValue("deposit-input");
        if (depositAmount <= 0) return;

        var email =location.search.split('name')[1];
      

        const previousBalanceTotal = getCurrentBalance("deposit-input");

        const TotalAmount = getCurrentBalance("balance-total") + depositAmount;

        const time = DateTime(depositAmount);

        const values = {
            Email:email,
            Type: "Deposit",
            Amount: depositAmount,
            Previous_Balance: previousBalanceTotal,
            Current_Balance: TotalAmount,
            Time: time,
        };

        table.push(values);
        addData(values);
       

        bulidTable(table);
        function bulidTable(table) {
            let users = "";
            if (table.length > 0) {
                table.forEach((u) => {
                    users += "<tr>";
                    users += "<td>" + u.Type + "</td>";
                    users += "<td >" + u.Amount + "</td>";
                    users += "<td>" + u.Previous_Balance + "</td>";
                    users += "<td>" + u.Current_Balance + "</td>";
                    users += "<td>" + u.Time + "</td></tr>";
                });

                document.getElementById("myTable").innerHTML = users;
                console.log(users);
            }
        }

        if (depositAmount >= 0) {
            updateTotalField("deposit-total", depositAmount);

            updateBalance(depositAmount, true);

            document.querySelector("#error").innerHTML = "";
        } else {
            document.querySelector("#error").innerHTML =
                "<span style='color:red'>Enter You positive Number !!</span>";
        }
    });

//  withdraw side

document
    .getElementById("Widthdraw-button")
    .addEventListener("click", function () {
        const widthdrawAmount = getInputValue("Widthdraw-input");
        
        if (widthdrawAmount <= 0) return;

        const previousBalanceTotal = getCurrentBalance("Widthdraw-input");
        console.log(previousBalanceTotal);
     
        const TotalAmount =
            getCurrentBalance("balance-total") - widthdrawAmount;
        console.log(TotalAmount);
        const time = DateTime(widthdrawAmount);

        const values = {
            Type: "Widthdraw",
            Amount: widthdrawAmount,
            Previous_Balance: previousBalanceTotal,
            Current_Balance: TotalAmount,
            Time: time,
        };
        table.push(values);
        addData(values);
        console.log("table", table);

        bulidTable(table);
        function bulidTable(table) {
            let users = "";
            if (table.length > 0) {
                table.forEach((u) => {
                    users += "<tr>";
                    users += "<td>" + u.Type + "</td>";
                    users += "<td >" + u.Amount + "</td>";
                    users += "<td>" + u.Previous_Balance + "</td>";
                    users += "<td>" + u.Current_Balance + "</td>";
                    users += "<td>" + u.Time + "</td></tr>";
                });
                document.getElementById("myTable").innerHTML = users;
            }
        }

        const CurrentBalance = getCurrentBalance();
      

        if (widthdrawAmount > 0 && widthdrawAmount < CurrentBalance) {
            updateTotalField("widthdraw-total", widthdrawAmount);

            updateBalance(widthdrawAmount, false);

            document.querySelector("#errors").innerHTML = "";
        }

        if (widthdrawAmount > CurrentBalance) {
            document.querySelector("#errors").innerHTML =
                "<span style='color:red'>Not Enough Balance!!</span>";
        }
    });

function DateTime() {
    var date = new Date();
    var hours = date.getHours();
    var days = date.getDay();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime =
        date.toDateString() + " " + hours + ":" + minutes + " " + ampm;
    return strTime;
}
