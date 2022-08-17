const didFetchSucceed = (response) => response.status >= 200 && response.status <= 299;

export const getFetchOptions = () => {
  return {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    }
  }
}

export const getIsochronesForFootWalking = async (locations) => {
  const url = `https://ors.dashboarddeelmobiliteit.nl/v2/isochrones/foot-walking`;
  const data = {
  "range": [
      60,
      120,
      180,
      300
    ],
    "range_type": "time",
    "locations": [
      locations
    ],
    "intersections": false
  }
  
  // return {"type":"FeatureCollection","bbox":[4.449486,51.904495,4.462794,51.912527],"features":[{"type":"Feature","properties":{"group_index":0,"value":60.0,"center":[4.454881449222819,51.90768356237342]},"geometry":{"coordinates":[[[4.451025,51.908023],[4.4513,51.907986],[4.451575,51.907948],[4.45185,51.907911],[4.452125,51.907873],[4.452401,51.907836],[4.452677,51.907799],[4.452952,51.907762],[4.453228,51.907725],[4.45583,51.907322],[4.456092,51.907356],[4.456142,51.907712],[4.45595,51.907739],[4.455758,51.907766],[4.455757,51.907766],[4.45534,51.907813],[4.454379,51.907933],[4.453552,51.908054],[4.452725,51.908156],[4.452449,51.908193],[4.452174,51.90823],[4.451898,51.908268],[4.451623,51.908305],[4.451348,51.908342],[4.451073,51.90838],[4.451025,51.908023]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":0,"value":120.0,"center":[4.454881449222819,51.90768356237342]},"geometry":{"coordinates":[[[4.451025,51.908023],[4.45466,51.906774],[4.455549,51.906593],[4.456251,51.906633],[4.457443,51.907151],[4.457496,51.907507],[4.457167,51.907956],[4.451348,51.908342],[4.451073,51.90838],[4.451025,51.908023]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":0,"value":180.0,"center":[4.454881449222819,51.90768356237342]},"geometry":{"coordinates":[[[4.451025,51.908023],[4.45441,51.906095],[4.455592,51.905759],[4.457529,51.906457],[4.458408,51.907273],[4.458376,51.907903],[4.458281,51.90825],[4.452449,51.908193],[4.452174,51.90823],[4.452174,51.90823],[4.451898,51.908268],[4.451663,51.9083],[4.451623,51.908305],[4.451348,51.908342],[4.451151,51.908369],[4.451073,51.90838],[4.451025,51.908023]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":0,"value":300.0,"center":[4.454881449222819,51.90768356237342]},"geometry":{"coordinates":[[[4.449486,51.908055],[4.449503,51.907922],[4.450348,51.907186],[4.454241,51.904793],[4.456447,51.904495],[4.458532,51.905554],[4.459956,51.906743],[4.460163,51.907046],[4.460504,51.90789],[4.460594,51.908239],[4.460482,51.908495],[4.458122,51.909144],[4.452449,51.908193],[4.452174,51.90823],[4.452174,51.90823],[4.451898,51.908268],[4.451663,51.9083],[4.451623,51.908305],[4.451348,51.908342],[4.451151,51.908369],[4.451073,51.90838],[4.449877,51.908534],[4.449727,51.9085],[4.449486,51.908055]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":1,"value":60.0,"center":[4.457657694974035,51.909007387888565]},"geometry":{"coordinates":[[[4.456354,51.908846],[4.456447,51.908498],[4.457898,51.908834],[4.45897,51.909176],[4.458874,51.909523],[4.457821,51.90966],[4.457525,51.909684],[4.457352,51.909699],[4.456354,51.908846]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":1,"value":120.0,"center":[4.457657694974035,51.909007387888565]},"geometry":{"coordinates":[[[4.455364,51.90846],[4.455692,51.908414],[4.458372,51.908144],[4.458669,51.908348],[4.45987,51.909589],[4.459638,51.909865],[4.45874,51.910227],[4.457616,51.910358],[4.456709,51.910277],[4.456386,51.910117],[4.455413,51.908816],[4.455364,51.90846]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":1,"value":180.0,"center":[4.457657694974035,51.909007387888565]},"geometry":{"coordinates":[[[4.453906,51.908652],[4.458837,51.907456],[4.459138,51.907653],[4.460528,51.910026],[4.460513,51.910301],[4.460231,51.910548],[4.460223,51.910552],[4.456283,51.911319],[4.456146,51.91133],[4.455822,51.911174],[4.453951,51.909009],[4.453906,51.908652]]],"type":"Polygon"}},{"type":"Feature","properties":{"group_index":1,"value":300.0,"center":[4.457657694974035,51.909007387888565]},"geometry":{"coordinates":[[[4.451587,51.909041],[4.451695,51.908949],[4.455784,51.907399],[4.457568,51.90655],[4.458114,51.906406],[4.459655,51.906067],[4.45997,51.906103],[4.460263,51.906312],[4.462724,51.909343],[4.462794,51.909696],[4.462436,51.91103],[4.462336,51.911376],[4.460732,51.911941],[4.456541,51.912527],[4.455595,51.912424],[4.451635,51.909398],[4.451587,51.909041]]],"type":"Polygon"}}],"metadata":{"service":"isochrones","timestamp":1655891883314,"query":{"profile":"foot-walking","isoMaps":{"isochroneMaps":[{"travellerId":0,"envelope":{"area":5.164020899112029E-5,"width":0.011107855700144498,"height":0.004648980900107347,"minX":4.449486388880505,"maxX":4.4605942445806495,"minY":51.904494662456365,"maxY":51.90914364335647,"null":false},"isochrones":[{"geometry":{"type":"Polygon","coordinates":[[[4.451024578348936,51.90802322409213],[4.4510731140385635,51.90837993726379],[4.45134827329938,51.90834249809545],[4.451623432560204,51.90830505892712],[4.451898480826999,51.90826763482586],[4.452173529272039,51.90823021063024],[4.452449200760288,51.90819305085868],[4.4527248722485355,51.90815589108712],[4.453552029537955,51.90805447232304],[4.454378901178023,51.907932932457776],[4.455339777840488,51.90781292043333],[4.455756726235057,51.907766321112014],[4.455758479949447,51.90776608312923],[4.45595010222558,51.90773911954855],[4.4561417245017125,51.907712155967864],[4.456091562300367,51.90735566788454],[4.45583038162552,51.90732243462014],[4.45322812315502,51.90772479829276],[4.452952451666766,51.90776195806432],[4.4526767801785185,51.90779911783588],[4.452401108690271,51.90783627760744],[4.452125437202024,51.907873437378996],[4.451850167125424,51.90791089152005],[4.451574896870577,51.907948345755464],[4.45129973760976,51.907985784923795],[4.451024578348936,51.90802322409213]]]},"value":60.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":5.411395584489144E-6,"width":0.005117146152776364,"height":0.0010575026436470125,"minX":4.451024578348936,"maxX":4.4561417245017125,"minY":51.90732243462014,"maxY":51.90837993726379,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.451024578348936,51.90802322409213],[4.45466039708478,51.90677388136266],[4.455548847053877,51.90659285955982],[4.456250865728116,51.90663333680119],[4.457443477167508,51.907151074360016],[4.457496390663191,51.90750716446375],[4.4571668644116755,51.90795615965217],[4.45134827329938,51.90834249809545],[4.4510731140385635,51.90837993726379],[4.451024578348936,51.90802322409213]]]},"value":120.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":1.156563149105754E-5,"width":0.0064718123142544215,"height":0.0017870777039661334,"minX":4.451024578348936,"maxX":4.457496390663191,"minY":51.90659285955982,"maxY":51.90837993726379,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.451024578348936,51.90802322409213],[4.4510731140385635,51.90837993726379],[4.451151443765672,51.90836927943664],[4.45134827329938,51.90834249809545],[4.451623432560204,51.90830505892712],[4.451662597423758,51.908299730013546],[4.451898480826999,51.90826763482586],[4.452173529272039,51.90823021063024],[4.452173751081845,51.908230180590444],[4.452449200760288,51.90819305085868],[4.458280800408811,51.908249685280445],[4.458376377727125,51.90790260463243],[4.458407538868815,51.907273412681114],[4.4575292825596335,51.906456929455544],[4.455592151354418,51.905759362630626],[4.454409757105547,51.90609533651042],[4.451024578348936,51.90802322409213]]]},"value":180.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":1.9347599056035178E-5,"width":0.007382960519878523,"height":0.0026205746331626756,"minX":4.451024578348936,"maxX":4.458407538868815,"minY":51.905759362630626,"maxY":51.90837993726379,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.449486388880505,51.90805545260402],[4.44972690997513,51.9084996477479],[4.44987654407368,51.90853401470138],[4.4510731140385635,51.90837993726379],[4.451151443765672,51.90836927943664],[4.45134827329938,51.90834249809545],[4.451623432560204,51.90830505892712],[4.451662597423758,51.908299730013546],[4.451898480826999,51.90826763482586],[4.452173529272039,51.90823021063024],[4.452173751081845,51.908230180590444],[4.452449200760288,51.90819305085868],[4.4581217354999145,51.90914364335647],[4.460481820492229,51.908495398212175],[4.4605942445806495,51.90823895122349],[4.460504252553331,51.90789038066389],[4.460163184773538,51.90704595250287],[4.459955673495416,51.9067434442896],[4.45853238113952,51.90555400903167],[4.456446645479353,51.904494662456365],[4.454240541994777,51.90479252527215],[4.450347877103292,51.90718637057438],[4.449502721220496,51.90792239313828],[4.449486388880505,51.90805545260402]]]},"value":300.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":5.164020899112029E-5,"width":0.011107855700144498,"height":0.004648980900107347,"minX":4.449486388880505,"maxX":4.4605942445806495,"minY":51.904494662456365,"maxY":51.90914364335647,"null":false},"attributes":null}],"center":{"x":4.454881449222819,"y":51.90768356237342,"z":"NaN"},"graphDate":"2022-06-14T20:18:08Z","isochronesCount":4,"empty":false},{"travellerId":1,"envelope":{"area":7.239853397805125E-5,"width":0.0112065060695965,"height":0.006460401977960828,"minX":4.451587182316174,"maxX":4.46279368838577,"minY":51.90606673809473,"maxY":51.91252714007269,"null":false},"isochrones":[{"geometry":{"type":"Polygon","coordinates":[[[4.456354409041377,51.908845767690195],[4.457352054273623,51.90969864152739],[4.457525333663606,51.90968350722293],[4.457820697995262,51.90965968070085],[4.458873709718202,51.90952286042797],[4.458969734825414,51.90917590340068],[4.457897523423166,51.90883433749223],[4.456446830567983,51.90849783341275],[4.456354409041377,51.908845767690195]]]},"value":60.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":3.1405044238960316E-6,"width":0.0026153257840366706,"height":0.0012008081146390737,"minX":4.456354409041377,"maxX":4.458969734825414,"minY":51.90849783341275,"maxY":51.90969864152739,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.455364181864932,51.908459547278916],[4.455413238370791,51.90881618919911],[4.456386496273151,51.91011714567111],[4.4567089060703715,51.910277307847224],[4.457616046433412,51.910357919397605],[4.458739964297422,51.91022745097121],[4.459638361527551,51.90986461218726],[4.459869772426208,51.90958884236298],[4.458668560516022,51.90834838359582],[4.458371920039562,51.90814441196122],[4.455692293053645,51.90841441520795],[4.455364181864932,51.908459547278916]]]},"value":120.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":9.973158212699902E-6,"width":0.004505590561275419,"height":0.002213507436387374,"minX":4.455364181864932,"maxX":4.459869772426208,"minY":51.90814441196122,"maxY":51.910357919397605,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.453906417520012,51.90865198239801],[4.453950774441259,51.909009239257344],[4.455821612639335,51.91117420362743],[4.456146378969219,51.9113295317671],[4.456282666145698,51.911318547367785],[4.460222750617584,51.910552008150425],[4.460230592961796,51.91054761697481],[4.46051342493939,51.910300951329795],[4.460528117054156,51.91002553419867],[4.459137619540246,51.90765345066127],[4.458836779171311,51.90745572592225],[4.453906417520012,51.90865198239801]]]},"value":180.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":2.5651178358234813E-5,"width":0.006621699534143488,"height":0.0038738058448544166,"minX":4.453906417520012,"maxX":4.460528117054156,"minY":51.90745572592225,"maxY":51.9113295317671,"null":false},"attributes":null},{"geometry":{"type":"Polygon","coordinates":[[[4.451587182316174,51.90904135066165],[4.451695358465443,51.90894913772867],[4.455783833556688,51.907398969054825],[4.457568129162082,51.90654958417742],[4.458114079606357,51.90640603957916],[4.459654778944662,51.90606673809473],[4.459970184446295,51.906103168246936],[4.460263264691063,51.90631222319217],[4.4627241622189215,51.9093429189493],[4.46279368838577,51.90969614141762],[4.46243649823668,51.91103023804289],[4.462336493473349,51.91137606899482],[4.460731570113792,51.91194131714611],[4.456540740756158,51.91252714007269],[4.455595176804303,51.91242382861165],[4.451635230275035,51.909398129856186],[4.451587182316174,51.90904135066165]]]},"value":300.0,"area":0.0,"reachfactor":0.0,"envelope":{"area":7.239853397805125E-5,"width":0.0112065060695965,"height":0.006460401977960828,"minX":4.451587182316174,"maxX":4.46279368838577,"minY":51.90606673809473,"maxY":51.91252714007269,"null":false},"attributes":null}],"center":{"x":4.457657694974035,"y":51.909007387888565,"z":"NaN"},"graphDate":"2022-06-14T20:18:08Z","isochronesCount":4,"empty":false}],"isochronesCount":8},"isochroneRequest":{"id":null,"travellers":[{"id":"0","location":{"x":4.454877,"y":51.907671,"z":"NaN"},"locationType":"start","ranges":[60.0,120.0,180.0,300.0],"rangeType":"TIME","routeSearchParameters":{"profileType":20,"weightingMethod":1,"considerTurnRestrictions":false,"avoidAreas":null,"vehicleType":0,"bearings":null,"flexibleMode":false,"optimized":true,"extraInfo":0,"suppressWarnings":false,"avoidCountries":null,"avoidBorders":"NONE","alternativeRoutesCount":-1,"alternativeRoutesWeightFactor":1.4,"alternativeRoutesShareFactor":0.6,"roundTripLength":-1.0,"roundTripPoints":2,"roundTripSeed":-1,"maximumSpeed":0.0,"options":null,"departure":null,"arrival":null,"avoidFeatureTypes":0,"maximumRadiuses":null,"profileParameters":null,"profileTypeDriving":false,"profileTypeHeavyVehicle":false,"timeDependent":false},"maximumRange":300.0},{"id":"1","location":{"x":4.457664232125704,"y":51.90899808235536,"z":"NaN"},"locationType":"start","ranges":[60.0,120.0,180.0,300.0],"rangeType":"TIME","routeSearchParameters":{"profileType":20,"weightingMethod":1,"considerTurnRestrictions":false,"avoidAreas":null,"vehicleType":0,"bearings":null,"flexibleMode":false,"optimized":true,"extraInfo":0,"suppressWarnings":false,"avoidCountries":null,"avoidBorders":"NONE","alternativeRoutesCount":-1,"alternativeRoutesWeightFactor":1.4,"alternativeRoutesShareFactor":0.6,"roundTripLength":-1.0,"roundTripPoints":2,"roundTripSeed":-1,"maximumSpeed":0.0,"options":null,"departure":null,"arrival":null,"avoidFeatureTypes":0,"maximumRadiuses":null,"profileParameters":null,"profileTypeDriving":false,"profileTypeHeavyVehicle":false,"timeDependent":false},"maximumRange":300.0}],"calcMethod":"fastisochrone","units":null,"areaUnits":null,"includeIntersections":false,"attributes":null,"locations":[{"x":4.454877,"y":51.907671,"z":"NaN"},{"x":4.457664232125704,"y":51.90899808235536,"z":"NaN"}],"profilesForAllTravellers":["foot-walking"],"weightingsForAllTravellers":["fastest"],"valid":true},"locations":[[4.454877,51.907671],[4.457664232125704,51.90899808235536]],"range":[60.0,120.0,180.0,300.0],"range_type":"time"},"engine":{"version":"6.7.0","build_date":"2022-06-14T19:30:42Z","graph_date":"2022-06-14T20:18:08Z"}}};

  try {
    const response = await fetch(url, Object.assign({}, getFetchOptions(), {
      method: 'POST',
      body: JSON.stringify(data)
    }));
    if (! didFetchSucceed(response)) {
      console.log('Failed to get what I want, got status: ' + response.status);
      return;
    }
    return await response.json();
  } catch (e) {
    console.log('A network error!', e);
    return "network error";
  }
}
