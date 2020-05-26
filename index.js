import postcss from 'postcss';
import valueParser from 'postcss-value-parser';
import unicode from 'emoji-unicode';

const escapedValueRegex = /(\\[\dA-Fa-f]{4})/;

/**
 * @param  {string} string
 *
 * @returns {string}
 */
function escapeCharacters(string) {
	return `\\${unicode(string)
		.padStart(4, 0)
		.toLowerCase()}`;
}

/**
 * @param  {object} node
 */
function walkStrings(node) {
	if (node.type !== 'string') {
		return;
	}
	node.value = node.value
		.split(escapedValueRegex)
		.map((stringPart) => {
			if (escapedValueRegex.test(stringPart)) {
				return stringPart;
			}
			return [...stringPart].map(escapeCharacters);
		})
		.reduce((array, arrayPart) => array.concat(arrayPart), [])
		.join('');
}

export default postcss.plugin('postcss-escape-generated-content-string', () => {
	return (css) => {
		css.walkDecls('content', (decl) => {
			const parsed = valueParser(decl.value);
			parsed.walk(walkStrings);
			decl.value = parsed.toString();
		});
	};
});
