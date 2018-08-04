import mapboxgl from 'mapbox-gl';
import Map from './Map';

class ImageMap extends Map {
    constructor(settings) {
        super(settings);
    }

    createImageMap(geoData) {
        this.createMap().then((imageMap) => {

            imageMap.addSource('geo', {
                "type": "geojson",
                "data": geoData
            });

            imageMap.addLayer({
                "id": "point",
                "source": "geo",
                "type": "circle",
                "paint": {
                    "circle-radius": 3,
                    "circle-color": {
                        property: "unix",
                        colorSpace: "rgb",
                        type: "exponential",
                        stops: [
                            [1530218767000, "#63a3c1"],
                            [1530876656610, "#0f1f27"]
                        ]
                    }
                }
            });

            // When a click event occurs on a feature in the point layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            imageMap.on('click', 'point', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var date = e.features[0].properties.date.toLocaleString();

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML(date)
                    .addTo(imageMap);
            });

            // Change the cursor to a pointer when the mouse is over the point layer.
            imageMap.on('mouseenter', 'point', function () {
                imageMap.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            imageMap.on('mouseleave', 'point', function () {
                imageMap.getCanvas().style.cursor = '';
            });
        });


    }
}

export default ImageMap;