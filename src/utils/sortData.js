import { func } from "prop-types";

export function sortData(data, sortType) {
    if(data!==null&&data.length>1){
      let assend = true

      // Check if assending
      if(sortType.substring(sortType.length-1)==='D'){
        assend = false;
      }
      sortType  =  sortType.substring(0,sortType.length-1);// Get sort type

      let order = getOrderArray(data,sortType);

      // Reverse the resulting list if the list is decending
      if(!assend){
        order.reverse();
      }

      let help = getArrayOfNums(data.length);
        // Swap the tiles so they are in the given order
      for(const a in order){
        let b = help.indexOf(order[a]);
        swap(data, a, b);

        //Swap the helper array
        swap(help, a, b);
       }


    }

  }

  function getOrderArray(data, sortType){
    let order = getArrayOfNums(data.length);
    let namesOrigonal, namesToSort;
    let num = 0;

    // Get the new order
    switch(sortType){
      case "title":
        //Sort by title
        namesOrigonal = Array.from(data).map(element => element.title+(num++).toString());
        namesToSort = Array.from(namesOrigonal).sort();
        order = namesToSort.map(a => namesOrigonal.indexOf(a));
        break;
      case "release":
        // Sort by author
        namesOrigonal = Array.from(data).map(element =>element.sortDate+(num++).toString());
        namesToSort = Array.from(namesOrigonal).sort();
        order = namesToSort.map(a => namesOrigonal.indexOf(a));
        order.reverse();
        break;
      case "vote":
        //Sort by likes
        namesOrigonal = Array.from(data).map(element => parseFloat(element.rating)+(num++)/1000);
        namesToSort = Array.from(namesOrigonal).sort((a, b) => b-a);
        order = namesToSort.map(a => namesOrigonal.indexOf(a));
        break;
      default:
        namesOrigonal = Array.from(data).map(element => element.popularity+(num++).toString());
        namesToSort = Array.from(namesOrigonal).sort();
        order = namesToSort.map(a => namesOrigonal.indexOf(a));
        break;
    }
    return order;
  }

  function getArrayOfNums(len){
    return Array.from({ length: len }, (_, i) => i);
  }

  function swap(data, a, b) {
    let temp = data[a];
    data[a] = data[b];
    data[b] = temp;
  }
