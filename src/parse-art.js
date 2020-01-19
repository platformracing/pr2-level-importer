const parseLine = require('./parse-line')
const parseStamp = require('./parse-stamp')

/**
 * Converts pr2's line drawings into a Tiled object layer
 */
const parseArt = (artArr = []) => {
  let color = '000000'
  let mode = 'draw'
  let thickness = 1
  let parallax = 1
  const objects = []

  artArr.forEach(command => {
    const type = command.substr(0, 1)
    const content = command.substr(1)
    if (type === 'c') {
      color = content
    } else if (type === 't') {
      thickness = Number(content)
    } else if (type === 'd') {
      objects.push(parseLine(content, color, thickness, mode))
    } else if (type === 'm') {
      mode = content
    } else if (type === 'p') {
      parallax = Number(content)
    } else {
      objects.push(parseStamp(command))
    }
  })

  return {
    draworder: 'topdown',
    name: 'artlayer',
    objects,
    offsetx: 0,
    offsety: 0,
    opacity: 1,
    type: 'objectgroup',
    visible: true,
    parallax
  }
}

module.exports = parseArt
