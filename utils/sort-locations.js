'use strict';

module.exports = (locations, sortBy = 'order') => {
    switch (sortBy) {
        case 'alphabet': {
            locations.sort((l1, l2) => l1.description.localeCompare(l2.description));
            break;
        }
        case 'created_date': {
            locations.sort((l1, l2) => l1.createdAt - l2.createdAt);
            break;
        }
        default: {
            throw new Error('Unknown value for sort mode');
        }
    }
};
