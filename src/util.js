function randomID(length=16) {
    const rnd = () => Math.random().toString(36).substr(2);
    let id = "";
    while (id.length < length)
        id += rnd();
    return id.substr(0, length);
}

console.log(randomID())
console.log(randomID())
console.log(randomID())