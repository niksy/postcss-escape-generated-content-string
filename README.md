# postcss-escape-generated-content-string

[![Build Status][ci-img]][ci]

[PostCSS][postcss] plugin for escaping strings in generated content.

Features:

-   Handles every character (emojis included)
-   Already escaped characters are left untouched

## Install

```sh
npm install postcss postcss-escape-generated-content-string --save
```

## Usage

```js
import postcss from 'postcss';
import plugin from 'postcss-escape-generated-content-string';

postcss([plugin()]);
```

```css
/* Before */

.becky {
	content: 'becky 🐕';
}

/* After */

.becky {
	content: '\0062\0065\0063\006b\0079\0020\1f415';
}
```

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)

<!-- prettier-ignore-start -->

[ci]: https://travis-ci.com/niksy/postcss-escape-generated-content-string
[ci-img]: https://travis-ci.com/niksy/postcss-escape-generated-content-string.svg?branch=master
[postcss]: https://github.com/postcss/postcss

<!-- prettier-ignore-end -->
