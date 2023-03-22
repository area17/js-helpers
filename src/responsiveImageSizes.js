/*
  * outputs HTML sizes string
  * @param {object, array, string} sizes - size information to convert
  * @param {object} feConfig - front end breakpoint, columns
  * @param {boolean} relativeUnits - convert PX to REM, defaults to true
  * @returns {string} - for image `sizes` attribute
  *
*/
const responsiveImageSizes = (sizes, feConfig = {}, relativeUnits = true) => {
  // Doc: https://github.com/area17/a17-behaviors/wiki/responsiveImageSizes
    if (!feConfig.structure || !feConfig.structure.columns || !feConfig.structure.container || !feConfig.structure.gutters || !feConfig.structure.gutters.inner) {
      return '100vw';
    }

    // remSize - base for rem calcs
    const remSize = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
    const remCalc = (px) => `${ parseFloat(px) / remSize }rem`;
    //
    const getUnitValue = (val) => {
      var result = {};
      if (typeof val === 'number') {
        result.value = val;
      }
      if (typeof val === 'string') {
        if (val.indexOf('calc') > -1) {
          result.calc = val;
        } else {
          result.value = parseFloat(val);
          result.unit = val.substr(('' + result.value).length).trim();
          result.unit = result.unit ? result.unit : null;
        }
      }
      return result;
    };
    // parse CSS type data from config
    const cssColumns = feConfig.structure.columns;
    const cssContainerWidths = feConfig.structure.container;
    const cssInnerGutters = feConfig.structure.gutters.inner;
    // sizesSet is going to be a complete list of breakpoints with null values
    // that we'll later update to fill in size at bp
    let sizesSet = {};
    // size media query prefixes (except the smallest breakpoint)
    const breakpointsArr = Object.entries(feConfig.structure.breakpoints).sort((a, b) => parseFloat(a[1]) - parseFloat(b[1]));
    const mqPrefixes = {};
    breakpointsArr.forEach(bp => {
      let [name, size] = bp;
      mqPrefixes[name] = size !== '0' ? `(min-width: ${relativeUnits ? remCalc(size) : size})` : '';
      sizesSet[name] = null;
    });
    // generate sizes
    if (sizes !== {}) {
        // if a string for sizes is passed through
        if (typeof sizes === 'string') {
            return sizes;
        }
        // if an object of sizes is passed through, convert to an array
        if (typeof sizes === 'object' && !Array.isArray(sizes)) {
            // merge the objects
            sizesSet = Object.assign(sizesSet, sizes);
            // set up to fill in ALL values for ALL bps
            const sizesSetKeys = Object.keys(sizesSet);
            let lastKnownSize;
            let sizesArr = [];
            // fill in any missing BP values
            // if user sends { `lg`: 3 } or { `sm`: 2, `lg`: 3 }
            // this fills out the missing `sm`, `md`, `xl` values
            // incase the amount of columns changes per breakpoint
            // but the column spanning doesn't
            sizesSetKeys.forEach((bp, index) => {
              if (sizesSet[bp] === null) {
                if (index === 0) {
                  sizesSet[bp] = '100vw';
                  lastKnownSize = '100vw';
                } else {
                  sizesSet[bp] = lastKnownSize;
                }
              } else {
                lastKnownSize = sizesSet[bp];
              }

              // calculate size string for bp
              let bpSizeStr = '';
              const sizeAtBreakpoint = getUnitValue(sizesSet[bp]);
              const cssColumnsAtBreakpoint = cssColumns[bp];
              const colWidth = cssContainerWidths[bp] === 'auto' ? 'auto' : parseFloat(cssContainerWidths[bp]);

              if (sizeAtBreakpoint.calc) {
                // if a calc has been passed
                bpSizeStr = sizeAtBreakpoint.calc;
              } else if (typeof sizeAtBreakpoint.value !== 'number') {
                // no number found, perhaps a `calc()` or something else was passed
                bpSizeStr = sizeAtBreakpoint.value || '100vw';
              } else if (sizeAtBreakpoint.unit) {
                // has some other unit
                bpSizeStr = `${sizeAtBreakpoint.value}${sizeAtBreakpoint.unit}`;
                // px values will be converted to rem later
              } else if (colWidth !== 'auto') {
                // calculate based on how much of main col width wide
                const innerGutter = parseFloat(cssInnerGutters[bp]);
                let px = (((colWidth - (innerGutter * (cssColumnsAtBreakpoint - 1))) / cssColumnsAtBreakpoint) * sizeAtBreakpoint.value) + ((sizeAtBreakpoint.value - 1) * innerGutter);
                px = px % 1 !== 0 ? px.toFixed(2) : px;
                bpSizeStr = `${px}px`; // will be converted to rem later
              } else {
                // else calculate one based on %/vw
                let percent = (sizeAtBreakpoint.value / cssColumnsAtBreakpoint) * 100;
                percent = percent % 1 !== 0 ? percent.toFixed(2) : percent;
                bpSizeStr = percent + 'vw';
              }

              sizesSet[bp] = bpSizeStr;
            });

            // don't add sequential duplicate sizes so we have the most minimal output possible
            let lastSize = -1;
            sizesSetKeys.forEach(bp => {
              const size = sizesSet[bp];
              if (size !== lastSize) {
                sizesArr.push({
                  [`${bp}`]: size
                });
              }
              lastSize = size;
            });

            // set sizes to the newly made sizes array, so that it can be converted to a string for output below
            sizes = sizesArr;
        }

        // convert array to string and return
        // NB: if an object was passed, its been converted to an array for final output
        if (Array.isArray(sizes)) {
            // make final size string for output
            let sizesStr = '';
            sizes.reverse().forEach((item, index) => {
              let bp = Object.keys(item)[0];
              let size = Object.values(item)[0];
              if (relativeUnits && getUnitValue(size).unit === 'px') {
                size = remCalc(size);
              }
              sizesStr += index > 0 ? ', ' : '';
              sizesStr += mqPrefixes[bp].length ? mqPrefixes[bp] + ' ' : '';
              sizesStr += size;
            });
            return sizesStr;
        }

        // catch other entries and do something sensible
        return JSON.stringify(sizes);
    }
    return '100vw';
}

export default responsiveImageSizes;
