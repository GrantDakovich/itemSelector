import DisplayItemData from './DisplayItemData.js';



/*
Display data is in the form: 
{
	title: "Apples",
	description: "These are apples",
	img: null,
	categories: [{name:"apples"}, {name: "potato"}],
  subcategories: ["Apple"]
}
*/

export default class ItemSearchAPI {
	constructor(path = "./example_data.json") {

    // Load in json data => 
	  var itemData = require("./example_data.json");
  	var dataArray = JSON.parse(JSON.stringify(itemData)).items;
  	this.dataItems = []
  	for (var item of dataArray) {
  		var dataItem = new DisplayItemData(item);
  		if (dataItem) {
  			this.dataItems.push(dataItem)
  		}
  	}
    
  }

	stringMatch(word, sentence) { // Returns a boolean
    word = word.toLowerCase();
		var i = 0;
		while (i <= sentence.length - word.length) {
			if (sentence.substring(i, i + word.length).toLowerCase() === word) {
				return true; 
			}
			i++;
		}
		return false;
	}

	checkWordInDisplayData(word, displayDataItem) { // Returns a boolean

    // Check title and description
		if ((displayDataItem.title !== undefined && displayDataItem.title !== null && this.stringMatch(word, displayDataItem.title)) ||
			(displayDataItem.description !== undefined && displayDataItem.description !== null && this.stringMatch(word, displayDataItem.description))
			){
			return true
		}
    // Check categories
		if (displayDataItem.categories !== undefined && displayDataItem.categories !== null) { 
			for (var category of displayDataItem.categories) {
				if (category.name !== undefined && category.name !== null && this.stringMatch(word, category.name)) {
					return true
				}
        // Check subcategories
        var subcategory = category.subcategory;
        if (subcategory.name !== undefined && subcategory.name !== null && this.stringMatch(word, subcategory.name)) {
          return true
        }
			}
		}
		return false

	}

	searchWithWord(word) { // returns display data array

		var ret = [];
		for (var produceObject of this.dataItems) {
			if (this.checkWordInDisplayData(word, produceObject)) {
				ret.push(produceObject);
			}
		}
		return ret
	}


  tests() {
    var tests = []

    tests.push(this.stringMatch("hi", "hi")); 
    tests.push(this.stringMatch("h", "hi"));
    tests.push(!this.stringMatch("hi", "h")); 
    tests.push(this.stringMatch("apple", "these are some apples."));
    tests.push(!this.stringMatch("apples", "this is an apple"));
    tests.push(this.stringMatch("APPLES", "these are some apples."));
    tests.push(this.stringMatch("apples", "THESE ARE SOME APPLES."));

    var item = new DisplayItemData(
      {
          id: 3,
          categories: [
              {
                  "id": 3,
                  "name": "Vegetable",
                  "subcategory": {
                      "id": 2,
                      "name": "Root"
                  }
              }
          ],
          title: "Red Radishes"
      }
    )

    tests.push(this.checkWordInDisplayData("radish", item));
    tests.push(!this.checkWordInDisplayData("blue", item));
    tests.push(this.checkWordInDisplayData("vegetable", item));


    tests.push(this.searchWithWord("apple").length !== 0)


    for (var i = 0; i < tests.length; i++) {
      var test = tests[i];
      var res = "Failed";
      if (test) {
        res = "Passed";
      }
      console.log(`Test ${i + 1}: ${res}`);
    }


    
  }
 
}













