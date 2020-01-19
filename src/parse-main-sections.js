const safeSplit = require('./safe-split')

/**
 * split up the data block into easier to digest sections
 */
const parseMainSections = (str) => {
  // file version = m3
  const mainSections = str.split('`')
  const [
    fileVersion,
    fadeColor,
    blocks,
    art1,
    art2,
    art3,
    art4,
    art0,
    art00,
    bg
  ] = mainSections

  return {
    fileVersion,
    fadeColor,
    blocks: safeSplit(blocks),
    art1: safeSplit(`p0.25,${art1}`),
    art2: safeSplit(`p0.5,${art2}`),
    art3: safeSplit(`p1,${art3}`),
    art4: safeSplit(`p1,${art4}`),
    art0: safeSplit(`p2,${art0}`), // art 00 [v1, this is art 2?]
    art00: safeSplit(`p1,${art00}`), // [v1, this is art 1]
    bg
  }
}

module.exports = parseMainSections
