var str = "Mozilla/5.0 (Linux; Android   4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36";

// var str = "'lenovo-lenovo-a288t/1.0 linux/2.6.35.7 android/2.3.5 release/08.01.2012 browser/applewebkit533.1 (khtml, like gecko) mozilla/5.0 mobile'";

var st='<img alt="werwer" src="werwer.jpg"  title="">'
// var r = st.match(/src=\"([^\"]*)\"/);
// console.log(r);

// console.log(r[1]);

// var r2 = str.match(/Android([^\.]*)/i);
// if (r2) {
//     console.log(r2);
//     var rst = r2[1];
//     console.log(rst);
//     rst = rst.replace(/^\s*/, "").replace(/^\//, "");
//     console.log(rst);
//     // console.log(parseInt(r2[1].split('.')[0]));
// } else {
//     console.log("not match");
// }


var m = str.match(/Android([^\.]*)/i);
var majorVer = m[1];
majorVer = parseInt(majorVer.replace(/^\s*/, "").replace(/^\//, ""));
console.log(majorVer);
if (majorVer <= 2) {
    console.log("is match");
} else {
    console.log("not match");
}