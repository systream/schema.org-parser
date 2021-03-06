function getMicroFormats(domElement) {

	if (!domElement) {
		domElement = document;
	}

	var itemScopes = domElement.querySelectorAll('[itemscope]'),
		microFormats = [],
		processedItemScopes = [],
		processedItemProps = [];

	if (!itemScopes.length) {
		return microFormats;
	}

	function getItemPropValue(itemPropName, currentItemProp) {

		if (currentItemProp.hasAttribute('content')) {
			return currentItemProp
				.getAttribute('content')
				.replace(/\s+/g, ' ')
				.trim();
		}

		var result;
		if (itemPropName === 'url') {
			result = currentItemProp
				.getAttribute('href')
				.replace(/\s+/g, ' ')
				.trim();
		} else if (itemPropName === 'image') {
			result = currentItemProp
				.getAttribute('src')
				.replace(/\s+/g, ' ')
				.trim();
		} else {
			result = currentItemProp
				.textContent
				.replace(/\s+/g, ' ')
				.trim();

		}
		return result;
	}

	/**
	 *
	 * @param currentItemScope
	 * @returns {{}}
	 */
	function processItemScope(currentItemScope) {

		var currentResultItem = {};

		currentResultItem['@type'] = currentItemScope.getAttribute('itemtype').substr(18);
		var itemProps = currentItemScope.querySelectorAll('[itemprop]');

		processedItemScopes.push(currentItemScope);
		var y;
		for (y in itemProps) {
			if (itemProps.hasOwnProperty(y)) {

				if (processedItemProps.indexOf(itemProps[y]) !== -1) {
					continue;
				}

				var currentItemProp = itemProps[y],
					itemPropName;

				processedItemProps.push(currentItemProp);

				if (currentItemProp === undefined) {
					continue;
				}

				itemPropName = currentItemProp.getAttribute('itemprop').replace(/\s+/g, ' ').trim();

				if (currentItemProp.hasAttribute('itemscope')) {
					currentResultItem[itemPropName] = processItemScope(currentItemProp);
					continue;
				}
				currentResultItem[itemPropName] = getItemPropValue(itemPropName, currentItemProp);
			}
		}
		return currentResultItem;
	}

	// iterate throw item scopes
	var x;
	for (x in itemScopes) {
		if (itemScopes.hasOwnProperty(x)) {
			if (processedItemScopes.indexOf(itemScopes[x]) !== -1) {
				continue;
			}

			var currentResultItem = processItemScope(itemScopes[x]);
			microFormats.push(currentResultItem);
		}
	}
	return microFormats;
}