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

//Function that filters Arrays which contain a parameter that matches a value when the values of the parameter are also an array

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

function filterArrayLength(array, parameter, testLength){
	var newArray = array.filter(function(element){
		return (element[parameter].length >= testLength);
	})
	return newArray;
}






// Problem 1
priceSum = items.reduce(sumPrice, 0);
priceAvg = priceSum/items.length;
console.log("Avg Price is " + priceAvg);

// Problem 2
rangeItems = items.filter(priceRange);
console.log("Items with prices between 14 and 18 are ");
printOut(rangeItems, "title");

// Problem 3
console.log("Items with currency code 'GBP' are ");
var curArray = filterArrayValue(items, "currency_code", "GBP");
printOut(curArray, ["title", "price"]);

// Problem 4
var matArray = filterArrayValue(items, "materials", "wood");
console.log("The wood array is ");
printOut(matArray, ["title", "price", "materials"]);

// Problem 5
lengthArray = filterArrayLength(items, "materials", 8);
console.log("Items with 8 or more materials ");
printOut(lengthArray, "title");

// Problem 6
var sameMade = filterArrayValue(items, "who_made", "i_did");
console.log(sameMade.length);
