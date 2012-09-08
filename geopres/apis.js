//== google ==

function init() {
  var map = new google.maps.Map(
    document.getElementById("map"), {
      zoom: 8,
      center: new google.maps.LatLng(-34.397, 150.644),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
  );
  google.maps.event.addListener(
    map, 'click', function(e) {
      var shape = new google.maps.Marker({
        position: e.latLng
      });
      marker.setMap(map);  
    }
  );
}

//== esri ==

dojo.require("esri.map");
function init() {
  var spatialRef = new esri.SpatialReference({ wkid: 4326 });
  var map = new esri.Map("map");
  map.addLayer(
    new esri.layers.ArcGISTiledMapServiceLayer(
      "http://server.arcgisonline.com/ArcGIS/rest/services/" + 
      "World_Street_Map/MapServer"
    )
  );
  map.centerAndZoom(new esri.geometry.Point(-118.15, 33.80, spatialRef), 10);
  var markerSymbol = new esri.symbol.SimpleMarkerSymbol();
  dojo.connect(
    map, "onClick", function (e) {
      map.graphics.add(
        new esri.Graphic(
          new esri.geometry.Point(
            e.mapPoint.x, e.mapPoint.y,
            spatialRef
          )
        ),
        markerSymbol
      );
    }
  );
}
dojo.addOnLoad(init);

//== ovi ==

ovi.mapsapi.util.ApplicationContext.set({
  appId: "YOUR APPID",
  authenticationToken: "YOUR TOKEN"
});
var map = new ovi.mapsapi.map.Display(
  document.getElementById("map"), {
    components: [
      new ovi.mapsapi.map.component.Behavior()
    ],
    zoomLevel: 10,
    center: [52.51, 13.4],
    eventListener: {
      click: [
        function(e) {
          map.objects.add(
            new ovi.mapsapi.map.StandardMarker(
              map.pixelToGeo(e.displayX, e.displayY)
            )
          );
        }
      ]
    }
  }
);
 
//== bing ==

function init() {
  var map = new VEMap('map');
  map.LoadMap(new VELatLong(47.6, -122.33), 10);
  map.AttachEvent(
    "onclick", function(e) {
      map.AddShape(
        new VEShape(
          VEShapeType.Pushpin,
          map.PixelToLatLong(
            new VEPixel(e.mapX, e.mapY)
          )
        )
      );
    }
  );
}

//== mapquest ==

MQA.EventUtil.observe(
  window, 'load', function() {
    var map = new MQA.TileMap(
      document.getElementById('map'),
      7, { lat:39.743943, lng:-105.020089 }, 'map'
    );
    MQA.EventManager.addListener(
      map, 'click', function(e) {
        map.addShape(
          new MQA.Poi(e.ll)
        );
      }
    ); 
  }
);

//== openlayers ==

function init() {
  var vectorLayer = new OpenLayers.Layer.Vector("VectorLayer");
  var map = new OpenLayers.Map(
    'map', {
      layers: [
        new OpenLayers.Layer.WMS(
          "OpenLayers WMS",
          "http://vmap0.tiles.osgeo.org/wms/vmap0", {
            layers: 'basic'
          }
        ),
        vectorLayer
      ]
    }
  );
  map.setCenter(new OpenLayers.LonLat(-71.147, 42.472), 12);
  OpenLayers.Control.Click = OpenLayers.Class(OpenLayers.Control, {                
    initialize: function(options) {
      OpenLayers.Control.prototype.initialize.apply(
        this, arguments
      ); 
      this.handler = new OpenLayers.Handler.Click(this, {
        click: function(e) {
          var lonlat = map.getLonLatFromViewPortPx(e.xy);
          vectorLayer.addFeatures([
            new OpenLayers.Feature.Vector(
              new OpenLayers.Geometry.Point(lonLat.lon, lonLat.lat)
            )
          ]);
        }
      });
    } 
  });
  map.addControl(new OpenLayers.Control.Click());
}

//== geo ==

$(function() {
  var map = $("#map").geomap({
    center: [ -71.147, 42.472 ],
    zoom: 10,
    click: function(e, geo) {
      map.geomap("append", geo);
    }
  })
});
