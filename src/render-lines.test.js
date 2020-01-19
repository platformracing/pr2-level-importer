/* global test, expect, jest, afterEach */

const renderLines = require('./render-lines')
const { createCanvas } = require('canvas')
const stashFile = require('./stash-file')
const { renderSize } = require('./settings')
const compressImage = require('./compress-image')
const toHash = require('./to-hash')

jest.mock('./stash-file')

afterEach(() => {
  stashFile.lastCallParams = undefined
})

test('render a line, and save the image', async () => {
  // known good
  const levelId = 123
  const canvas = createCanvas(renderSize, renderSize)
  const ctx = canvas.getContext('2d')
  ctx.strokeStyle = '#947325'
  ctx.lineWidth = 10
  ctx.beginPath()
  ctx.moveTo(5, 5)
  ctx.lineTo(205, 105)
  ctx.lineTo(20, 155)
  ctx.stroke()
  const image = canvas.toBuffer('image/png')
  const compressedImage = await compressImage(image)
  const imageHash = toHash(image)

  // hopefuly good
  const lines = [{
    x: 5,
    y: 5,
    properties: { color: '947325', thickness: 10 },
    polyline: [
      { x: 200, y: 100 },
      { x: 15, y: 150 }
    ]
  }]
  const imageMatadataList = await renderLines(levelId, lines)

  // compare the two
  expect(imageMatadataList).toEqual([{
    key: `${imageHash}.webp`,
    x: 0,
    y: 0,
    width: renderSize,
    height: renderSize
  }])
  expect(stashFile.lastCallParams).toEqual({
    buffer: compressedImage,
    key: `pr2/levels/123/${imageHash}.webp`
  })
})

test('do not save a blank image', async () => {
  const levelId = 456
  // line with 0 alpha
  const lines = [{
    x: 5,
    y: 5,
    properties: { color: '94732500', thickness: 10 },
    polyline: [
      { x: 5, y: 100 },
      { x: 5, y: 100 }
    ]
  }]
  await renderLines(levelId, lines)
  expect(stashFile.lastCallParams).toEqual(undefined)
})
