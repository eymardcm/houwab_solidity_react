'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/eymardcm/Documents/Dev/blockchain/ethereum_and_solidity_course/kickstart/components/RequestRow.js';


var RequestRow = function (_Component) {
  (0, _inherits3.default)(RequestRow, _Component);

  function RequestRow() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, RequestRow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = RequestRow.__proto__ || (0, _getPrototypeOf2.default)(RequestRow)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      approving: false,
      finalizing: false
    }, _this.onApprove = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var ethereum, accounts, campaign;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.setState({ approving: true });
              _context.prev = 1;
              ethereum = window.ethereum;
              _context.next = 5;
              return ethereum.enable();

            case 5:
              _context.next = 7;
              return _web2.default.eth.getAccounts();

            case 7:
              accounts = _context.sent;
              campaign = (0, _campaign2.default)(_this.props.address);
              _context.next = 11;
              return campaign.methods.approveRequest(_this.props.id).send({ from: accounts[0] });

            case 11:
              _context.next = 15;
              break;

            case 13:
              _context.prev = 13;
              _context.t0 = _context['catch'](1);

            case 15:

              _this.setState({ approving: false });

            case 16:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this2, [[1, 13]]);
    })), _this.onFinalize = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var ethereum, accounts, campaign;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _this.setState({ finalizing: true });
              _context2.prev = 1;
              ethereum = window.ethereum;
              _context2.next = 5;
              return ethereum.enable();

            case 5:
              _context2.next = 7;
              return _web2.default.eth.getAccounts();

            case 7:
              accounts = _context2.sent;
              campaign = (0, _campaign2.default)(_this.props.address);
              _context2.next = 11;
              return campaign.methods.finalizeRequest(_this.props.id).send({ from: accounts[0] });

            case 11:
              _context2.next = 15;
              break;

            case 13:
              _context2.prev = 13;
              _context2.t0 = _context2['catch'](1);

            case 15:

              _this.setState({ finalizing: false });

            case 16:
            case 'end':
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[1, 13]]);
    })), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(RequestRow, [{
    key: 'render',
    value: function render() {
      var Row = _semanticUiReact.Table.Row,
          Cell = _semanticUiReact.Table.Cell;
      var _props = this.props,
          id = _props.id,
          request = _props.request,
          approversCount = _props.approversCount;

      var readyToFinalize = request.voteCount >= request.consensusTarget;

      return _react2.default.createElement(Row, { disabled: request.complete, positive: readyToFinalize && !request.complete, __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      }, _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 54
        }
      }, id), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 55
        }
      }, request.description), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 56
        }
      }, _web2.default.utils.fromWei(request.value, 'ether'), ' Ether'), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 57
        }
      }, request.recipient), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 58
        }
      }, 'Recvd: ', request.voteCount, '/Req: ', request.consensusTarget, '/Total:', ' ', approversCount), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 62
        }
      }, request.isApproved ? null : _react2.default.createElement(_semanticUiReact.Button, {
        loading: this.state.approving,
        color: 'green',
        basic: true,
        onClick: this.onApprove,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 64
        }
      }, 'Approve')), _react2.default.createElement(Cell, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, request.complete ? null : _react2.default.createElement(_semanticUiReact.Button, {
        loading: this.state.finalizing,
        color: 'purple',
        basic: true,
        onClick: this.onFinalize,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, 'Finalize')));
    }
  }]);

  return RequestRow;
}(_react.Component);

