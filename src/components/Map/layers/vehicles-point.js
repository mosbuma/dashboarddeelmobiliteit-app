export default {
  'id': 'vehicles-point',
  'type': 'circle',
  'source': 'vehicles',
  'minzoom': 7,
  'paint': {
  // Size circle radius by earthquake magnitude and zoom level
  'circle-radius': [
    'interpolate', ['linear'], ['zoom'],
    12, 1,
    16, ['*', 2, ['get', 'amount']]
  ],
  // Color circle by earthquake magnitude
  // 'circle-color': [
  //   'interpolate',
  //   ['linear'],
  //   ['get', 'mag'],
  //   1,
  //   'rgba(33,102,172,0)',
  //   2,
  //   'rgb(103,169,207)',
  //   3,
  //   'rgb(209,229,240)',
  //   4,
  //   'rgb(253,219,199)',
  //   5,
  //   'rgb(239,138,98)',
  //   6,
  //   'rgb(178,24,43)'
  // ],
  // 'circle-stroke-color': 'white',
  // 'circle-stroke-width': 1,
  // Transition from heatmap to circle layer by zoom level
    'circle-opacity': [
      'interpolate',
      ['linear'],
      ['zoom'],
      7,
      0,
      8,
      1
    ],
    'circle-color': ['get', 'color']
  }
}