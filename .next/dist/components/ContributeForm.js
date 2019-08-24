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

var _campaign = require('../ethereum/campaign');

var _campaign2 = _interopRequireDefault(_campaign);

var _web = require('../ethereum/web3');

var _web2 = _interopRequireDefault(_web);

var _routes = require('../routes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _jsxFileName = '/Users/eymardcm/Documents/Dev/blockchain/ethereum_and_solidity_course/kickstart/components/ContributeForm.js';


var ContributeForm = function (_Component) {
  (0, _inherits3.default)(ContributeForm, _Component);

  function ContributeForm() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ContributeForm);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ContributeForm.__proto__ || (0, _getPrototypeOf2.default)(ContributeForm)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: '',
      errorMessage: '',
      success: false,
      loading: false
    }, _this.onSubmit = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(event) {
        var campaign, ethereum, accounts;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                event.preventDefault();

                _this.setState({ loading: true, errorMessage: '', success: false });

                campaign = (0, _campaign2.default)(_this.props.address);
                _context.prev = 3;
                ethereum = window.ethereum;
                _context.next = 7;
                return ethereum.enable();

              case 7:
                _context.next = 9;
                return _web2.default.eth.getAccounts();

              case 9:
                accounts = _context.sent;
                _context.next = 12;
                return campaign.methods.contribute().send({
                  from: accounts[0],
                  value: _web2.default.utils.toWei(_this.state.value, 'ether')
                });

              case 12:
                _this.setState({ success: true });
                setTimeout(function () {
                  _routes.Router.replaceRoute('/campaigns/' + _this.props.address);
                }, 1000);
                _context.next = 19;
                break;

              case 16:
                _context.prev = 16;
                _context.t0 = _context['catch'](3);

                _this.setState({ errorMessage: _context.t0.message });

              case 19:

                _this.setState({ loading: false, value: '' });

              case 20:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this2, [[3, 16]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ContributeForm, [{
    key: 'render',
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(_semanticUiReact.Form, {
        onSubmit: this.onSubmit,
        error: !!this.state.errorMessage,
        success: this.state.success,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 46
        }
      }, _react2.default.createElement(_semanticUiReact.Form.Field, {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 51
        }
      }, _react2.default.createElement('label', {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 52
        }
      }, 'Amount to Contribute'), _react2.default.createElement(_semanticUiReact.Input, {
        label: 'ether',
        labelPosition: 'right',
        value: this.state.value,
        onChange: function onChange(event) {
          return _this3.setState({ value: event.target.value });
        },
        __source: {
          fileName: _jsxFileName,
          lineNumber: 53
        }
      })), _react2.default.createElement(_semanticUiReact.Message, { error: true, header: 'Ooops', content: this.state.errorMessage, __source: {
          fileName: _jsxFileName,
          lineNumber: 60
        }
      }), _react2.default.createElement(_semanticUiReact.Message, {
        success: true,
        header: 'Success',
        content: 'The transaction completed successfully.',
        __source: {
          fileName: _jsxFileName,
          lineNumber: 61
        }
      }), _react2.default.createElement(_semanticUiReact.Button, { loading: this.state.loading, primary: true, __source: {
          fileName: _jsxFileName,
          lineNumber: 66
        }
      }, 'Contribute!'));
    }
  }]);

  return ContributeForm;
}(_react.Component);

