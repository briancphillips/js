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
let val = new Parameters();
let tmp = new Parameters();
let tmp2 = new Parameters();
var cnt = 0;

var start = 1;
var end = 4;
var end2;

var prices = [];
var tmp3 = [];
var ar2;
var n = 10;
var option = 2;
var secret;
var iter = 0;
var sc;



const fs = require("fs");


readFile().then(() => {

    for (i = 0; i < sc.length + 8; i++) {
        if (i > 8 && i % 8 == 0) {
            tmp3[iter] = sc[(i - 8)] + sc[(i - 7)] + sc[(i - 6)] + sc[(i - 5)] + sc[(i - 4)] + sc[(i - 3)] + sc[(i - 2)] + sc[(i - 1)];
            prices[iter] = parseFloat("0x"+tmp3[iter]);
            iter++;
            
        }
        
    }
    
    
    
}).then(() => {
    t1 = Date.now;    
    DivideNConquerLinear(start, end);    
    console.log(val.p, val.s, val.dmax);
    t2 = Date.now;
    //console.log(tmp3);
});





// const fs = require("fs"),
//     file = "./mystock0.bin",
//     stats = fs.statSync(file);
// (len = stats.size), (buff = Buffer.alloc(len)), (pos = 0), (offset = 0);
// console.log("File Size in Bytes: " + len);







// fs.open(file, "r", (err, fd) => {
//     fs.read(fd, buff, offset, len, pos, (err, bytes, buff) => {
//         console.log(buff);


//     });
//     // "Producing Code" (May take some time)

//     for (let pair of buff.entries()) {
//         const charCode = pair[1];
//         if (cnt >= 3) {
//             prices[(cnt - 3)] = charCode;

//         }
//         cnt++;
//         //console.log(cnt);
//         //console.log("inside")

//     }

//     ar2 = prices.concat();
//     console.log(ar2)

// });


async function readFile() {
    const f = './mystock0.bin';
    secret = await fs.promises.readFile(f);
    const stats = fs.statSync(f);
    (len = stats.size), (buff = Buffer.alloc(len)), (pos = 0), (offset = 0);
    console.log("File Size in Bytes: " + len);
    //console.log(secret);
    sc = secret.toString('hex');
    


}


function parseFloat(str) {
    var float = 0, sign, order, mantiss, exp,
        int = 0, multi = 1;
    if (/^0x/.exec(str)) {
        int = parseInt(str, 16);
    } else {
        for (var i = str.length - 1; i >= 0; i -= 1) {
            if (str.charCodeAt(i) > 255) {
                console.log('Wrong string parametr');
                return false;
            }
            int += str.charCodeAt(i) * multi;
            multi *= 256;
        }
    }
    sign = (int >>> 31) ? -1 : 1;
    exp = (int >>> 23 & 0xff) - 127;
    mantissa = ((int & 0x7fffff) + 0x800000).toString(2);
    for (i = 0; i < mantissa.length; i += 1) {
        float += parseInt(mantissa[i]) ? Math.pow(2, exp) : 0;
        exp--;
    }
    return float * sign;
}




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
        console.log("spread = 2")
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
        console.log("spread > 2");
        end2 = (start + end) / 2;
        tmp = setTimeout(() => { DivideNConquerLinear(start, end2); });
        tmp2 = setTimeout(() => { DivideNConquerLinear(end2 + 1, end); });      
         
               
        // try {
            
        //     tmp = DivideNConquerLinear(start, end2);
        //     tmp2 = DivideNConquerLinear(end2 + 1, end);
        // } catch(err) {
        //     //console.log('error');
        // }
                       
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

        console.log("val.p is "+val.p);
        console.log("val.s is "+val.p);
        console.log("val.dmax is "+val.dmax);
        //console.log("price1 is "+price1);
        
    }    
    n++;
    console.log("n is "+n);
    
    return val;

}