exports.default = RequestRow;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvUmVxdWVzdFJvdy5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsIlRhYmxlIiwiQnV0dG9uIiwid2ViMyIsIkNhbXBhaWduIiwiUmVxdWVzdFJvdyIsInN0YXRlIiwiYXBwcm92aW5nIiwiZmluYWxpemluZyIsIm9uQXBwcm92ZSIsInNldFN0YXRlIiwiZXRoZXJldW0iLCJ3aW5kb3ciLCJlbmFibGUiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwiY2FtcGFpZ24iLCJwcm9wcyIsImFkZHJlc3MiLCJtZXRob2RzIiwiYXBwcm92ZVJlcXVlc3QiLCJpZCIsInNlbmQiLCJmcm9tIiwib25GaW5hbGl6ZSIsImZpbmFsaXplUmVxdWVzdCIsIlJvdyIsIkNlbGwiLCJyZXF1ZXN0IiwiYXBwcm92ZXJzQ291bnQiLCJyZWFkeVRvRmluYWxpemUiLCJ2b3RlQ291bnQiLCJjb25zZW5zdXNUYXJnZXQiLCJjb21wbGV0ZSIsImRlc2NyaXB0aW9uIiwidXRpbHMiLCJmcm9tV2VpIiwidmFsdWUiLCJyZWNpcGllbnQiLCJpc0FwcHJvdmVkIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUEsQUFBTyxBQUFTOzs7O0FBQ2hCLEFBQVMsQUFBTzs7QUFDaEIsQUFBTyxBQUFVOzs7O0FBQ2pCLEFBQU8sQUFBYzs7Ozs7Ozs7O0lBRWYsQTs7Ozs7Ozs7Ozs7Ozs7O29OLEFBQ0o7aUJBQVEsQUFDSyxBQUNYO2tCLEFBRk0sQUFFTTtBQUZOLEFBQ04sYSxBQUlGLHFGQUFZLG1CQUFBOzhCQUFBO29FQUFBO2tCQUFBOzJDQUFBO2lCQUNWO29CQUFBLEFBQUssU0FBUyxFQUFFLFdBRE4sQUFDVixBQUFjLEFBQWE7OEJBRW5CO0FBSEUseUJBR1MsT0FIVCxBQUdnQjs4QkFIaEI7cUJBSUYsU0FKRSxBQUlGLEFBQVM7O2lCQUpQOzhCQUFBO3FCQUtlLGNBQUEsQUFBSyxJQUxwQixBQUtlLEFBQVM7O2lCQUExQjtBQUxFLGtDQU9GO0FBUEUseUJBT1Msd0JBQVMsTUFBQSxBQUFLLE1BUHZCLEFBT1MsQUFBb0I7OEJBUDdCO3FCQVFGLFNBQUEsQUFBUyxRQUFULEFBQ0gsZUFBZSxNQUFBLEFBQUssTUFEakIsQUFDdUIsSUFEdkIsQUFFSCxLQUFLLEVBQUUsTUFBTSxTQVZSLEFBUUYsQUFFRSxBQUFRLEFBQVM7O2lCQVZqQjs4QkFBQTtBQUFBOztpQkFBQTs4QkFBQTs4Q0FBQTs7aUJBaUJWOztvQkFBQSxBQUFLLFNBQVMsRUFBRSxXQWpCTixBQWlCVixBQUFjLEFBQWE7O2lCQWpCakI7aUJBQUE7OEJBQUE7O0FBQUE7K0JBQUE7QSxlLEFBb0JaLHNGQUFhLG9CQUFBOzhCQUFBO3NFQUFBO2tCQUFBOzZDQUFBO2lCQUNYO29CQUFBLEFBQUssU0FBUyxFQUFFLFlBREwsQUFDWCxBQUFjLEFBQWM7K0JBRXBCO0FBSEcseUJBR1EsT0FIUixBQUdlOytCQUhmO3FCQUlILFNBSkcsQUFJSCxBQUFTOztpQkFKTjsrQkFBQTtxQkFLYyxjQUFBLEFBQUssSUFMbkIsQUFLYyxBQUFTOztpQkFBMUI7QUFMRyxtQ0FNSDtBQU5HLHlCQU1RLHdCQUFTLE1BQUEsQUFBSyxNQU50QixBQU1RLEFBQW9COytCQU41QjtxQkFPSCxTQUFBLEFBQVMsUUFBVCxBQUNILGdCQUFnQixNQUFBLEFBQUssTUFEbEIsQUFDd0IsSUFEeEIsQUFFSCxLQUFLLEVBQUUsTUFBTSxTQVRQLEFBT0gsQUFFRSxBQUFRLEFBQVM7O2lCQVRoQjsrQkFBQTtBQUFBOztpQkFBQTsrQkFBQTtnREFBQTs7aUJBWVg7O29CQUFBLEFBQUssU0FBUyxFQUFFLFlBWkwsQUFZWCxBQUFjLEFBQWM7O2lCQVpqQjtpQkFBQTsrQkFBQTs7QUFBQTtnQ0FBQTtBOzs7Ozs2QkFlSjtVQUFBLEFBQ0MsTUFERCxBQUNlLHVCQURmLEFBQ0M7VUFERCxBQUNNLE9BRE4sQUFDZSx1QkFEZixBQUNNO21CQUMyQixLQUZqQyxBQUVzQztVQUZ0QyxBQUVDLFlBRkQsQUFFQztVQUZELEFBRUssaUJBRkwsQUFFSztVQUZMLEFBRWMsd0JBRmQsQUFFYyxBQUNyQjs7VUFBTSxrQkFBa0IsUUFBQSxBQUFRLGFBQWEsUUFBN0MsQUFBcUQsQUFFckQ7OzZCQUNHLGNBQUQsT0FBSyxVQUFVLFFBQWYsQUFBdUIsVUFBVSxVQUFVLG1CQUFtQixDQUFDLFFBQS9ELEFBQXVFO29CQUF2RTtzQkFBQSxBQUNFO0FBREY7T0FBQSxrQkFDRyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxTQURGLEFBQ0UsQUFDQSxxQkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSxpQkFGRixBQUVFLEFBQWUsQUFDZiw4QkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUFPO0FBQVA7QUFBQSx1QkFBTyxBQUFLLE1BQUwsQUFBVyxRQUFRLFFBQW5CLEFBQTJCLE9BQWxDLEFBQU8sQUFBa0MsVUFIM0MsQUFHRSxBQUNBLDJCQUFDLGNBQUQ7O29CQUFBO3NCQUFBLEFBQU87QUFBUDtBQUFBLGlCQUpGLEFBSUUsQUFBZSxBQUNmLDRCQUFDLGNBQUQ7O29CQUFBO3NCQUFBO0FBQUE7QUFBQSxTQUNVLG1CQURWLEFBQ2tCLFdBQWlCLGtCQURuQyxBQUMyQyxpQkFBd0IsV0FEbkUsQUFFRyxLQVBMLEFBS0UsQUFJQSxpQ0FBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxpQkFDRyxBQUFRLGFBQVIsQUFBcUIsdUJBQ3BCLEFBQUM7aUJBQ1UsS0FBQSxBQUFLLE1BRGhCLEFBQ3NCLEFBQ3BCO2VBRkYsQUFFUSxBQUNOO2VBSEYsQUFJRTtpQkFBUyxLQUpYLEFBSWdCOztvQkFKaEI7c0JBQUE7QUFBQTtBQUNFLE9BREYsRUFYTixBQVNFLEFBRUksQUFVSiw2QkFBQyxjQUFEOztvQkFBQTtzQkFBQSxBQUNHO0FBREg7QUFBQSxpQkFDRyxBQUFRLFdBQVIsQUFBbUIsdUJBQ2xCLEFBQUM7aUJBQ1UsS0FBQSxBQUFLLE1BRGhCLEFBQ3NCLEFBQ3BCO2VBRkYsQUFFUSxBQUNOO2VBSEYsQUFJRTtpQkFBUyxLQUpYLEFBSWdCOztvQkFKaEI7c0JBQUE7QUFBQTtBQUNFLE9BREYsRUF4QlIsQUFDRSxBQXFCRSxBQUVJLEFBWVQ7Ozs7O0FBbEZzQixBLEFBcUZ6Qjs7a0JBQUEsQUFBZSIsImZpbGUiOiJSZXF1ZXN0Um93LmpzIiwic291cmNlUm9vdCI6Ii9Vc2Vycy9leW1hcmRjbS9Eb2N1bWVudHMvRGV2L2Jsb2NrY2hhaW4vZXRoZXJldW1fYW5kX3NvbGlkaXR5X2NvdXJzZS9raWNrc3RhcnQifQ==