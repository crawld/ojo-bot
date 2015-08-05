!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var t;t="undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this,t.geojsonvt=e()}}(function(){return function e(t,n,o){function r(s,u){if(!n[s]){if(!t[s]){var l="function"==typeof require&&require;if(!u&&l)return l(s,!0);if(i)return i(s,!0);var f=new Error("Cannot find module '"+s+"'");throw f.code="MODULE_NOT_FOUND",f}var a=n[s]={exports:{}};t[s][0].call(a.exports,function(e){var n=t[s][1][e];return r(n?n:e)},a,a.exports,e,t,n,o)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(e,t,n){"use strict";function o(e,t,n,o,s,u){n/=t,o/=t;for(var l=[],f=0;f<e.length;f++){var a,h,p=e[f],c=p.geometry,g=p.type;if(p.min){if(a=p.min[s],h=p.max[s],a>=n&&o>=h){l.push(p);continue}if(a>o||n>h)continue}var m=1===g?r(c,n,o,s):i(c,n,o,s,u,3===g);m.length&&l.push({geometry:m,type:g,tags:e[f].tags||null})}return l.length?l:null}function r(e,t,n,o){for(var r=[],i=0;i<e.length;i++){var s=e[i],u=s[o];u>=t&&n>=u&&r.push(s)}return r}function i(e,t,n,o,r,i){for(var u=[],l=0;l<e.length;l++){var f,a,h=0,p=0,c=null,g=e[l],m=g.area,d=g.dist,v=g.length,y=[];for(a=0;v-1>a;a++)f=c||g[a],c=g[a+1],h=p||f[o],p=c[o],t>h?p>n?(y.push(r(f,c,t),r(f,c,n)),i||(y=s(u,y,m,d))):p>=t&&y.push(r(f,c,t)):h>n?t>p?(y.push(r(f,c,n),r(f,c,t)),i||(y=s(u,y,m,d))):n>=p&&y.push(r(f,c,n)):(y.push(f),t>p?(y.push(r(f,c,t)),i||(y=s(u,y,m,d))):p>n&&(y.push(r(f,c,n)),i||(y=s(u,y,m,d))));f=g[v-1],h=f[o],h>=t&&n>=h&&y.push(f),i&&y[0]!==y[y.length-1]&&y.push(y[0]),s(u,y,m,d)}return u}function s(e,t,n,o){return t.length&&(t.area=n,t.dist=o,e.push(t)),[]}t.exports=o},{}],2:[function(e,t,n){"use strict";function o(e,t){var n=[];if("FeatureCollection"===e.type)for(var o=0;o<e.features.length;o++)r(n,e.features[o],t);else"Feature"===e.type?r(n,e,t):r(n,{geometry:e},t);return n}function r(e,t,n){var o,l,f,a=t.geometry,h=a.type,p=a.coordinates,c=t.properties;if("Point"===h)e.push(i(c,1,[u(p)]));else if("MultiPoint"===h)e.push(i(c,1,s(p)));else if("LineString"===h)e.push(i(c,2,[s(p,n)]));else if("MultiLineString"===h||"Polygon"===h){for(f=[],o=0;o<p.length;o++)f.push(s(p[o],n));e.push(i(c,"Polygon"===h?3:2,f))}else if("MultiPolygon"===h){for(f=[],o=0;o<p.length;o++)for(l=0;l<p[o].length;l++)f.push(s(p[o][l],n));e.push(i(c,3,f))}else if("GeometryCollection"===h)for(o=0;o<a.geometries.length;o++)r(e,{geometry:a.geometries[o],properties:c},n);else console.warn("Unsupported GeoJSON type: "+a.type)}function i(e,t,n){var o={geometry:n,type:t,tags:e||null,min:[1,1],max:[0,0]};return f(o),o}function s(e,t){for(var n=[],o=0;o<e.length;o++)n.push(u(e[o]));return t&&(h(n,t),l(n)),n}function u(e){var t=Math.sin(e[1]*Math.PI/180),n=e[0]/360+.5,o=.5-.25*Math.log((1+t)/(1-t))/Math.PI;return[n,o,0]}function l(e){for(var t,n,o=0,r=0,i=0;i<e.length-1;i++)t=n||e[i],n=e[i+1],o+=t[0]*n[1]-n[0]*t[1],r+=Math.abs(n[0]-t[0])+Math.abs(n[1]-t[1]);e.area=Math.abs(o/2),e.dist=r}function f(e){var t=e.geometry,n=e.min,o=e.max;if(1===e.type)a(n,o,t);else for(var r=0;r<t.length;r++)a(n,o,t[r]);return e}function a(e,t,n){for(var o,r=0;r<n.length;r++)o=n[r],e[0]=Math.min(o[0],e[0]),t[0]=Math.max(o[0],t[0]),e[1]=Math.min(o[1],e[1]),t[1]=Math.max(o[1],t[1])}t.exports=o;var h=e("./simplify")},{"./simplify":4}],3:[function(e,t,n){"use strict";function o(e,t){return new r(e,t)}function r(e,t){t=this.options=h(Object.create(this.options),t);var n=t.debug;n&&console.time("preprocess data");var o=1<<t.maxZoom,r=p(e,t.tolerance/(o*t.extent));this.tiles={},n&&(console.timeEnd("preprocess data"),console.log("index: maxZoom: %d, maxPoints: %d",t.indexMaxZoom,t.indexMaxPoints),console.time("generate tiles"),this.stats={},this.total=0),this.splitTile(r,0,0,0),n&&(console.log("features: %d, points: %d",this.tiles[0].numFeatures,this.tiles[0].numPoints),console.timeEnd("generate tiles"),console.log("tiles generated:",this.total,JSON.stringify(this.stats)))}function i(e,t){if(!e||e.transformed)return e;var n,o,r,i=e.z2,u=e.x,l=e.y;for(n=0;n<e.features.length;n++){var f=e.features[n],a=f.geometry,h=f.type;if(1===h)for(o=0;o<a.length;o++)a[o]=s(a[o],t,i,u,l);else for(o=0;o<a.length;o++){var p=a[o];for(r=0;r<p.length;r++)p[r]=s(p[r],t,i,u,l)}}return e.transformed=!0,e}function s(e,t,n,o,r){var i=Math.round(t*(e[0]*n-o)),s=Math.round(t*(e[1]*n-r));return[i,s]}function u(e,t,n){if(1!==e.length)return!1;var o=e[0];if(3!==o.type||o.geometry.length>1)return!1;for(var r=0;r<o.geometry[0].length;r++){var i=o.geometry[0][r];if(i[0]!==-n&&i[0]!==t+n||i[1]!==-n&&i[1]!==t+n)return!1}return!0}function l(e,t,n){return 32*((1<<e)*n+t)+e}function f(e,t,n){return[n,(n-e[0])*(t[1]-e[1])/(t[0]-e[0])+e[1],1]}function a(e,t,n){return[(n-e[1])*(t[0]-e[0])/(t[1]-e[1])+e[0],n,1]}function h(e,t){for(var n in t)e[n]=t[n];return e}t.exports=o;var p=e("./convert"),c=e("./clip"),g=e("./tile");r.prototype.options={maxZoom:14,indexMaxZoom:5,indexMaxPoints:1e5,tolerance:3,extent:4096,buffer:64,debug:0},r.prototype.splitTile=function(e,t,n,o,r,i,s){for(var h=[e,t,n,o],p=this.options,m=p.debug,d=p.extent,v=p.buffer;h.length;){e=h.shift(),t=h.shift(),n=h.shift(),o=h.shift();var y=1<<t,x=l(t,n,o),M=this.tiles[x],P=t===p.maxZoom?0:p.tolerance/(y*d);if(!M&&(m>1&&console.time("creation"),M=this.tiles[x]=g(e,y,n,o,P,t===p.maxZoom),m)){m>1&&(console.log("tile z%d-%d-%d (features: %d, points: %d, simplified: %d)",t,n,o,M.numFeatures,M.numPoints,M.numSimplified),console.timeEnd("creation"));var b="z"+t;this.stats[b]=(this.stats[b]||0)+1,this.total++}if(M.source=e,!u(M.features,d,v)){if(r){if(t===p.maxZoom||t===r)continue;var w=1<<r-t;if(n!==Math.floor(i/w)&&o!==Math.floor(s/w))continue}else if(t===p.indexMaxZoom||M.numPoints<=p.indexMaxPoints)continue;M.source=null,m>1&&console.time("clipping");var Z,S,E,F,z,O,T=.5*v/d,q=.5-T,N=.5+T,j=1+T;Z=S=E=F=null,z=c(e,y,n-T,n+N,0,f),O=c(e,y,n+q,n+j,0,f),z&&(Z=c(z,y,o-T,o+N,1,a),S=c(z,y,o+q,o+j,1,a)),O&&(E=c(O,y,o-T,o+N,1,a),F=c(O,y,o+q,o+j,1,a)),m>1&&console.timeEnd("clipping"),Z&&h.push(Z,t+1,2*n,2*o),S&&h.push(S,t+1,2*n,2*o+1),E&&h.push(E,t+1,2*n+1,2*o),F&&h.push(F,t+1,2*n+1,2*o+1)}}},r.prototype.getTile=function(e,t,n){var o=this.options,r=o.extent,s=o.debug,f=l(e,t,n);if(this.tiles[f])return i(this.tiles[f],r);s>1&&console.log("drilling down to z%d-%d-%d",e,t,n);for(var a,h=e,p=t,c=n;!a&&h>0;)h--,p=Math.floor(p/2),c=Math.floor(c/2),a=this.tiles[l(h,p,c)];if(s>1&&console.log("found parent tile z%d-%d-%d",h,p,c),a.source){if(u(a.features,o.extent,o.buffer))return i(a,r);s>1&&console.time("drilling down"),this.splitTile(a.source,h,p,c,e,t,n),s>1&&console.timeEnd("drilling down")}return i(this.tiles[f],r)}},{"./clip":1,"./convert":2,"./tile":5}],4:[function(e,t,n){"use strict";function o(e,t){var n,o,i,s,u=t*t,l=e.length,f=0,a=l-1,h=[];for(e[f][2]=1,e[a][2]=1;a;){for(o=0,n=f+1;a>n;n++)i=r(e[n],e[f],e[a]),i>o&&(s=n,o=i);o>u?(e[s][2]=o,h.push(f),h.push(s),f=s):(a=h.pop(),f=h.pop())}}function r(e,t,n){var o=t[0],r=t[1],i=n[0],s=n[1],u=e[0],l=e[1],f=i-o,a=s-r;if(0!==f||0!==a){var h=((u-o)*f+(l-r)*a)/(f*f+a*a);h>1?(o=i,r=s):h>0&&(o+=f*h,r+=a*h)}return f=u-o,a=l-r,f*f+a*a}t.exports=o},{}],5:[function(e,t,n){"use strict";function o(e,t,n,o,i,s){for(var u={features:[],numPoints:0,numSimplified:0,numFeatures:0,source:null,x:n,y:o,z2:t,transformed:!1},l=0;l<e.length;l++)u.numFeatures++,r(u,e[l],i,s);return u}function r(e,t,n,o){var r,i,s,u,l=t.geometry,f=t.type,a=[],h=n*n;if(1===f)for(r=0;r<l.length;r++)a.push(l[r]),e.numPoints++,e.numSimplified++;else for(r=0;r<l.length;r++)if(s=l[r],o||!(2===f&&s.dist<n||3===f&&s.area<h)){var p=[];for(i=0;i<s.length;i++)u=s[i],(o||u[2]>h)&&(p.push(u),e.numSimplified++),e.numPoints++;a.push(p)}else e.numPoints+=s.length;a.length&&e.features.push({geometry:a,type:f,tags:t.tags||null})}t.exports=o},{}]},{},[3])(3)});