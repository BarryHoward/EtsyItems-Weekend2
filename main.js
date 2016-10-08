// Function that prints out all of a single parameter to the console

function printOut(array, parameter){
	array.forEach(function(element){
		console.log(element[parameter]);
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
		newArray.push(element[parameter]);
	});
	return newArray;
}

// Function that initializes a custom array and populates it with a parameter from another other array
function initParam(array, parameter){
	var newArray=[];
	array.forEach(function(element){
		newArray.push({[parameter]: element[parameter]})
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

//Filter function that determines which elements of a certain parameter match a certain value

// function filterArrayValue(array, parameter, value){
// 	var newArray = array.filter(function(element) {return(element[parameter] === value)});
// 	return newArray;
// }

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
			// for (var i=0; i<element[parameter].length; i++){
			// 	if (element[parameter][i] === value){
			// 		return true;
			// 	}
			// }
		// return false;
		}
		return bool;
	})
	return newArray;
}







// Problem 1
priceSum = items.reduce(sumPrice, 0);
priceAvg = priceSum/items.length;
console.log("Avg Price is " + priceAvg);

// Problem 2
rangeItems = items.filter(priceRange);
rangeItemsTitles = paramArray(rangeItems, "title")
console.log("Items in with prices between 14 and 18 are ");
console.log(rangeItemsTitles);

// Problem 3

console.log("Items with currency code 'GBP' are ")
var curObject = filterArrayValue(items, "currency_code", "GBP");
console.log(curObject);

// Problem 4
var matArray = filterArrayValue(items, "materials", "wood");

console.log("The wood array is ");
console.log(paramArray(matArray, "title"));

// Problem 5



