/* global test, expect */

const parseMainSections = require('./parse-main-sections')

test('parse main section', () => {
  const arr = [
    'fileVersion',
    'fadeColor',
    'blocks',
    'art1',
    'art2',
    'art3',
    'art4',
    'art0',
    'art00',
    'bg'
  ]
  const str = arr.join('`')

  expect(parseMainSections(str)).toEqual({
    fileVersion: 'fileVersion',
    fadeColor: 'fadeColor',
    blocks: ['blocks'],
    art1: ['p0.25', 'art1'],
    art2: ['p0.5', 'art2'],
    art3: ['p1', 'art3'],
    art4: ['p1', 'art4'],
    art0: ['p2', 'art0'],
    art00: ['p1', 'art00'],
    bg: 'bg'
  })
})
