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
var cnt = 0;
var end = 1;
var start = 0;
var prices = [];

var n = 10;
var option = 2;
const fs = require("fs"),
  file = "./mystock0.bin",
  stats = fs.statSync(file);
(len = stats.size), (buff = Buffer.alloc(len)), (pos = 0), (offset = 0);
console.log("File Size in Bytes: " + len);

fs.open(file, "r", (err, fd) => {
  fs.read(fd, buff, offset, len, pos, (err, bytes, buff) => {
    console.log(buff);
    
    
  });
  for (let pair of buff.entries()) {
    const charCode = pair[1];
    if (cnt >= 3) {
        prices[cnt] = charCode;
    }
    cnt++;
    //console.log(cnt);
  }
});

var val = new Parameters();
t1 = Date.now;
DivideNConquerLinear(start, end);
console.log(val.p, val.s, val.dmax);
console.log(prices)
t2 = Date.now;

function DivideNConquerLinear(s, e) {
  start = s;
  end = e;
  if (end - start == 1) {
    val.dmax = prices[end] - prices[start];
    if (prices[start] > prices[end]) {
      val.amax = prices[start];
      val.maxi = start;
      val.amin = prices[end];
      val.mini = end;
    } else {
      val.amax = prices[end];
      val.maxi = end;
      val.amin = prices[start];
      val.mini = start;
    }
    val.p = start;
    val.s = end;
  } else if (end - start == 2) {
    price1 = prices[end] - prices[start];
    price2 = prices[start + 1] - prices[start];
    price3 = prices[end] - prices[start + 1];
    if (price1 > price2 && price1 > price3) {
      val.dmax = price1;
      val.p = start;
      val.s = end;
    } else if (price2 > price1 && price2 > price3) {
      val.dmax = price2;
      val.p = start;
      val.s = start + 1;
    } else {
      val.dmax = price3;
      val.p = start + 1;
      val.s = end;
    }

    if (prices[start] > prices[start + 1] && prices[start] > prices[end]) {
      val.amax = prices[start];
      val.maxi = start;
    } else if (
      prices[start + 1] > prices[start] &&
      prices[start + 1] > prices[end]
    ) {
      val.amax = prices[start + 1];
      val.maxi = start + 1;
    } else {
      val.amax = prices[end];
      val.maxi = end;
    }

    if (prices[start] < prices[start + 1] && prices[start] < prices[end]) {
      val.amin = prices[start];
      val.mini = start;
    } else if (
      prices[start + 1] < prices[start] &&
      prices[start + 1] < prices[end]
    ) {
      val.amin = prices[start + 1];
      val.mini = start + 1;
    } else {
      val.amin = prices[end];
      val.mini = end;
    }
  } else {
    // if (start < end) {
    //   return false;
    // }
    end2 = (start + end) / 2;
    tmp = DivideNConquerLinear(start, end2);
    tmp2 = DivideNConquerLinear(end2 + 1, end);
    spread = tmp2.amax - tmp.amin;
    if (tmp.dmax > tmp2.dmax && tmp.dmax > spread) {
      val.dmax = tmp.dmax;
      val.p = tmp.p;
      val.s = tmp.s;
    } else if (tmp2.dmax > tmp.dmax && tmp2.dmax > spread) {
      val.dmax = tmp2.dmax;
      val.p = tmp2.p;
      val.s = tmp2.s;
    } else {
      val.dmax = spread;
      val.p = tmp.mini;
      val.s = tmp2.maxi;
    }

    if (tmp.amax > tmp2.amax) {
      val.amax = tmp.amax;
      val.maxi = tmp.maxi;
    } else {
      val.amax = tmp2.amax;
      val.maxi = tmp2.maxi;
    }

    if (tmp.amin < tmp2.amin) {
      val.amin = tmp.amin;
      val.mini = tmp.mini;
    } else {
      val.amin = tmp2.amin;
      val.mini = tmp2.mini;
    }
  }
}
