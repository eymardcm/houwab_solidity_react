'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _web = require('./web3');

var _web2 = _interopRequireDefault(_web);

var _Campaign = require('./build/Campaign.json');

var _Campaign2 = _interopRequireDefault(_Campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var abi_campaign = _Campaign2.default.abi;

exports.default = function (address) {
  return new _web2.default.eth.Contract(abi_campaign, address);
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImV0aGVyZXVtL2NhbXBhaWduLmpzIl0sIm5hbWVzIjpbIndlYjMiLCJjYW1wYWlnbkNvbnRyYWN0IiwiYWJpX2NhbXBhaWduIiwiYWJpIiwiZXRoIiwiQ29udHJhY3QiLCJhZGRyZXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxBQUFPLEFBQVAsQUFBaUIsQUFBakI7Ozs7QUFDQSxBQUFPLEFBQVAsQUFBNkIsQUFBN0I7Ozs7OztBQUNBLElBQU0sZUFBZSxtQkFBaUIsQUFBdEMsQUFFQTs7a0JBQWUsbUJBQVcsQUFDeEI7U0FBUSxJQUFJLGNBQUssQUFBTCxJQUFTLEFBQWIsU0FDTixBQURNLGNBRU4sQUFGTSxBQUFSLEFBSUQ7QUFMRCIsImZpbGUiOiJjYW1wYWlnbi5qcyIsInNvdXJjZVJvb3QiOiIvVXNlcnMvZXltYXJkY20vRG9jdW1lbnRzL0Rldi9ibG9ja2NoYWluL2V0aGVyZXVtX2FuZF9zb2xpZGl0eV9jb3Vyc2Uva2lja3N0YXJ0In0=