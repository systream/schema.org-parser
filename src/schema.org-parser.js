function getMicroformats() {
	var itemScopes = document.querySelectorAll("[itemscope]"),
		microFormats = [];

    if (!itemScopes.length) {
        return microFormats;
    }

	for (var x in itemScopes) {
		if (!itemScopes.hasOwnProperty(x)) {
			continue;
		}
		var currentItemScope = itemScopes[x],
			currentResultItem = [];

        currentResultItem['itemType'] = currentItemScope.getAttribute('itemtype');

		var itemProps = currentItemScope.querySelectorAll('[itemprop]');

		for (var y in itemProps) {
			if (!itemProps.hasOwnProperty(y)) {
				continue;
			}

			var currentItemProp = itemProps[y],
                itemPropName;

            if (currentItemProp != undefined) {
                itemPropName = currentItemProp.getAttribute('itemprop').replace(/\s/g, "");
                currentResultItem[itemPropName] = currentItemProp.textContent.replace(/\s/g, "");
            }
		}

		microFormats.push(currentResultItem);
	}
	return microFormats;
}