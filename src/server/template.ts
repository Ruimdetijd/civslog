const pkg = require('../../package.json')

const min = process.env.NODE_ENV === 'production' ? '.min' : ''
const reloadScript = process.env.NODE_ENV === 'development' ? '<script src="/reload/reload.js"></script>' : ''

const template = (): string =>
`<!DOCTYPE html>
<html>
	<head>
		<title>Halicarnassus ${pkg.dependencies.halicarnassus.slice(1)}</title>
		<link rel="stylesheet" href="https://openlayers.org/en/v5.1.3/css/ol.css" type="text/css">
		<link rel="stylesheet" href="/halicarnassus/halicarnassus.css" type="text/css">
		<script src="/dist/client/bundle${min}.js"></script>
		<style>
			html, body {
				height: 100%;
				margin: 0;
				padding: 0;
				width: 100%;
			}
			#container {
				height: 100%;
				width: 100%;
			}
		</style>
	</head>
	<body>
		<div id="container"></div>
		${reloadScript}
	</body>
</html>`

export default template