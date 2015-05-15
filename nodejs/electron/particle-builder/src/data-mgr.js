/* 
* @Author: Bill
* @Date:   2015-05-13 10:03:08
* @Last Modified by:   Bill
* @Last Modified time: 2015-05-13 10:14:27
*/

'use strict';

var dataMgr = {
  particleList: null,
  initParticleList: function() {
    var p = this.particleList = [];
    for (var key in res) {
      if (s.strRightBack(key, '_') === 'plist') {
        p.push(key);
      }
    }
  }
};