const uniqueObjects = (array, property) => array.reduce((result, currentValue) => {
    return  result.contains(currentValue[property] ?  result:
   result.add(currentValue);
}, new Set());
