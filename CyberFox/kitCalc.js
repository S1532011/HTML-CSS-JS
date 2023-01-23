var numRows = 0; //Number of rows in input

// Asks if you want to leave the site in case you haven't saved
window.addEventListener('beforeunload', function (e) {
    if(true) {
        e.preventDefault();
        e.returnValue = '';
    }
});

/** Function when the tab finishes loading */
function onStart() {
    if(localStorage.getItem("darkMode") == "1") {
        toggleDarkMode(); // Turn dark mode on if it was on the last time the user was using this site
    }
    addRow(); // Add a row to the data input
    placeholderOutput(); // Put placeholder in output
}

/** Function to add a new row to input */
function addRow() {
    if(numRows > 1) {
        document.getElementById("r" + numRows + "b").disabled = true;
    }
    numRows++;
    //addRowLineBreakInput(numRows);
    addRowTextInput("Item Name", numRows, "itemName", "kit-list-itemName");
    addRowTextInput("Amount in Pack", numRows, "amountInPack", "kit-list-amountInPack");
    addRowTextInput("Amount in Kit", numRows, "amountInKit", "kit-list-amountInKit");
    addRowTextInput("Item Price", numRows, "itemPrice", "kit-list-itemPrice");
    if(numRows > 1) {
        addRowButtonInput("X", "red", numRows);
    }
}

/*function addRowLineBreakInput(rowNum) {
    var br = document.createElement("br");
    br.className = "li" + rowNum;
    document.getElementById("kit-list-itemName").appendChild(br);
    document.getElementById("kit-list-amountInPack").appendChild(br);
    document.getElementById("kit-list-amountInKit").appendChild(br);
    document.getElementById("kit-list-itemPrice").appendChild(br);
}*/

/** Function to add a new line to Output */
function addRowLineBreakOutput(rowNum) {
    var br = document.createElement("br");
    //br.className = "oli" + rowNum;
    document.getElementById("kit-calc-output-itemName").appendChild(br);
    document.getElementById("kit-calc-output-amountToBuy").appendChild(br);
    document.getElementById("kit-calc-output-cost").appendChild(br);
}

/** Function to add a new text item to input */
function addRowTextInput(placeholder, rowNum, columnId, kitListId) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "text");
    x.setAttribute("placeholder", placeholder);
    x.id = "r" + rowNum + columnId;
    x.className = "li" + rowNum + " " + kitListId + " list-object text-box";
    document.getElementById(kitListId).appendChild(x);
}

/** Function to add the delete button to a row */
function addRowButtonInput(value, color, rowNum) {
    var x = document.createElement("INPUT");
    x.setAttribute("type", "button");
    x.setAttribute("value", value);
    x.setAttribute("color", color);
    x.onclick = function() {
        deleteListItem(rowNum);
    };
    x.id = "r" + rowNum + "b";
    x.className = "li" + rowNum + " delete-row-button list-object";
    document.getElementById("kit-list-deleteRowButton").appendChild(x);
}

/** Function to delete a row in input */
function deleteListItem(rowNum) {
    var elements = document.getElementsByClassName("li" + rowNum);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
    numRows--;
    document.getElementById("r" + numRows + "b").disabled = false;
}

/** Function to clear all data in input rows */
function clearAllRows() {
    // Verifies if you really want to clear all input data
    var result = confirm("Are you sure you want to clear the item list?\n!WARNING! This action cannot be undone!");
    if (result) {
        document.getElementById("kit-list-itemName").innerHTML = "";
        document.getElementById("kit-list-amountInPack").innerHTML = "";
        document.getElementById("kit-list-amountInKit").innerHTML = "";
        document.getElementById("kit-list-itemPrice").innerHTML = "";
        document.getElementById("kit-list-deleteRowButton").innerHTML = "";
        
        numRows = 0;
        addRow();
        placeholderOutput();
        return true;
    }
    return false;
}

