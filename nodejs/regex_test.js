var str = "Mozilla/5.0 (Linux; Android 4.3; Nexus 7 Build/JSS15Q) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.72 Safari/537.36"

var st='<img alt="werwer" src="werwer.jpg"  title="">'
var r = st.match(/src=\"([^\"]*)\"/);
console.log(r);

console.log(r[1]);

var r2 = str.match(/Android ([^;]*)/);
if (r2) {
    console.log(r2);
    console.log(r2[1].split('.')[0]);
} else {
    console.log("not match");
}
