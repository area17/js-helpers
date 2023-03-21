const responsiveImageSizes = (sizes, feConfig = {}) => {
    if (!feConfig.structure || !feConfig.structure.columns || !feConfig.structure.container || !feConfig.structure.gutters || !feConfig.structure.gutters.inner) {
      return '100vw';
    }

    // parse CSS type data from config
    const cssColumns = feConfig.structure.columns;
    const cssContainerWidths = feConfig.structure.container;
    const cssInnerGutters = feConfig.structure.gutters.inner;
    //
    let sizesSet = {};
    // size media query prefixes
    const mqPrefixes = {};
    for (const [name, size] of Object.entries(feConfig.structure.breakpoints)) {
        mqPrefixes[name] = size !== '0' ? `(min-width: ${size})` : '';
        sizesSet[name] = null;
    }
    // generate sizes
    if (sizes !== {}) {
        // if a string for sizes is passed through
        if (typeof sizes === 'string') {
            return sizes;
        }
        // if an object of sizes is passed through, convert to an array
        if (typeof sizes === 'object' && !Array.isArray(sizes)) {
            if (sizes['_keys']) {
              delete sizes['_keys']; // JS only fix
            }
            // merge the objects
            sizesSet = Object.assign(sizesSet, sizes);
            // set up to fill in ALL values for ALL bps
            const sizesSetKeys = Object.keys(sizesSet);
            let lastKnownSize;
            let sizesArr = [];
            // fill in any missing BP values
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
              const sizeAtBreakpoint = sizesSet[bp];
              const cssColumnsAtBreakpoint = cssColumns[bp];
              const colWidth = cssContainerWidths[bp] === 'auto' ? 'auto' : parseInt(cssContainerWidths[bp], 10);

              if (typeof sizeAtBreakpoint === 'string' && (sizeAtBreakpoint.indexOf('vw') || sizeAtBreakpoint.indexOf('px') || sizeAtBreakpoint.indexOf('%') || sizeAtBreakpoint.indexOf('rem'))) {
                // if a string containing vw, px or % was passed, use the string
                bpSizeStr = sizeAtBreakpoint;
              } else if (colWidth !== 'auto' && parseInt(sizeAtBreakpoint, 10)) {
                // calculate based on how much of main col width wide
                const innerGutter = parseInt(cssInnerGutters[bp], 10);
                let px = (((colWidth - (innerGutter * (cssColumnsAtBreakpoint - 1))) / cssColumnsAtBreakpoint) * sizeAtBreakpoint) + ((sizeAtBreakpoint - 1) * innerGutter);
                px = px % 1 !== 0 ? px.toFixed(2) : px;
                bpSizeStr = px + 'px';
              } else if (parseInt(sizeAtBreakpoint, 10)) {
                // else calculate one based on %/vw
                let percent = (sizeAtBreakpoint / cssColumnsAtBreakpoint) * 100;
                percent = percent % 1 !== 0 ? percent.toFixed(2) : percent;
                bpSizeStr = percent + 'vw';
              } else {
                bpSizeStr = sizeAtBreakpoint;
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

            sizes = sizesArr;
        }

        // if an array of sizes is passed through
        if (Array.isArray(sizes)) {
            // make final size string for output
            let sizesStr = '';
            sizes.reverse().forEach((item, index) => {
              let bp = Object.keys(item)[0];
              let size = Object.values(item)[0];
              sizesStr += ((index > 0) ? ', ' : '') + mqPrefixes[bp] + ' ' + size;
            });
            return sizesStr;
        }

        return JSON.stringify(sizes);
    }
    return '100vw';
}

export default responsiveImageSizes;
