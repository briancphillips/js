var n;
var option = 2;
var prices = [];
const fs = require("fs"),
    file = "./mystock0.bin",
    stats = fs.statSync(file);
(len = stats.size), (buff = Buffer.alloc(len)), (pos = 0), (offset = 0);
fs.open(file, "r", (err, fd) => {
    fs.read(fd, buff, offset, len, pos, (err, bytes, buff) => {
        console.log(buff);
    });
});
console.log(binarySearch(buff, 0));

function binarySearch(sortedArray, key) {
    let start = 0;
    let end = sortedArray.length - 1;

    while (start <= end) {
        let middle = Math.floor((start + end) / 2);

        if (sortedArray[middle] === key) {
            // found the key
            return middle;
        } else if (sortedArray[middle] < key) {
            // continue searching to the right
            start = middle + 1;
        } else {
            // search searching to the left
            end = middle - 1;
        }
    }
    // key wasn't found
    return -1;
}