/** Placeholder for calculator output */
function placeholderOutput() {
    document.getElementById("kit-calc-output-itemName").innerHTML = "";
    document.getElementById("kit-calc-output-amountToBuy").innerHTML = "";
    document.getElementById("kit-calc-output-cost").innerHTML = "";
    
    addStringToList("kit-calc-output-itemName", "-----", "kit-calc-output-text");
    addStringToList("kit-calc-output-amountToBuy", "-----", "kit-calc-output-text");
    addStringToList("kit-calc-output-cost", "$--.--", "kit-calc-output-text");
}

/** Function to add a string to a given element */
function addStringToList(elementId, valueToSet, classes) {
    var x = document.createElement("p");
    var string = document.createTextNode(valueToSet);
    x.appendChild(string);
    x.className = classes;
    document.getElementById(elementId).appendChild(x)
}

/** Functions to add 2 strings to the given element */
function addTwoPartStringToList(elementId, valueToSet1, valueToSet2, classes) {
    var x = document.createElement("p");
    var string1 = document.createTextNode(valueToSet1);
    x.appendChild(string1);
    var string2 = document.createTextNode(valueToSet2);
    x.appendChild(string2);
    x.className = classes;
    document.getElementById(elementId).appendChild(x)
}

/** Function to calculate what the output should be based on the given input */
function calculate() {
    var totalCost = 0;
    //document.getElementById("testingId").innerHTML = document.getElementById("numKits").value;
    //document.getElementById("testingId").innerHTML = getItemName(1);
    
    document.getElementById("kit-calc-output-itemName").innerHTML = "";
    document.getElementById("kit-calc-output-amountToBuy").innerHTML = "";
    document.getElementById("kit-calc-output-cost").innerHTML = "";
    
    //var amountToBuy = document.getElementById("r1itemName").value + " " + document.getElementById("r1amountInPack").value + " " + document.getElementById("r1amountInKit").value + " " + document.getElementById("numKits").value;
    for(var i = 1; i <= numRows; i++) {
    //let i = 1;
        if(checkForInvalidInput(i)) {
            outputItemName(i);
            outputAmountToBuy(i);
            outputCost(i);
        } else {
            placeholderOutput();
            return;
        }
	totalCost += getCost(i);
    }

    /*var x = document.createElement("p");
    x.className = "kit-calc-output-text kit-calc-output-line";
    var stringTotalCost = document.createTextNode("----------	");
    x.appendChild(stringTotalCost);
    document.getElementById("kit-calc-output-amountToBuy").appendChild(x);
    document.getElementById("kit-calc-output-cost").appendChild(x);*/
    
    totalCost = Math.round(totalCost * 100) / 100;
    addStringToList("kit-calc-output-amountToBuy", "Total Cost:", "kit-calc-output-text bold");
    addTwoPartStringToList("kit-calc-output-cost", "$", totalCost, "kit-calc-output-text bold");
    
    /*var z = document.createElement("p");
    z.className = "kit-calc-output-text kit-calc-output-bold";
    var dollarSign = document.createTextNode("Total Cost:");
    z.appendChild(dollarSign);
    z.style.bold = true;
    document.getElementById("kit-calc-output-amountToBuy").appendChild(z);*/
    
    
    /*var z = document.createElement("p");
    z.className = "kit-calc-output-text kit-calc-output-bold";
    var dollarSign = document.createTextNode("$");
    z.appendChild(dollarSign);
    var outputTotalCost = document.createTextNode(totalCost);
    z.appendChild(outputTotalCost);
    z.style.bold = true;
    document.getElementById("kit-calc-output-cost").appendChild(z);*/


    //var text = document.createTextNode("Tutorix is the best e-learning platform");
    //tag.appendChild(text);
    //var element = document.getElementById("kit-calc-output-itemName");
    //element.appendChild(tag);
   
   
   
    //var x = document.createTextNode("hello\n");
    //addRowLineBreakOutput(1);
    //document.getElementById("kit-calc-output-itemName").appendChild(x);
    //numToBuy = amountInKit * numberOfKits / amountInPack;
}

