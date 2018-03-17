'use strict';

exports.chunkArrayInGroups = (sourceArr, size) => {
    let arrCopy = JSON.parse(JSON.stringify(sourceArr));
    let newArr = [];

    for (let i = 0; arrCopy.length > size; i++) {
        newArr.push(arrCopy.splice(0, size));
    }
    newArr.push(arrCopy.slice(0));

    return newArr;
};

exports.descendingSort = (firstValue, secondValue) => {
    return firstValue < secondValue;
};
