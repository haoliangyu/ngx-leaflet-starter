# ngx-leaflet-starter

[![Build Status](https://travis-ci.org/haoliangyu/ngx-leaflet-starter.svg?branch=master)](https://github.com/haoliangyu/ngx-leaflet-starter)

A web mapping application starter based on Angular X and Leaflet. This project demo includes basic mapping features:

* [x] Display base maps from different sources

* [x] Initialize map based on user's IP address location

* [x] Geocode address and zoom to result location

* [x] Add/remove markers on the map

* [x] Use unofficially typed Leaflet plugin

* [x] Built with Angular CLI

Support [Angular 6](https://angular.io/) and [Leaflet 1.3](http://leafletjs.com/) now!

See how it looks at [demo page](http://haoliangyu.github.io/ngx-leaflet-starter/).

## FAQ

### Was it named _angular2-leaflet-starter_?

Yes, but no longer. Angular is evolving rapidly and has moved further from 2.0. This project is renamed to **ngx-leaflet-starter**, meaning that it will evolve with Angular and stay close to the latest version.

### How about new features?

Since this project has been reached its initial goal to provide a small and clean code base for Angular and Leaflet integration, currently there is no plan for new feature development. But I am open to suggestions and PRs. If you think it's beneficial to add something new (not for very specific use cases), please feel free to submit an issue for dicussion.

### Oops, this plugin is not typed!?

Most Leaflet plugins are not typed, but it doesn't mean they are not usable. To use them in a TypeScript project, one way is to provide a minimal type declaration file.

In the starter, a [minimal type declaration file](https://github.com/haoliangyu/ngx-leaflet-starter/blob/master/public_src/typings/leaflet.vectorgrid.d.ts) is created for the [Leaflet.VectorGrid](https://github.com/Leaflet/Leaflet.VectorGrid). This plugin is used to add the global airport sites (from [openflights.org](http://openflights.org/)) as a vector tile layer.

## How to start?

This project requires [npm](https://www.npmjs.com/) (or [yarn](https://yarnpkg.com/)).

1.  Run `npm install` to install dependencies.

2.  Run `npm run start` to set up the dev server.

3.  See the app at `localhost:4200`.

## Thanks to these awesome people!

* [Rodolphe Eveilleau](https://github.com/rdphv)

* [Wolfgang Becker](https://github.com/vimwb)

* [Tonia Roddick](https://github.com/troddick)

## Looking for other demos?

* [ngx-mapboxgl-starter](https://github.com/haoliangyu/ngx-mapboxgl-starter) is an Angular 2 project seed with [MapboxGL](https://www.mapbox.com/mapbox-gl-js/api/), a mapping library designed for [vector tile](https://www.mapbox.com/help/define-vector-tiles/).

* [boundary.now](https://github.com/haoliangyu/boundary.now), a tool to download place boundries from OpenStreetMap, built with Angular2, [Material2](https://github.com/angular/material2) and Leaflet.
