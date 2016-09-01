var ip = require('ip');

var SearchHelpers = {

	matchIPInBall: function(searchValue, node) {
		if (ip.cidrSubnet(node.network).contains(searchValue)) {
			return true;
		}
	},

	_: null
};
module.exports = SearchHelpers;