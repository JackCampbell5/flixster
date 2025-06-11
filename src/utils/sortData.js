/**
 * Sorts the data based on the sort type. Changes the original data
 * @param {Array} data  -  Data to sort
 * @param {String} sortType - The type of sort to do. Starts with the type of sort and ends with D if it is decending and A if it is assending
 */
export function sortData(data, sortType) {
  // If data exists you can sort it
  if(data!==null&&data.length>1){
    console.log("Sorting data");
      let assend = true

      // Check if assending
      if(sortType.substring(sortType.length-1)==='D'){
        assend = false;
      }

      // Get the sort type
      sortType  =  sortType.substring(0,sortType.length-1);// Get sort type

      // Get the order from the data
      let order = getOrderArray(data,sortType);

      // Reverse the resulting list if the list is decending
      if(!assend){
        order.reverse();
      }

      // Swap the tiles so they are in the given order
      let help = getArrayOfNums(data.length);
      for(const a in order){
        let b = help.indexOf(order[a]);
        swap(data, a, b);

        //Swap the helper array
        swap(help, a, b);
       }

    }// End if data exists
  }// End sortData


/**
 * Parses the sort type and returns the order of the data for the given sort type
 * @param {Array} data
 * @param {String} sortType
 * @returns The order of the data for the given sort type
 */
function getOrderArray(data, sortType){
  let order = getArrayOfNums(data.length);

  // Get the new order
  switch(sortType){
    case "title":
      //Sort by title
      order = sortArray(data, "title");
      break;
    case "release":
      // Sort by release date
      order = sortArray(data,"sortDate");
      order.reverse();
      break;
    case "vote":
      //Sort by likes
      order = sortArray(data,"rating",true);
      break;
    default:
      order = sortArray(data,"popularity");
      break;
  }// End switch
  return order;
}// End getOrderArray


/**
 * Sorts the array of data by the given parameter and returns a array of the new order
 * @param {Array} data - The data to sort
 * @param {*} paramName - The name of the parameter to sort by
 * @param {*} numType - True if the parameter is a number, false if it is a string
 * @returns Array of the new order
 */
function sortArray(data, paramName,numType=false) {
  let namesOrigonal, namesToSort;
  let num = 0;

  if(numType){
    namesOrigonal = Array.from(data).map(element => parseFloat(element[paramName])+(num++)/1000);
    namesToSort = Array.from(namesOrigonal).sort((a, b) => b-a);
  }else{
    namesOrigonal = Array.from(data).map(element => element[paramName]+(num++).toString());
    namesToSort = Array.from(namesOrigonal).sort();
  }
  return namesToSort.map(a => namesOrigonal.indexOf(a));
}


/**
 * Creates an array of numbers from 0 to len
 * @param {number} len
 * @returns the array created
 */
function getArrayOfNums(len){
  return Array.from({ length: len }, (_, i) => i);
}


/**
 * Swaps the two elements at positions a and b in the array
 * @param {Array} data
 * @param {number} a
 * @param {number} b
 */
function swap(data, a, b) {
  let temp = data[a];
  data[a] = data[b];
  data[b] = temp;
}