/** Function to get the name of an item */
function getItemName(rowNum) {
    return document.getElementById("r" + rowNum +"itemName").value;
}

/** Function to get the "Amount in pack" of an item */
function getAmountInPack(rowNum) {
    return document.getElementById("r" + rowNum +"amountInPack").value;
}

/** Function to get the "Amount in Kit" of an item */
function getAmountInKit(rowNum) {
    return document.getElementById("r" + rowNum +"amountInKit").value;
}

/** Function to get the number of kits to calculate for */
function getNumKits() {
    return document.getElementById("numKits").value;
}

/** Function to detirmine the amount of Packs to buy to get the number of Kits times the number in each kit of an item */
function getAmountToBuy(rowNum) {
    return Math.ceil((parseFloat(getAmountInKit(rowNum)) * parseFloat(getNumKits())) / parseFloat(getAmountInPack(rowNum)));
}

/** Function to get the price of an item */
function getItemPrice(rowNum) {
    return parseFloat(document.getElementById("r" + rowNum +"itemPrice").value);
}

/** Function to get the total cost of an item */
function getCost(rowNum) {
    return getAmountToBuy(rowNum) * getItemPrice(rowNum);
}

/** Function to put the item name in output */
function outputItemName(rowNum) {
    var x = document.createElement("p");
    var itemName = document.createTextNode(getItemName(rowNum));
    x.appendChild(itemName);
    x.className = "kit-calc-output-text";
    document.getElementById("kit-calc-output-itemName").appendChild(x);
}

/** Function to put amount of pack to buy in output */
function outputAmountToBuy(rowNum) {
    var x = document.createElement("p");
    var amountToBuy = document.createTextNode(getAmountToBuy(rowNum));
    x.appendChild(amountToBuy);
    x.className = "kit-calc-output-text";
    document.getElementById("kit-calc-output-amountToBuy").appendChild(x);
}

/** Function to put the total cost of an item in output */
function outputCost(rowNum) {
    var x = document.createElement("p");
    var dollarSign = document.createTextNode("$");
    x.appendChild(dollarSign);
    var cost = document.createTextNode(getCost(rowNum));
    x.appendChild(cost);
    x.className = "kit-calc-output-text";
    document.getElementById("kit-calc-output-cost").appendChild(x);
}

/** Function to see if there is any input that wouldn't work with the program */
function checkForInvalidInput(rowNum) {
    if(getItemName(rowNum) == "") {
        alert("No input for \"Item Name\" entered in row: " + rowNum + "!");
        return false;
    }
    if(getNumKits() == "") {
        alert("No input for \"# of Kits\"!");
        return false;
    }
    if(getAmountInPack(rowNum) == "") {
        alert("No input for \"Amount in Pack\" entered in row: " + rowNum + "!");
        return false;
    }
    if(getAmountInKit(rowNum) == "") {
        alert("No input for \"Amount in Kit\" entered in row: " + rowNum + "!");
        return false;
    }
    if(getCost(rowNum) == "") {
        alert("No input for \"Item Price\" entered in row: " + rowNum + "!");
        return false;
    }
    return true;
}

/** Function to save all current data to localStorage */
function save() {
    var saveState = {
        name: "",
        numRows: 0,
        itemName: [],
        amountInPack: [],
        amountInKit: [],
        itemPrice: []
    };
    
    saveState.name = prompt("Enter this kit's name:");
    if(saveState.name == null) {
        return;
    }
    
    saveState.numRows = numRows;
    for(let i = 1; i <= numRows; i++) {
        saveState.itemName.push(getItemName(i));
        saveState.amountInPack.push(getAmountInPack(i));
        saveState.amountInKit.push(getAmountInKit(i));
        saveState.itemPrice.push(getItemPrice(i));
    }
    
    if(!localStorage.getItem("kitSaves")) {
        var kitSaves = [
            saveState
        ]
        localStorage.setItem("kitSaves",JSON.stringify(kitSaves));
    } else {
        var kitSaves = JSON.parse(localStorage.getItem("kitSaves"));
        kitSaves.push(saveState);
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
    }
    
    //var saveStateJson = JSON.stringify(saveState);
    //console.log(saveStateJson);
    //saveState.itemName.push("glue");
    //saveState.itemName.push("tape");
    //console.log("hello");
    //console.log(saveState.itemName[0]);
    //console.log(saveState.itemName[1]);
}

