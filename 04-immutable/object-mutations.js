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

const toggleTodoDirect = (todo) => {
    todo.completed = !todo.completed;
    return todo;
};

const toggleTodoByGenNew = (todo) => {
    return {
        id: todo.id,
        text: todo.text,
        completed: !todo.completed
    };
};

const toggleTodoByGenNewSpread = (todo) => {
    return {
        ...todo,
        completed: !todo.completed
    }
};

const toggleTodoByGenNewAssign = (todo) => {
    return Object.assign({}, todo, {
        completed: !todo.completed
    });
};

let functions = [toggleTodoDirect, toggleTodoByGenNew, toggleTodoByGenNewAssign, toggleTodoByGenNewSpread];

functions.map((f) => {
    console.log("");
    [false, true].map(b => {
        try {

            const todoBefore = {
                id: 0,
                text: "Earn 10USD",
                completed: false
            };

            const todoAfter = {
                id: 0,
                text: "Earn 10USD",
                completed: true
            };

            testEquality(f, b, todoBefore, todoAfter);

            console.log(`${f.name} equality test ` + (b ? "with" : "without") + " immutable PASSED ... ");
        } catch (e) {
            console.log(`${f.name} equality test ` + (b ? "with" : "without") + " immutable FAILED ... ");
        }
    });
});
