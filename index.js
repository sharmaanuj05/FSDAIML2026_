console.log("Hello, Using Node.js!");
const a = 89;
var b = 90;
let c = 91;
console.log("const a : ", a);
console.log("var b : ", b);
console.log("let c : ", c);
let y = 10;
if (y > 5) 
{   
    let y = 20;
    console.log("Inside if block, y : ", y);
}
console.log("Outside if block, y : ", y);
//arrow function
const msg=(mymsg)=>{
    console.log("Hi, " + mymsg)
    }
msg("Hello, Using Node.js!");
const mysqrt = (x) => {
    return Math.sqrt(x);
}
console.log("Square root of 25 is : ", mysqrt(25));