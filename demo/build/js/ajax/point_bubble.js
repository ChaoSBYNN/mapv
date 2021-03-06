/**
 * @file 示例代码
 */

bmap.centerAndZoom(new BMap.Point(105.403119, 38.028658), 5); // 初始化地图,设置中心点坐标和地图级别

// 第一步创建mapv示例
var mapv = new Mapv({
    drawTypeControl: true,
    map: bmap  // 百度地图的map实例
});

var data = []; // 取城市的点来做示例展示的点数据

data = data.concat(getCityCenter(cityData.municipalities));
data = data.concat(getCityCenter(cityData.provinces));
data = data.concat(getCityCenter(cityData.other));

for (var i = 0; i < cityData.provinces.length; i++) {
    var citys = cityData.provinces[i].cities;
    data = data.concat(getCityCenter(citys));
}

function getCityCenter(citys) {
    var data = [];
    for (var i = 0; i < citys.length; i++) {
        var city = citys[i];
        var center = city.g.split('|')[0];
        center = center.split(',');
        data.push({
            lng: center[0],
            lat: center[1],
            count: Math.random() * 10
        });
    }
    return data;
};

var layer = new Mapv.Layer({
    mapv: mapv, // 对应的mapv实例
    zIndex: 1, // 图层层级
    dataType: 'point', // 数据类型，点类型
    data: data, // 数据
    drawType: 'bubble', // 展示形式
    drawOptions: { // 绘制参数
        // splitList数值表示按数值区间来展示不同大小的圆
        splitList: [
            {
                start: 0,
                end: 2,
                size: 3
            },{
                start: 2,
                end: 5,
                size: 6
            },{
                start: 5,
                end: 7,
                size: 9
            },{
                start: 7,
                size: 12
            }
        ],
        //globalCompositeOperation: 'lighter', //叠加模式
        strokeStyle: 'rgba(255, 255, 255, 1)', // 描边颜色，不设置则不描边
        lineWidth: 3, // 描边宽度，不设置则不描边
        fillStyle: "rgba(255, 255, 50, 0.8)" // 填充颜色
    }
});