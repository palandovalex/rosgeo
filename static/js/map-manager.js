const olMap = new ol.Map({
    target: 'Map',
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM()
      })
    ],
    view: new ol.View({
      center: [0, 0],
      zoom: 12
    })
});

function olSetPoly(data){
  var formatter  = new ol.format.GeoJSON();
  var feature = formatter.readFeature(data)

  var geometry = feature.getGeometry()

  vectorSource=new ol.source.Vector();
  vectorSource.addFeature(feature)

  view = olMap.getView();
  sourceProj = data.crs.properties.name;
  viewProj = view.getProjection();

  var center = data.properties.center;
  center = ol.proj.transform([center.x,center.y],
    sourceProj,
    viewProj
  );
  geometry.transform(
    sourceProj,
    viewProj
  )

  var vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  olMap.addLayer(vectorLayer);
  view.setCenter(center)
  var extent = geometry.getExtent();
  view.fit(extent);
}


$(document).ready(function() {
form = $('form').submit(function (e) {
    var $form = $(this);
    e.preventDefault();
    var data = $form.serialize();
    $.ajax({
        type: $form.attr('method'),
        url: $form.attr('action'),
        data: data,
        success: olSetPoly
    });});});
