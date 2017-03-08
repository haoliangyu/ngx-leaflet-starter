Angular2-Leaflet-Starter
========================

[![Build Status](https://travis-ci.org/haoliangyu/angular2-leaflet-starter.svg?branch=master)](https://github.com/haoliangyu/angular2-leaflet-starter)


A web mapping application starter based on Angular 2 and Leaflet. This project demo includes basic mapping features:

-	[x] Display base maps from different sources

-	[x] Integrate Font-Awesome

-	[x] Initialize map based on user's IP address location

-	[x] Geocode address and zoom to result location

-	[x] Add/remove markers on the map

- [x] Use unofficially typed Leaflet plugin

-	[ ] Webpack 2

Support [Angular 2.x](https://github.com/angular/angular/blob/master/CHANGELOG.md#200-2016-09-14) and [Leaflet 1.0](https://github.com/Leaflet/Leaflet/blob/master/CHANGELOG.md#101-september-30-2016) now!

See how it looks at [demo page](http://haoliangyu.github.io/angular2-leaflet-starter/).

FAQ
--------------

### How about new features?

Since this project has been reached its initial goal to provide a small and clean code base for Angular 2 and Leaflet integration, currently there is no plan for new feature development. But I am open to suggestions and PRs. If you think it's beneficial to add something new (not in very specific purposes), please feel free to submit an issue for dicussion.

### Oops, this plugin is not typed!?

Most Leaflet plugins are not typed, but it doesn't mean they are not usable. To use them in a TypeScript project, one way is to provide a minimal type declaration file.

In the starter, a [minimal type declaration file](https://github.com/haoliangyu/angular2-leaflet-starter/blob/master/public_src/typings/leaflet.vectorgrid.d.ts) is created for the [Leaflet.VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid). This plugin is used to add the global airport sites (from [openflights.org](http://openflights.org/)) as a vector tile layer.

### GeoJSON file is not found?

If you build and open the app using [webpack-dev-server](https://github.com/webpack/webpack-dev-server), you will get an `geojson not found` error when toggling the vector tile layer. It's because external resources are not copied into the memory by `webpack-dev-server`. Open the `public/index.html` instead.

How to start?
--------------

This project requires [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)).

1.	Run `npm install` or `yarn install` to install dependencies.

2.	Run `npm run build` to build the project.

3.  Open the app at `public/index.html`.

Thanks to these awesome people!
-------------------------------

-	[Rodolphe Eveilleau](https://github.com/rdphv)

- [Wolfgang Becker](https://github.com/vimwb)

Looking for other demos?
-------------------------------

* [angular2-mapboxgl-starter](https://github.com/haoliangyu/angular2-mapboxgl-starter) is an Angular 2 project seed with [MapboxGL](https://www.mapbox.com/mapbox-gl-js/api/), a mapping library designed for [vector tile](https://www.mapbox.com/help/define-vector-tiles/).

* [boundary.now](https://github.com/haoliangyu/boundary.now), a tool to easily download place boundries, created with [Material2](https://github.com/angular/material2) and Leaflet.
