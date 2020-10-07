import valueParser from 'postcss-value-parser';
import unicode from 'emoji-unicode';

const escapedValueRegex = /(\\[\dA-Fa-f]{4,5})/;

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

export default () => {
	return {
		postcssPlugin: 'postcss-escape-generated-content-string',
		Declaration: {
			content: (decl) => {
				const parsed = valueParser(decl.value);
				parsed.walk(walkStrings);
				decl.value = parsed.toString();
			}
		}
	};
};

export const postcss = true;
