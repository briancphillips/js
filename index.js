class Parameters {
  constructor() {
    this.dmax = 0.0;
    this.amax = 0.0;
    this.amin = 0.0;
    this.p = 0;
    this.s = 0;
    this.maxi = 0;
    this.mini = 0;
  }
}
var n = 10;
var option = 2;
var prices = [];
const fs = require("fs"),
  file = "./mystock0.bin",
  stats = fs.statSync(file);
(len = stats.size), (buff = Buffer.alloc(len)), (pos = 0), (offset = 0);
console.log("File Size in Bytes: " + len);
fs.open(file, "r", (err, fd) => {
  fs.read(fd, buff, offset, len, pos, (err, bytes, buff) => {
    console.log(buff[0]);
  });
});
fStream1 = Date.now;

fStream2 = DivideNConquerLinear(0, n - 1);
console.log(fStream2.p, fStream2.s, fStream2.dmax);
fLength = Date.now;
var fStream = new Parameters();

// const fs = require('fs');

// const readStream = fs.createReadStream('./mystock0.bin', {highWaterMark: 16});
// const data = [];

// readStream.on('data', (chunk) => {
//     data.push(chunk);
//     console.log('data :', chunk, chunk.length);
//     // data : <Buffer 49 20 61 6d 20 74 72 61 6e 73 66 65 72 72 69 6e> 16
//     // data : <Buffer 67 20 69 6e 20 62 79 74 65 73 20 62 79 20 62 79> 16
//     // data : <Buffer 74 65 73 20 63 61 6c 6c 65 64 20 63 68 75 6e 6b> 16
// });

// readStream.on('end', () => {
//     console.log(data[0]);
//     // end : I am transferring in bytes by bytes called chunk
// })

// readStream.on('error', (err) => {
//     console.log('error :', err)
// })
function DivideNConquerLinear(key, aaaa) {
  if (aaaa - key == 1) {
    fStream.dmax = prices[aaaa] - prices[key];
    if (prices[key] > prices[aaaa]) {
      fStream.amax = prices[key];
      fStream.maxi = key;
      fStream.amin = prices[aaaa];
      fStream.mini = aaaa;
    } else {
      fStream.amax = prices[aaaa];
      fStream.maxi = aaaa;
      fStream.amin = prices[key];
      fStream.mini = key;
    }

    fStream.p = key;
    fStream.s = aaaa;
  } else if (aaaa - key == 2) {
    nuller = prices[aaaa] - prices[key];
    fLength = prices[key + 1] - prices[key];
    tmp3 = prices[aaaa] - prices[key + 1];
    if (nuller > fLength && nuller > tmp3) {
      fStream.dmax = nuller;
      fStream.p = key;
      fStream.s = aaaa;
    } else if (fLength > nuller && fLength > tmp3) {
      fStream.dmax = fLength;
      fStream.p = key;
      fStream.s = key + 1;
    } else {
      fStream.dmax = tmp3;
      fStream.p = key + 1;
      fStream.s = aaaa;
    }

    if (prices[key] > prices[key + 1] && prices[key] > prices[aaaa]) {
      fStream.amax = prices[key];
      fStream.maxi = key;
    } else if (
      prices[key + 1] > prices[key] &&
      prices[key + 1] > prices[aaaa]
    ) {
      fStream.amax = prices[key + 1];
      fStream.maxi = key + 1;
    } else {
      fStream.amax = prices[aaaa];
      fStream.maxi = aaaa;
    }

    if (prices[key] < prices[key + 1] && prices[key] < prices[aaaa]) {
      fStream.amin = prices[key];
      fStream.mini = key;
    } else if (
      prices[key + 1] < prices[key] &&
      prices[key + 1] < prices[aaaa]
    ) {
      fStream.amin = prices[key + 1];
      fStream.mini = key + 1;
    } else {
      fStream.amin = prices[aaaa];
      fStream.mini = aaaa;
    }
  } else {
    buffer = (key + aaaa) / 2;

    tmp = DivideNConquerLinear(key, buffer);
    tmp2 = DivideNConquerLinear(buffer + 1, aaaa);
    byteSize = tmp2.amax - tmp.amin;
    if (tmp.dmax > tmp2.dmax && tmp.dmax > byteSize) {
      fStream.dmax = tmp.dmax;
      fStream.p = tmp.p;
      fStream.s = tmp.s;
    } else if (tmp2.dmax > tmp.dmax && tmp2.dmax > byteSize) {
      fStream.dmax = tmp2.dmax;
      fStream.p = tmp2.p;
      fStream.s = tmp2.s;
    } else {
      fStream.dmax = byteSize;
      fStream.p = tmp.mini;
      fStream.s = tmp2.maxi;
    }

    if (tmp.amax > tmp2.amax) {
      fStream.amax = tmp.amax;
      fStream.maxi = tmp.maxi;
    } else {
      fStream.amax = tmp2.amax;
      fStream.maxi = tmp2.maxi;
    }

    if (tmp.amin < tmp2.amin) {
      fStream.amin = tmp.amin;
      fStream.mini = tmp.mini;
    } else {
      fStream.amin = tmp2.amin;
      fStream.mini = tmp2.mini;
    }
  }
}