/** Function to load a saved kit from localStorage */
function load(kitSaveNum) {
    if(clearAllRows()) {
        var kitSaves = JSON.parse(localStorage.getItem('kitSaves'));
        for(let i = 1; i < kitSaves[kitSaveNum].numRows; i++) {
            addRow();
        }
        for(let i = 1; i <= kitSaves[kitSaveNum].numRows; i++) {
            document.getElementById("r" + i + "itemName").value = kitSaves[kitSaveNum].itemName[i - 1];
            document.getElementById("r" + i + "amountInPack").value = kitSaves[kitSaveNum].amountInPack[i - 1];
            document.getElementById("r" + i + "amountInKit").value = kitSaves[kitSaveNum].amountInKit[i - 1];
            document.getElementById("r" + i + "itemPrice").value = kitSaves[kitSaveNum].itemPrice[i - 1];
        }
    }
}

/** Function to make the load dropdown work properly */
function toggleDropdown() {
    document.getElementById("kit-calc-load-list").innerHTML = "";
    document.getElementById("kit-calc-dropdown-delete-buttons").innerHTML = "";
    var kitSaves = JSON.parse(localStorage.getItem("kitSaves"));
    for(let i = 0; i < kitSaves.length; i++) {
        var x = document.createElement("INPUT");
        x.setAttribute("type", "button");
        x.setAttribute("value", kitSaves[i].name);
        x.onclick = function() {
            load(i);
        };
        x.id = "b" + i;
        x.className = "list-object kit-calc-dropdown-item";
        document.getElementById("kit-calc-load-list").appendChild(x);
        
        var y = document.createElement("INPUT");
        y.setAttribute("type", "button");
        y.setAttribute("value", "X");
        y.onclick = function() {
            deleteDropDownItem(i);
        };
        y.id = "db" + i;
        y.className = "list-object kit-calc-dropdown-delete-button delete-row-button";
        document.getElementById("kit-calc-dropdown-delete-buttons").appendChild(y);
    }
}

/** Function to delete a saved kit */
function deleteDropDownItem(numRow) {
    var result = confirm("Are you sure you want to delete this list?\n!WARNING! This action cannot be undone!");
    if(result) {
        var kitSaves = JSON.parse(localStorage.getItem("kitSaves"));
        kitSaves.splice(numRow, 1);
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
        toggleDropdown();
    }
}

/** Export the output data to a plain text document (Like a check) */
function exportToRawText() {
    var totalCost = 0;
    var kitName = prompt("Enter a name for this list:");
    if(kitName == "") {
        alert("No Name given for file export!");
        return;
    }
    var data = kitName;
    data += "\n-=-=-=-=-=-=-=-=-=-=-=-\nNumber of Kits: " + getNumKits() + "\n-=-=-=-=-=-=-=-=-=-=-=-\n";

    for(let i = 1; i <= numRows; i++) {
        if(!checkForInvalidInput(i)) {
            return;
        }
        data += i + ".| " + getItemName(i);
        for(let j = 0; j < 20 - String(getItemName(i)).length; j++) {
            data += " ";
        }
        data += " | " + getAmountToBuy(i);
        for(let j = 0; j < 6 - String(getAmountToBuy(i)).length; j++) {
            data += " ";
        }
        data += " | $" + getCost(i) + "\n";
        totalCost += getCost(i);
    }
    totalCost = Math.round(totalCost * 100) / 100;
    data += "\n                           TOTAL:   $" + totalCost;
    
    saveFile("kit-calc-download.txt", data);
}

