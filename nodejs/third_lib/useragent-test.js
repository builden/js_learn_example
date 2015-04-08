/* 
* @Author: Bill
* @Date:   2015-03-31 17:32:27
* @Last Modified by:   Bill
* @Last Modified time: 2015-03-31 17:48:35
*/

'use strict';

var useragent = require('useragent');


var iphone5 = 'Mozilla/5.0 (iPhone; CPU iPhone OS 7_0 like Mac OS X; en-us) AppleWebKit/537.51.1 (KHTML, like Gecko) Version/7.0 Mobile/11A465 Safari/9537.53';

var agent = useragent.parse(iphone5);
console.log(agent.family);  // browser
console.log(agent.os.toJSON()); // os
console.log(agent.device.toJSON()); // device

var agentNull = useragent.parse(null);
console.log(agentNull.family);  // browser
console.log(agentNull.os.toJSON()); // os
console.log(agentNull.device.toJSON()); // device