//Functions
//-----------------------------------------------

// Reduce function to sum price
function sumPrice(previousValue, currentValue, index, array){
	return currentValue.price + previousValue;
}

// Filter function to check between price ranges
function priceRange(array){
	return (array.price > 14.00 && array.price < 18.00)
}

// Function that creates an array consisting of only a particular parameter
function paramArray(array, parameter){
	newArray=[];
	array.forEach(function(element){
		var temp = Object.create(null);
		if (!Array.isArray(parameter)){
			temp[parameter] = element[parameter]
		} else {
			parameter.forEach(function(parElement){
				temp[parElement] = element[parElement];
			})
		}
		newArray.push(temp);
	});
	return newArray;
}

// Function that adds parameters to an existing custom array from the original array
function addParam(cusArray, orgArray, parameter){
	var newArray = cusArray.map(function(element, index, array){
		var newObj= Object.assign({}, cusArray[index]);
		newObj[parameter] = orgArray[index][parameter];
		return newObj;
		// newArray[index][parameter] = orgArray[index][parameter];
	})
	return newArray;
}

// Function that filters Arrays which contain a parameter that matches a value when the values of the parameter are also an array
function filterArrayValue(array, parameter, value){
	var newArray = array.filter(function(element){
		if (!Array.isArray(element[parameter])){
			return (element[parameter]===value);
		} else {
			var bool = false;
			element[parameter].forEach(function(paramElement){
				if (paramElement === value){bool=true}
			})
		}
		return bool;
	})
	return newArray;
}

// Function that filters array based on length of a parameter
function filterArrayLength(array, parameter, testLength){
	var newArray = array.filter(function(element){
		return (element[parameter].length >= testLength);
	})
	return newArray;
}

//Function that reads an array, and prints Param1 + some text + Param2 to a parent element
function writeHTML (array, param1, text, param2, parent){
	if (!Array.isArray(array)){
		if (param1 === null && param2 === null){
			var tempP = text;
		} else if (param1 === null){
			var tempP = text + array[param2];
		} else if (param2 === null){
			var tempP = array[param1] + text;
		} else if (Array.isArray(array[param2])){
			var tempP = array[param1] + text + array[param2].length + " " + param2 + ":";
		} else {
			var tempP = array[param1] + text + array[param2];
		}
		var paragraph = document.createElement("p");
		paragraph.innerHTML = tempP
		parent.appendChild(paragraph);
		if (param2 !== null){
			if (Array.isArray(array[param2])){
				writeArray(array[param2], parent);
			}
		}
	} else {
		array.forEach(function(element){
			if (param1 === null && param2 === null){
				var tempP = text;
			} else if (param1 === null){
				var tempP = text + element[param2];
			} else if (param2 === null){
				var tempP = element[param1] + text;
			} else if (Array.isArray(element[param2])){
				var tempP = element[param1] + text + element[param2].length + " " + param2 + ":";
			} else {
				var tempP = element[param1] + text + element[param2];
			}
			var paragraph = document.createElement("p");
			var pBreak = document.createElement("br");
			paragraph.innerHTML = tempP;
			parent.appendChild(paragraph);
			if (param2 !== null){
				if (Array.isArray(element[param2])){
					writeArray(element[param2], parent);
				}
			}
			parent.appendChild(pBreak);
		})
	}
}

function writeArray (paramArray, parent){
	paramArray.forEach(function(element){
		var paragraph = document.createElement("p");
		paragraph.innerHTML = element;
		parent.appendChild(paragraph);
	})
}

// HTML ID lookup
//-----------------------------------------

P1 = document.getElementById("answer1");
P2 = document.getElementById("answer2");
P3 = document.getElementById("answer3");
P4 = document.getElementById("answer4");
P5 = document.getElementById("answer5");
P6 = document.getElementById("answer6");


//Calculations
//------------------------------------------

// Problem 1
priceSum = items.reduce(sumPrice, 0);
priceAvg = Math.round(priceSum/items.length*100)/100;

// Problem 2
rangeItems = items.filter(priceRange);
rangeTitles = paramArray(rangeItems, "title");

// Problem 3
var curArray = filterArrayValue(items, "currency_code", "GBP");

// Problem 4
var matArray = filterArrayValue(items, "materials", "wood");

// Problem 5
var lengthArray = filterArrayLength(items, "materials", 8);

// Problem 6
var sameMade = filterArrayValue(items, "who_made", "i_did");



//Write to HTML
//--------------------------------------------

writeHTML(null, null, "The average price is $" + priceAvg, null, P1);
writeHTML(rangeItems, "title", "", null, P2);
writeHTML(curArray, "title", " costs $", "price", P3);
writeHTML(matArray, "title", " is made of wood", null, P4);
writeHTML(lengthArray, "title", " has ", "materials", P5);
writeHTML(null, null, sameMade.length + " were made by their sellers", null, P6);







// ADDITIONAL FUNCTIONS for debugging
// ---------------------

// Function that prints out a list of parameters to the console
function printOut(array, parameter){
	array.forEach(function(element){
		if (!Array.isArray(parameter)){
			console.log(element[parameter])
		} else {
			parameter.forEach(function(parElement){
				console.log(element[parElement]);
			})
		}
	});
}

function objToArray(obj){
	var newArray =[];
	for (i = 0; i<Object.keys(obj).length; i++){
		newArray[i] = obj[Object.keys(obj)[i]];

	}
	return newArray;
}
