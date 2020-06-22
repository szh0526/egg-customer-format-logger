# egg-customer-format-logger

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![David deps][david-image]][david-url]
[![Known Vulnerabilities][snyk-image]][snyk-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/egg-customer-format-logger.svg?style=flat-square
[npm-url]: https://npmjs.org/package/egg-customer-format-logger
[travis-image]: https://img.shields.io/travis/eggjs/egg-customer-format-logger.svg?style=flat-square
[travis-url]: https://travis-ci.org/eggjs/egg-customer-format-logger
[codecov-image]: https://img.shields.io/codecov/c/github/eggjs/egg-customer-format-logger.svg?style=flat-square
[codecov-url]: https://codecov.io/github/eggjs/egg-customer-format-logger?branch=master
[david-image]: https://img.shields.io/david/eggjs/egg-customer-format-logger.svg?style=flat-square
[david-url]: https://david-dm.org/eggjs/egg-customer-format-logger
[snyk-image]: https://snyk.io/test/npm/egg-customer-format-logger/badge.svg?style=flat-square
[snyk-url]: https://snyk.io/test/npm/egg-customer-format-logger
[download-image]: https://img.shields.io/npm/dm/egg-customer-format-logger.svg?style=flat-square
[download-url]: https://npmjs.org/package/egg-customer-format-logger

<!--
Description here.
-->

## Install

```bash
$ npm i egg-customer-format-logger --save
```

## Usage

```js
// {app_root}/config/plugin.js
exports.customerLogger = {
  enable: true,
  package: 'egg-customer-format-logger',
};
```

## Configuration

```js
// {app_root}/config/config.default.js
exports.customerLogger = {
};
```

see [config/config.default.js](config/config.default.js) for more detail.

## Example

<!-- example here -->

## Questions & Suggestions

Please open an issue [here](https://github.com/eggjs/egg/issues).

## License

[MIT](LICENSE)