/** Function to export input data to JSON, to save the kit in the form of a file */
function exportToJson() {
    var saveState = {
        name: "",
        numRows: 0,
        itemName: [],
        amountInPack: [],
        amountInKit: [],
        itemPrice: []
    };
    
    saveState.name = prompt("Enter this kit's name:");
    if(saveState.name == null) {
        return;
    }
    
    saveState.numRows = numRows;
    for(let i = 1; i <= numRows; i++) {
        saveState.itemName.push(getItemName(i));
        saveState.amountInPack.push(getAmountInPack(i));
        saveState.amountInKit.push(getAmountInKit(i));
        saveState.itemPrice.push(getItemPrice(i));
    }
    
    saveFile("kit-calc-save-state.json", JSON.stringify(saveState))
}
/*function importJson() {
    var i = window.document.createElement('INPUT');
    i.setAttribute("type", "file");
    i.id = "kit-calc-json-import";
    // Append anchor to body.
    document.body.appendChild(i);
    i.click();
    alert("1");
    
    const fs = require("fs");
    fs.readFile(document.getElementById("kit-calc-json-import").value, "utf8", (err, jsonString) => {
      if (err) {
        alert("File read failed:");
        return;
      }
      alert(jsonString);
    });
    document.body.removeChild(i);
    
    /*var saveState = JSON.parse(document.getElementById("kit-calc-json-import").text());
    alert("1");
    
    if(!localStorage.getItem("kitSaves")) {
        var kitSaves = [
            saveState
        ]
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
    } else {
        var kitSaves = JSON.parse(localStorage.getItem("kitSaves"));
        kitSaves.push(saveState);
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
    }
    alert("yes");
}*/

/** Function to import a JSON kit save file from device */
function importJson() {
  const [file] = document.querySelector('input[type=file]').files;
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    // this will then display a text file
    var saveState = JSON.parse(reader.result);
    var loadId;
    if(!localStorage.getItem("kitSaves")) {
        var kitSaves = [
            saveState
        ]
        loadId = kitSaves.length;
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
    } else {
        var kitSaves = JSON.parse(localStorage.getItem("kitSaves"));
        kitSaves.push(saveState);
        loadId = kitSaves.length - 1;
        localStorage.setItem("kitSaves", JSON.stringify(kitSaves));
    }
    var kitSaves = JSON.parse(localStorage.getItem('kitSaves'));
    for(let i = 1; i < kitSaves[loadId].numRows; i++) {
        addRow();
    }
    for(let i = 1; i <= kitSaves[loadId].numRows; i++) {
        document.getElementById("r" + i + "itemName").value = kitSaves[loadId].itemName[i - 1];
        document.getElementById("r" + i + "amountInPack").value = kitSaves[loadId].amountInPack[i - 1];
        document.getElementById("r" + i + "amountInKit").value = kitSaves[loadId].amountInKit[i - 1];
        document.getElementById("r" + i + "itemPrice").value = kitSaves[loadId].itemPrice[i - 1];
    }
    reader.result = null;
    
  }, false);

  if (file) {
    reader.readAsText(file);
  }
}


function saveFile(fileName, data) {
    var a = window.document.createElement('a');
    a.href = window.URL.createObjectURL(new Blob([data], {type: 'text/csv'}));
    a.download = fileName;
    
    // Append anchor to body.
    document.body.appendChild(a);
    a.click();
    
    // Remove anchor from body
    document.body.removeChild(a);
}

/** Function to toggle Dark Mode on and off */
function toggleDarkMode() {
    //var element = document.getElementById("");
    document.body.classList.toggle("dark-mode");
    if(document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "1");
        document.getElementById("kit-calc-dark-mode-toggle").innerHTML = "Light Mode";
    } else {
        localStorage.setItem("darkMode", "0");
        document.getElementById("kit-calc-dark-mode-toggle").innerHTML = "Dark Mode";
    }
}












//Work Space