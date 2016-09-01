var SpaghettiBall = function() {
	this.init();
};

SpaghettiBall.prototype = {
	_tree: null,

	init: function() {
		this._tree = {};
	},

	store: function(key, value, delim) {
		if (!key) {
			return;
		}
		delim = delim || ".";

		var parts = key.split(delim);

		var node = this._tree;
		for(var i = 0; i < parts.length - 1; i++) {
			var part = parts[i];

			if (!node[part]) {
				node[part] = {};
			}
			node = node[part];
		}

		var lastIdx = parts.length - 1;
		var lastKey = parts[lastIdx];
		node[lastKey] = value;
	},

	_findBranch: function(key, delim) {
		if (!key) {
			return;
		}
		delim = delim || ".";

		var parts = key.split(delim);

		var node = this._tree;
		for(var i=0;i<parts.length;i++) {
			var part = parts[i];
			if (node[part]) {
				// we must go deeper
				node = node[part];
			}
			else {
				// didn't find a next step, return what we have so far.
				break;
			}
		}

		return node;
	},

	search: function(searchKey, delim, matchFn) {
		var results = this._findBranch(searchKey, delim);

		if (!matchFn) {
			return results;
		}

		var resultKeys = Object.keys(results);
		for(var i = 0; i < resultKeys.length; i++) {
			var resultKey = resultKeys[i];
			var node = results[resultKey];

			if (matchFn(searchKey, node)) {
				return node;
			}
		}
	},

	_: null
};
module.exports = SpaghettiBall;