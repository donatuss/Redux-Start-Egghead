var deepFreeze = require('deep-freeze');
var expect = require('expect');


const testEquality = (f, immutableCheck, before, after) => {
    if (immutableCheck) {
        deepFreeze(before);
    }

    expect(
        f(before)
    ).toEqual(after)
};

const addByPush = (array) => {
    array.push(0);
    return array;
};

const addBySpreadOperator = (array) => {
    return [...array, 0];
};

const addByConcat = (array) => {
    return array.concat([0]);
};

const removeBySplice = (array) => {
    array.splice(1, 1);
    return array;
};

const removeBySlice = (array) => {
    let index = 1;
    return array.slice(0, index).concat(array.slice(index + 1));
};

const removeBySpreadOperator = (array) => {
    let index = 1;
    return [
        ...array.slice(0, index),
        ...array.slice(index + 1)
    ];
};

let functions = [addByPush, addBySpreadOperator, addByConcat, removeBySplice, removeBySlice, removeBySpreadOperator];

functions.map((f) => {
    console.log("");
    [false, true].map(b => {
        try {
            if (f.name.startsWith("add")) {
                testEquality(f, b, [], [0]);
            } else {
                testEquality(f, b, [0, 10, 20], [0, 20]);
            }
            console.log(`${f.name} equality test ` + (b ? "with" : "without") + " immutable PASSED ... ");
        } catch (e) {
            console.log(`${f.name} equality test ` + (b ? "with" : "without") + " immutable FAILED ... ");
        }
    });
});
