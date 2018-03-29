'use strict';

function getCompareFn(sorting) {
    switch (sorting) {
        case 'creationDate':
            return keyCompare(place => place.creationDate);

        case 'alphabet':
            return (placeA, placeB) => placeA.description.localeCompare(placeB.description);

        default:
            return;
    }
}

function keyCompare(keySelector) {
    // eslint-disable-next-line no-nested-ternary
    return (a, b) => keySelector(a) < keySelector(b) ? -1
        : (keySelector(a) > keySelector(b) ? 1 : 0);
}

module.exports = { getCompareFn, keyCompare };