exports.default = ContributeForm;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvQ29udHJpYnV0ZUZvcm0uanMiXSwibmFtZXMiOlsiUmVhY3QiLCJDb21wb25lbnQiLCJGb3JtIiwiSW5wdXQiLCJNZXNzYWdlIiwiQnV0dG9uIiwiQ2FtcGFpZ24iLCJ3ZWIzIiwiUm91dGVyIiwiQ29udHJpYnV0ZUZvcm0iLCJzdGF0ZSIsInZhbHVlIiwiZXJyb3JNZXNzYWdlIiwic3VjY2VzcyIsImxvYWRpbmciLCJvblN1Ym1pdCIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXRTdGF0ZSIsImNhbXBhaWduIiwicHJvcHMiLCJhZGRyZXNzIiwiZXRoZXJldW0iLCJ3aW5kb3ciLCJlbmFibGUiLCJldGgiLCJnZXRBY2NvdW50cyIsImFjY291bnRzIiwibWV0aG9kcyIsImNvbnRyaWJ1dGUiLCJzZW5kIiwiZnJvbSIsInV0aWxzIiwidG9XZWkiLCJzZXRUaW1lb3V0IiwicmVwbGFjZVJvdXRlIiwibWVzc2FnZSIsInRhcmdldCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLEFBQU8sQUFBUzs7OztBQUNoQixBQUFTLEFBQU0sQUFBTyxBQUFTOztBQUMvQixBQUFPLEFBQWM7Ozs7QUFDckIsQUFBTyxBQUFVOzs7O0FBRWpCLEFBQVMsQUFBYzs7Ozs7OztJLEFBRWpCOzs7Ozs7Ozs7Ozs7Ozs7NE4sQUFDSjthQUFRLEFBQ0MsQUFDUDtvQkFGTSxBQUVRLEFBQ2Q7ZUFITSxBQUdHLEFBQ1Q7ZSxBQUpNLEFBSUc7QUFKSCxBQUNOLGEsQUFNRjsyRkFBVyxpQkFBQSxBQUFNLE9BQU47Z0NBQUE7c0VBQUE7b0JBQUE7NkNBQUE7bUJBQ1Q7c0JBQUEsQUFBTSxBQUVOOztzQkFBQSxBQUFLLFNBQVMsRUFBRSxTQUFGLEFBQVcsTUFBTSxjQUFqQixBQUErQixJQUFJLFNBQWpELEFBQWMsQUFBNEMsQUFFcEQ7O0FBTEcsMkJBS1Esd0JBQVMsTUFBQSxBQUFLLE1BTHRCLEFBS1EsQUFBb0I7Z0NBRzdCO0FBUkMsMkJBUVUsT0FSVixBQVFpQjtnQ0FSakI7dUJBU0QsU0FUQyxBQVNELEFBQVM7O21CQVRSO2dDQUFBO3VCQVVnQixjQUFBLEFBQUssSUFWckIsQUFVZ0IsQUFBUzs7bUJBQTFCO0FBVkMsb0NBQUE7Z0NBQUE7Z0NBV0QsQUFBUyxRQUFULEFBQ0gsYUFERyxBQUVIO3dCQUNPLFNBREYsQUFDRSxBQUFTLEFBQ2Y7eUJBQU8sY0FBQSxBQUFLLE1BQUwsQUFBVyxNQUFNLE1BQUEsQUFBSyxNQUF0QixBQUE0QixPQWZoQyxBQVdELEFBRUUsQUFFRyxBQUFtQztBQUZ0QyxBQUNKLGlCQUhFOzttQkFNTjtzQkFBQSxBQUFLLFNBQVMsRUFBRSxTQUFoQixBQUFjLEFBQVcsQUFDekI7MkJBQVcsWUFBTSxBQUNmO2lDQUFBLEFBQU8sNkJBQTJCLE1BQUEsQUFBSyxNQUF2QyxBQUE2QyxBQUM5QztBQUZELG1CQWxCTyxBQWtCUCxBQUVHO2dDQXBCSTtBQUFBOzttQkFBQTtnQ0FBQTtnREFzQlA7O3NCQUFBLEFBQUssU0FBUyxFQUFFLGNBQWMsWUF0QnZCLEFBc0JQLEFBQWMsQUFBc0I7O21CQUd0Qzs7c0JBQUEsQUFBSyxTQUFTLEVBQUUsU0FBRixBQUFXLE9BQU8sT0F6QnZCLEFBeUJULEFBQWMsQUFBeUI7O21CQXpCOUI7bUJBQUE7Z0NBQUE7O0FBQUE7aUNBQUE7QTs7Ozs7Ozs7Ozs2QkE0QkY7bUJBQ1A7OzZCQUNFLEFBQUM7a0JBQ1csS0FEWixBQUNpQixBQUNmO2VBQU8sQ0FBQyxDQUFDLEtBQUEsQUFBSyxNQUZoQixBQUVzQixBQUNwQjtpQkFBUyxLQUFBLEFBQUssTUFIaEIsQUFHc0I7O29CQUh0QjtzQkFBQSxBQUtFO0FBTEY7QUFDRSxPQURGLGtCQUtHLGNBQUQsc0JBQUEsQUFBTTs7b0JBQU47c0JBQUEsQUFDRTtBQURGO0FBQUEseUJBQ0UsY0FBQTs7b0JBQUE7c0JBQUE7QUFBQTtBQUFBLFNBREYsQUFDRSxBQUNBLHlDQUFBLEFBQUM7ZUFBRCxBQUNRLEFBQ047dUJBRkYsQUFFZ0IsQUFDZDtlQUFPLEtBQUEsQUFBSyxNQUhkLEFBR29CLEFBQ2xCO2tCQUFVLHlCQUFBO2lCQUFTLE9BQUEsQUFBSyxTQUFTLEVBQUUsT0FBTyxNQUFBLEFBQU0sT0FBdEMsQUFBUyxBQUFjLEFBQXNCO0FBSnpEOztvQkFBQTtzQkFQSixBQUtFLEFBRUUsQUFPRjtBQVBFO0FBQ0UsMkJBTUosQUFBQywwQ0FBUSxPQUFULE1BQWUsUUFBZixBQUFzQixTQUFRLFNBQVMsS0FBQSxBQUFLLE1BQTVDLEFBQWtEO29CQUFsRDtzQkFkRixBQWNFLEFBQ0E7QUFEQTswQkFDQSxBQUFDO2lCQUFELEFBRUU7Z0JBRkYsQUFFUyxBQUNQO2lCQUhGLEFBR1U7O29CQUhWO3NCQWZGLEFBZUUsQUFLQTtBQUxBO0FBQ0UsMEJBSUYsQUFBQyx5Q0FBTyxTQUFTLEtBQUEsQUFBSyxNQUF0QixBQUE0QixTQUFTLFNBQXJDO29CQUFBO3NCQUFBO0FBQUE7U0FyQkosQUFDRSxBQW9CRSxBQUtMOzs7OztBQS9EMEIsQSxBQWtFN0I7O2tCQUFBLEFBQWUiLCJmaWxlIjoiQ29udHJpYnV0ZUZvcm0uanMiLCJzb3VyY2VSb290IjoiL1VzZXJzL2V5bWFyZGNtL0RvY3VtZW50cy9EZXYvYmxvY2tjaGFpbi9ldGhlcmV1bV9hbmRfc29saWRpdHlfY291cnNlL2tpY2tzdGFydCJ9