$(preamble)
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.geometric = {})));
}(this, (function (exports) { 'use strict';

    // Converts radians to degrees.
    function angleToDegrees(angle) {
      return angle * 180 / Math.PI;
    }

    // Calculates the angle of a line, in degrees.
    function lineAngle(line) {
      return angleToDegrees(Math.atan2(line[1][1] - line[0][1], line[1][0] - line[0][0]));
    }

    function _slicedToArray(arr, i) {
      return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
    }
    function _arrayWithHoles(arr) {
      if (Array.isArray(arr)) return arr;
    }
    function _iterableToArrayLimit(arr, i) {
      var _arr = [];
      var _n = true;
      var _d = false;
      var _e = undefined;
      try {
        for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
          _arr.push(_s.value);
          if (i && _arr.length === i) break;
        }
      } catch (err) {
        _d = true;
        _e = err;
      } finally {
        try {
          if (!_n && _i["return"] != null) _i["return"]();
        } finally {
          if (_d) throw _e;
        }
      }
      return _arr;
    }
    function _nonIterableRest() {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }

    function clamp(value, min, max) {
      return Math.max(Math.min(value, max), min);
    }

    // Returns an interpolator function given a line [a, b].
    // The returned interpolator function takes a single argument t, where t is a number ranging from 0 to 1;
    // a value of 0 returns a, while a value of 1 returns b.
    // Intermediate values interpolate from start to end along the line segment.
    // By default, the returned interpolator will output points outside of the line segment if t is less than 0 or greater than 1.
    // You can pass an optional boolean indicating whether to the returned point to inside of the line segment,
    // even if t is greater than 1 or less then 0.
    function lineInterpolate(line) {
      var _line = _slicedToArray(line, 2),
        _line$ = _slicedToArray(_line[0], 2),
        x1 = _line$[0],
        y1 = _line$[1],
        _line$2 = _slicedToArray(_line[1], 2),
        x2 = _line$2[0],
        y2 = _line$2[1];
      var x = function x(v) {
        return (x2 - x1) * v + x1;
      };
      var y = function y(v) {
        return (y2 - y1) * v + y1;
      };
      return function (t) {
        var t0 = clamp(t, 0, 1);
        return [x(t0), y(t0)];
      };
    }

    // Calculates the distance between the endpoints of a line segment.
    function lineLength(line) {
      var x = line[1][0] - line[0][0],
        y = line[1][1] - line[0][1];
      return Math.sqrt(x * x + y * y);
    }

    // Calculates the midpoint of a line segment.
    function lineMidpoint(line) {
      return [(line[0][0] + line[1][0]) / 2, (line[0][1] + line[1][1]) / 2];
    }

    // Converts degrees to radians.
    function angleToRadians(angle) {
      return angle / 180 * Math.PI;
    }

    function pointAdd(left, right) {
      return [left[0] + right[0], left[1] + right[1]];
    }

    function pointEquals(left, right) {
      return left[0] === right[0] && left[1] === right[1];
    }
    function pointEqualsZero(point) {
      return point[0] === 0 && point[1] === 0;
    }

    function pointSubtract(left, right) {
      return [left[0] - right[0], left[1] - right[1]];
    }

    /** Rotates a point by an angle in degrees around an origin. */
    function pointRotate(point, angle, origin) {
      var radians = angleToRadians(angle || 0);
      if (!origin || pointEqualsZero(origin)) {
        return rotate(point, radians);
      } else {
        // See: https://math.stackexchange.com/questions/1964905/rotation-around-non-zero-point
        var p0 = pointSubtract(point, origin);
        var rotated = rotate(p0, radians);
        return pointAdd(rotated, origin);
      }
    }
    function rotate(point, radians) {
      // See: https://en.wikipedia.org/wiki/Cartesian_coordinate_system#Rotation
      return [point[0] * Math.cos(radians) - point[1] * Math.sin(radians), point[0] * Math.sin(radians) + point[1] * Math.cos(radians)];
    }

    /**
     * Returns the coordinates resulting from rotating a line about an origin by an angle in degrees.
     * If origin is not specified, the origin defaults to the midpoint of the line.
     */
    function lineRotate(line, angle, origin) {
      if (!origin) origin = lineMidpoint(line);
      return [pointRotate(line[0], angle, origin), pointRotate(line[1], angle, origin)];
    }

    /** Translates a point by an angle in degrees and distance */
    function pointTranslate(point) {
      var angle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var distance = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var r = angleToRadians(angle);
      return [point[0] + distance * Math.cos(r), point[1] + distance * Math.sin(r)];
    }

    /** Returns the coordinates resulting from translating a line by an angle in degrees and a distance. */
    function lineTranslate(line, angle, distance) {
      return [pointTranslate(line[0], angle, distance), pointTranslate(line[1], angle, distance)];
    }

    function pointClone(point) {
      return [point[0], point[1]];
    }

    /** Tests whether a polygon is closed */
    function isClosed(polygon) {
      return pointEquals(polygon[0], polygon[polygon.length - 1]);
    }

    var _marked = /*#__PURE__*/regeneratorRuntime.mark(iteratePolygonSegments);
    function iteratePolygonSegments(polygon) {
      var close$$1,
        i,
        _args = arguments;
      return regeneratorRuntime.wrap(function iteratePolygonSegments$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              close$$1 = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              i = 0;
            case 2:
              if (!(i < polygon.length - 1)) {
                _context.next = 8;
                break;
              }
              _context.next = 5;
              return [polygon[i], polygon[i + 1]];
            case 5:
              i++;
              _context.next = 2;
              break;
            case 8:
              if (!(close$$1 && !isClosed(polygon))) {
                _context.next = 11;
                break;
              }
              _context.next = 11;
              return [polygon[polygon.length - 1], polygon[0]];
            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, _marked);
    }

    /** Calculates the area of a polygon. */
    function polygonArea(vertices) {
      var signed = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var a = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(vertices, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            v0 = _step$value[0],
            v1 = _step$value[1];
          a += v0[0] * v1[1];
          a -= v1[0] * v0[1];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return signed ? a / 2 : Math.abs(a / 2);
    }

    /** Calculates the bounds of a polygon. */
    function polygonBounds(polygon) {
      if (polygon.length < 3) {
        return null;
      }
      var xMin = Infinity,
        xMax = -Infinity,
        yMin = Infinity,
        yMax = -Infinity,
        found = false;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = polygon[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            x = _step$value[0],
            y = _step$value[1];
          if (x != null && isFinite(x) && y != null && isFinite(y)) {
            found = true;
            if (x < xMin) xMin = x;
            if (x > xMax) xMax = x;
            if (y < yMin) yMin = y;
            if (y > yMax) yMax = y;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return found ? [[xMin, yMin], [xMax, yMax]] : null;
    }

    /** Calculates the weighted centroid a polygon. */
    function polygonCentroid(vertices) {
      var a = 0;
      var x = 0;
      var y = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(vertices, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            v0 = _step$value[0],
            v1 = _step$value[1];
          var f = v0[0] * v1[1] - v1[0] * v0[1];
          a += f;
          x += (v0[0] + v1[0]) * f;
          y += (v0[1] + v1[1]) * f;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      var d = a * 3;
      return [x / d, y / d];
    }

    var _marked$1 = /*#__PURE__*/regeneratorRuntime.mark(iterateReverse);
    function iterateReverse(list) {
      var i;
      return regeneratorRuntime.wrap(function iterateReverse$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              i = list.length - 1;
            case 1:
              if (!(i >= 0)) {
                _context.next = 7;
                break;
              }
              _context.next = 4;
              return list[i];
            case 4:
              i--;
              _context.next = 1;
              break;
            case 7:
            case "end":
              return _context.stop();
          }
        }
      }, _marked$1);
    }

    // See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
    // and https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
    function cross(a, b, o) {
      return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
    }

    /**
     * Calculates the convex hull of a set of points.
     *
     * See https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain#JavaScript
     */
    function polygonHull(points) {
      if (points.length < 3) return null;
      var pointsCopy = points.slice().sort(function (a, b) {
        return a[0] === b[0] ? a[1] - b[1] : a[0] - b[0];
      });
      var lower = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = pointsCopy[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var point = _step.value;
          while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], point) <= 0) {
            lower.pop();
          }
          lower.push(pointClone(point));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      var upper = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;
      try {
        for (var _iterator2 = iterateReverse(pointsCopy)[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _point = _step2.value;
          while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], _point) <= 0) {
            upper.pop();
          }
          upper.push(pointClone(_point));
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
      upper.pop();
      lower.pop();
      return [].concat(lower, upper);
    }

    /** Calculates the length of a polygon's perimeter. */
    function polygonLength(vertices) {
      var close = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      if (vertices.length === 0) return 0;
      var perimeter = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(vertices, close)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var segment = _step.value;
          perimeter += lineLength(segment);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return perimeter;
    }

    function polygonInterpolate(polygon) {
      return function (t) {
        if (t <= 0) return pointClone(polygon[0]);
        var effectiveListLength = isClosed(polygon) ? polygon.length : polygon.length + 1;
        if (t >= 1) return pointClone(polygon[0]);
        var target = polygonLength(polygon, true) * t;
        var point = [0, 0];
        var track = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;
        try {
          for (var _iterator = iteratePolygonSegments(polygon, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var side = _step.value;
            var length = lineLength(side);
            var angle = lineAngle(side);
            var delta = target - (track += length);
            if (delta < 0) return pointTranslate(side[0], angle, length + delta);
            point = pointTranslate(side[0], angle, delta);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
        return point;
      };
    }

    /** Calculates the arithmetic mean of a polygon's vertices. */
    function polygonMean(vertices) {
      var x = 0,
        y = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = vertices[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;
          x += v[0];
          y += v[1];
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return [x / vertices.length, y / vertices.length];
    }

    // Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
    // The returned polygon's area is equal to the input polygon's area multiplied by the scaleFactor.
    // The origin defaults to the polygon's centroid.
    function polygonScaleArea(polygon, scale, origin) {
      if (!origin) origin = polygonCentroid(polygon);
      return polygon.map(function (v) {
        var d = lineLength([origin, v]);
        var a = lineAngle([origin, v]);
        return pointTranslate(origin, a, d * Math.sqrt(scale));
      });
    }

    /** Translates a polygon by an angle in degrees and distance. */
    function polygonTranslate(polygon, angle, distance) {
      return polygon.map(function (point) {
        return pointTranslate(point, angle, distance);
      });
    }

    // Returns a random polygon according to the specific number of sides, area, and centroid.
    // Based on an algorithm by Pavel Valtr and an implementation by Maneesh Agrawala: https://observablehq.com/@magrawala/random-convex-polygon
    function polygonRandom() {
      var sides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var area = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var centroid = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [0, 0];
      var r = Math.sqrt(area / Math.PI),
        xs = Array.from({
          length: sides
        }, function () {
          return 2 * r * Math.random();
        }),
        ys = Array.from({
          length: sides
        }, function () {
          return 2 * r * Math.random();
        });
      xs.sort(function (a, b) {
        return a - b;
      });
      ys.sort(function (a, b) {
        return a - b;
      });
      var vecXS = chain(xs, xs[0], xs[xs.length - 1]),
        vecYS = chain(ys, ys[0], ys[ys.length - 1]);
      shuffle(vecYS);
      //Make polygon coordinates from the vecs by laying them out end to end
      var polygon = [];
      var x = 0,
        y = 0;
      // Zip the vector arrays together
      // Then, sort the vectors by angle, in a counter clockwise fashion. 
      // a and b are tuples representing vectors. Compute angle for each vector and compare them.
      var vecs = vecXS.map(function (d, i) {
        return [d, vecYS[i]];
      }).sort(function (a, b) {
        return Math.atan2(b[1], b[0]) - Math.atan2(a[1], a[0]);
      }).forEach(function (vec) {
        x += vec[0] * 1;
        y += vec[1] * 1;
        polygon.push([x, y]);
      });
      // Scale and translate
      var c = polygonCentroid(polygon);
      return polygonTranslate(polygonScaleArea(polygon, area / polygonArea(polygon)), lineAngle([c, centroid]), lineLength([c, centroid]));
    }
    function chain(values, min, max) {
      var lastMin = min,
        lastMax = min;
      var output = [];
      for (var i = 1; i < values.length - 1; i++) {
        var val = values[i];
        if (Math.random() > 0.5) {
          output.push(val - lastMin);
          lastMin = val;
        } else {
          output.push(lastMax - val);
          lastMax = val;
        }
      }
      output.push(max - lastMin);
      output.push(lastMax - max);
      return output;
    }
    function shuffle(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var _ref = [array[j], array[i]];
        array[i] = _ref[0];
        array[j] = _ref[1];
      }
    }

    function polygonReflectX(polygon) {
      var reflectFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _polygonBounds = polygonBounds(polygon),
        _polygonBounds2 = _slicedToArray(_polygonBounds, 2),
        _polygonBounds2$ = _slicedToArray(_polygonBounds2[0], 2),
        min = _polygonBounds2$[0],
        _ = _polygonBounds2$[1],
        _polygonBounds2$2 = _slicedToArray(_polygonBounds2[1], 2),
        max = _polygonBounds2$2[0],
        __ = _polygonBounds2$2[1];
      return polygon.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          x = _ref2[0],
          y = _ref2[1];
        var r = [min + max - x, y];
        if (reflectFactor === 0) {
          return [x, y];
        } else if (reflectFactor === 1) {
          return r;
        } else {
          var t = lineInterpolate([[x, y], r]);
          return t(Math.max(Math.min(reflectFactor, 1), 0));
        }
      });
    }

    function polygonReflectY(polygon) {
      var reflectFactor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var _polygonBounds = polygonBounds(polygon),
        _polygonBounds2 = _slicedToArray(_polygonBounds, 2),
        _polygonBounds2$ = _slicedToArray(_polygonBounds2[0], 2),
        _ = _polygonBounds2$[0],
        min = _polygonBounds2$[1],
        _polygonBounds2$2 = _slicedToArray(_polygonBounds2[1], 2),
        __ = _polygonBounds2$2[0],
        max = _polygonBounds2$2[1];
      return polygon.map(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          x = _ref2[0],
          y = _ref2[1];
        var r = [x, min + max - y];
        if (reflectFactor === 0) {
          return [x, y];
        } else if (reflectFactor === 1) {
          return r;
        } else {
          var t = lineInterpolate([[x, y], r]);
          return t(Math.max(Math.min(reflectFactor, 1), 0));
        }
      });
    }

    /** Returns the vertices of a regular polygon of the specified number of sides, area, and center coordinates. */
    function polygonRegular() {
      var sides = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;
      var area = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 100;
      var center = arguments.length > 2 ? arguments[2] : undefined;
      var polygon = [],
        point = [0, 0],
        sum = [0, 0],
        angle = 0;
      for (var i = 0; i < sides; i++) {
        polygon[i] = point;
        sum[0] += point[0];
        sum[1] += point[1];
        // See: https://web.archive.org/web/20180404142713/http://keisan.casio.com/exec/system/1355985985
        point = pointTranslate(point, angle, Math.sqrt(4 * area * Math.tan(Math.PI / sides) / sides));
        angle -= 360 / sides;
      }
      if (center) {
        var line = [[sum[0] / sides, sum[1] / sides], center];
        polygon = polygonTranslate(polygon, lineAngle(line), lineLength(line));
      }
      return polygon;
    }

    /** Rotates a polygon by an angle in degrees around an origin. */
    function polygonRotate(polygon, angle, origin) {
      return polygon.map(function (point) {
        return pointRotate(point, angle, origin);
      });
    }

    /**
     * Scales a polygon by a scale factor (where 1 is the original size) from an origin point.
     *
     * The returned polygon's area is equal to the input polygon's area multiplied by the square of the scaleFactor.
     * @param origin The origin defaults to the polygon's centroid.
     */
    function polygonScale(polygon, scale, origin) {
      if (!origin) origin = polygonCentroid(polygon);
      return polygon.map(function (v) {
        var d = lineLength([origin, v]),
          a = lineAngle([origin, v]);
        return pointTranslate(origin, a, d * scale);
      });
    }

    /**
     * Scales a polygon's x-coordinates by a scale factor (where 1 is the original size) from an origin point.
     *
     * The origin defaults to the polygon's centroid.
     */
    function polygonScaleX(polygon, scale, origin) {
      if (!origin) origin = polygonCentroid(polygon);
      return polygon.map(function (v) {
        var d = lineLength([origin, v]);
        var a = lineAngle([origin, v]);
        var t = pointTranslate(origin, a, d * scale);
        return [t[0], v[1]];
      });
    }

    /**
     * Scales a polygon's y-coordinates by a scale factor (where 1 is the original size) from an origin point.
     * @param origin The origin defaults to the polygon's centroid.
     */
    function polygonScaleY(polygon, scale, origin) {
      if (!origin) origin = polygonCentroid(polygon);
      return polygon.map(function (v) {
        var d = lineLength([origin, v]);
        var a = lineAngle([origin, v]);
        var t = pointTranslate(origin, a, d * scale);
        return [v[0], t[1]];
      });
    }

    function polygonClone(polygon) {
      return polygon.map(pointClone);
    }

    // Returns a polygon in the specified winding order.
    // If order is passed as a strings of "cw" or "clockwise", returns a polygon with a clockwise winding order.
    // Otherwise, returns a polygon with a counter-clockwise winding order.
    // Always returns a copy.
    function polygonWind(polygon) {
      var order = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'ccw';
      var isClockwise = polygonArea(polygon, true) > 0;
      var copy = polygonClone(polygon);
      if (order === "cw" || order === "clockwise") {
        return isClockwise ? copy : copy.reverse();
      } else {
        return isClockwise ? copy.reverse() : copy;
      }
    }

    // See https://math.stackexchange.com/questions/274712/calculate-on-which-side-of-a-straight-line-is-a-given-point-located
    function topPointFirst(line) {
      return line[1][1] > line[0][1] ? line : [line[1], line[0]];
    }
    function pointLeftofLine(point, line) {
      var t = topPointFirst(line);
      return cross(point, t[1], t[0]) < 0;
    }
    function pointRightofLine(point, line) {
      var t = topPointFirst(line);
      return cross(point, t[1], t[0]) > 0;
    }
    function pointOnLine(point, line) {
      var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var l = lineLength(line);
      return pointWithLine(point, line, epsilon) && lineLength([line[0], point]) <= l && lineLength([line[1], point]) <= l;
    }
    function pointWithLine(point, line) {
      var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      return Math.abs(cross(point, line[0], line[1])) <= epsilon;
    }

    function lineIntersectsLine(lineA, lineB) {
      var _lineA = _slicedToArray(lineA, 2),
        _lineA$ = _slicedToArray(_lineA[0], 2),
        a0x = _lineA$[0],
        a0y = _lineA$[1],
        _lineA$2 = _slicedToArray(_lineA[1], 2),
        a1x = _lineA$2[0],
        a1y = _lineA$2[1],
        _lineB = _slicedToArray(lineB, 2),
        _lineB$ = _slicedToArray(_lineB[0], 2),
        b0x = _lineB$[0],
        b0y = _lineB$[1],
        _lineB$2 = _slicedToArray(_lineB[1], 2),
        b1x = _lineB$2[0],
        b1y = _lineB$2[1]; // Test for shared points
      if (a0x === b0x && a0y === b0y) return true;
      if (a1x === b1x && a1y === b1y) return true;
      // Test for point on line
      if (pointOnLine(lineA[0], lineB) || pointOnLine(lineA[1], lineB)) return true;
      if (pointOnLine(lineB[0], lineA) || pointOnLine(lineB[1], lineA)) return true;
      var denom = (b1y - b0y) * (a1x - a0x) - (b1x - b0x) * (a1y - a0y);
      if (denom === 0) return false;
      var deltaY = a0y - b0y,
        deltaX = a0x - b0x,
        numer0 = (b1x - b0x) * deltaY - (b1y - b0y) * deltaX,
        numer1 = (a1x - a0x) * deltaY - (a1y - a0y) * deltaX,
        quotA = numer0 / denom,
        quotB = numer1 / denom;
      return quotA > 0 && quotA < 1 && quotB > 0 && quotB < 1;
    }

    function lineIntersectsPolygon(line, polygon) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(polygon, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            v0 = _step$value[0],
            v1 = _step$value[1];
          if (lineIntersectsLine(line, [v0, v1]) || pointOnLine(v0, line) && pointOnLine(v1, line)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return false;
    }

    // Determines whether a point is inside of a polygon, represented as an array of vertices.
    // From https://github.com/substack/point-in-polygon/blob/master/index.js,
    // based on the ray-casting algorithm from https://web.archive.org/web/20180115151705/https://wrf.ecse.rpi.edu//Research/Short_Notes/pnpoly.html
    // Wikipedia: https://en.wikipedia.org/wiki/Point_in_polygon#Ray_casting_algorithm
    function pointInPolygon(point, polygon) {
      var _point = _slicedToArray(point, 2),
        px = _point[0],
        py = _point[1];
      var inside = false;
      // s1x = segment 1 x
      // s1y = segment 1 y
      // s2x = segment 2 x
      // s2y = segment 2 y
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(polygon, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            _step$value$ = _slicedToArray(_step$value[0], 2),
            s1x = _step$value$[0],
            s1y = _step$value$[1],
            _step$value$2 = _slicedToArray(_step$value[1], 2),
            s2x = _step$value$2[0],
            s2y = _step$value$2[1];
          if (s1y > py != s2y > py && px < (s2x - s1x) * (py - s1y) / (s2y - s1y) + s1x) inside = !inside;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return inside;
    }

    /** Determines whether a point is located on one of the edges of a polygon. */
    function pointOnPolygon(point, polygon) {
      var epsilon = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(polygon, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var segment = _step.value;
          if (pointOnLine(point, segment, epsilon)) {
            return true;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return false;
    }

    // Determines whether a polygon is contained by another polygon.
    // Polygons are represented as an array of vertices, each of which is an array of two numbers,
    // where the first number represents its x-coordinate and the second its y-coordinate.
    function polygonInPolygon(polygonA, polygonB) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(polygonA)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var segment = _step.value;
          // Points test  
          if (!pointInPolygon(segment[0], polygonB)) {
            return false;
          }
          // Lines test
          if (lineIntersectsPolygon(segment, polygonB)) {
            return false;
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return true;
    }

    // Determines whether a polygon intersects but is not contained by another polygon.
    // Polygons are represented as an array of vertices, each of which is an array of two numbers,
    // where the first number represents its x-coordinate and the second its y-coordinate.
    function polygonIntersectsPolygon(polygonA, polygonB) {
      var onCount = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;
      try {
        for (var _iterator = iteratePolygonSegments(polygonA, true)[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
            v0 = _step$value[0],
            v1 = _step$value[1];
          if (lineIntersectsPolygon([v0, v1], polygonB)) return true;
          if (pointOnPolygon(v0, polygonB)) ++onCount;
          if (onCount === 2) return true;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      return false;
    }

    // Returns the angle of reflection given an angle of incidence and a surface angle.
    function angleReflect(incidenceAngle, surfaceAngle) {
      return (surfaceAngle * 2 - incidenceAngle % 360 + 360) % 360;
    }

    exports.lineAngle = lineAngle;
    exports.lineInterpolate = lineInterpolate;
    exports.lineLength = lineLength;
    exports.lineMidpoint = lineMidpoint;
    exports.lineRotate = lineRotate;
    exports.lineTranslate = lineTranslate;
    exports.pointRotate = pointRotate;
    exports.pointTranslate = pointTranslate;
    exports.polygonArea = polygonArea;
    exports.polygonBounds = polygonBounds;
    exports.polygonCentroid = polygonCentroid;
    exports.polygonHull = polygonHull;
    exports.polygonInterpolate = polygonInterpolate;
    exports.polygonLength = polygonLength;
    exports.polygonMean = polygonMean;
    exports.polygonRandom = polygonRandom;
    exports.polygonReflectX = polygonReflectX;
    exports.polygonReflectY = polygonReflectY;
    exports.polygonRegular = polygonRegular;
    exports.polygonRotate = polygonRotate;
    exports.polygonScale = polygonScale;
    exports.polygonScaleArea = polygonScaleArea;
    exports.polygonScaleX = polygonScaleX;
    exports.polygonScaleY = polygonScaleY;
    exports.polygonTranslate = polygonTranslate;
    exports.polygonWind = polygonWind;
    exports.lineIntersectsLine = lineIntersectsLine;
    exports.lineIntersectsPolygon = lineIntersectsPolygon;
    exports.pointInPolygon = pointInPolygon;
    exports.pointOnPolygon = pointOnPolygon;
    exports.pointLeftofLine = pointLeftofLine;
    exports.pointRightofLine = pointRightofLine;
    exports.pointOnLine = pointOnLine;
    exports.pointWithLine = pointWithLine;
    exports.polygonInPolygon = polygonInPolygon;
    exports.polygonIntersectsPolygon = polygonIntersectsPolygon;
    exports.angleReflect = angleReflect;
    exports.angleToDegrees = angleToDegrees;
    exports.angleToRadians = angleToRadians;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
