import React from 'react';
import Store from '../basic/mavStore';
import Data from '../basic/data';

function getParam() {
    var paramStr = location.search.replace(/^\?/, '');
    var paramArr = paramStr.split('&');
    var paramObj = {}
    for (var i in paramArr) {
        var params = paramArr[i].split('=');
        if (!params[0]) continue
        paramObj[params[0]] = params[1];
    }
    return paramObj;
}

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.layers = window.layers = {}
        this.state = {
            activeLayers: null
        }
    }

    componentDidMount() {
        var self = this;
        var map = this.map = new BMap.Map("map");
        var centerAndZoom = getParam();
        var zoom = centerAndZoom.zoom || 5;
        var center = '中国';
        if (centerAndZoom.center) {
            var _center = centerAndZoom.center.split(',');
            if (_center.length > 1) {
                center = BMap.Point(_center[0], _center[1])
            } else {
                center = _center[0]
            }
        };
        map.centerAndZoom(center, zoom);
        map.setMapStyle({
            style: 'midnight'
        });

        Store.on(function (data) {
            if (data.type == 'layerChange') {
                if (self.layers[data.id]) {
                    // set data 
                    if (data.data) {
                        self.layers[data.id].dataSet.set(data.data);
                    }
                    // set option
                    if (data.option) {
                        // console.warn(data.option)
                        self.layers[data.id].mapvLayer.set({
                            options: data.option
                        });
                    }
                } else {
                    if (data.data && data.option) {
                        var dataSet = new mapv.DataSet(data.data);
                        // console.warn(data.option)
                        var mapvLayer = new mapv.baiduMapLayer(map, dataSet, data.option);
                        self.layers[data.id] = {
                            mapvLayer: mapvLayer,
                            dataSet: dataSet
                        }
                    }
                }
            }
        });
    }

    render() {
        return (
            <div id="map" ref="map"></div>
        );
    };
};

export default Map;

