Angular2-Leaflet-Starter
========================

A web mapping application starter based on Angular 2 and Leaflet. This project demo includes basic mapping functions:

-	[x] Display base maps from different sources

-	[x] Integrate Font-Awesome

-	[x] ~~Initialize map based on client's IP location (currently not working)~~

-	[x] Geocode address and zoom to result location

-	[x] Add/remove markers on the map

-	[ ] Create interactive marker popup

Working with [angular@2.0.0-rc4](https://github.com/angular/angular/blob/master/CHANGELOG.md#200-rc4-2016-06-30).

See how it works at [demo page](http://haoliangyu.github.io/angular2-leaflet-starter/).

How to develop
--------------

This project requires [npm](https://www.npmjs.com/), [tsd](http://definitelytyped.org/tsd/),  [webpack](http://webpack.github.io/docs/installation.html).

1.	Run `npm install` to install all dependencies.

2.	Run `tsd install` to install type definition.

3.	Run `webpack` to build the project.

4.	As a more convinient way, run the [webpack-dev-server](http://webpack.github.io/docs/installation.html) to set up the app at `http://localhost:8080`

## Known Issue

Webpack will throw following error:

```
error TS2656: Exported external package typings file '/home/haoliang/Documents/Projects/angular2-leaflet-starter/node_modules/zone.js/dist/zone.js.d.ts' is not a module. P
lease contact the package author to update the package definition.
```

This is from a bug of zone.js ([#297](https://github.com/angular/zone.js/issues/297)) and the official fix isn't released. This error doesn't stop webpack from bundling the script and the app should work with the generated bundle. If there is any problem, please give me more information at [#9](https://github.com/haoliangyu/angular2-leaflet-starter/issues/9). Thanks.

Thanks to these awesome people!
-------------------------------

-	[Rodolphe Eveilleau](https://github.com/rdphv)
