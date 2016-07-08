import React from 'react';
import Store from '../basic/mavStore';
import Action from '../basic/mavAction';
import Data from '../basic/data';
import Config from '../basic/config';

class Nav extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            moduleShow: false,
            layers: {},
            // dataType: null, //point line polygon self
        }
    }

    componentDidMount() {
        var self = this;
        Store.on(function (data) {
            if (data.type == 'changeNav') {
                self.setState({
                    moduleShow: false
                })
            } else if (data.type == 'newLayer') {
                var id = data.layerId;
                var layers = self.state.layers;
                layers[id] = {
                    data: [],
                    option: {},
                    drawType: 'simple',
                    dataType: null,
                }

                self.setState({
                    moduleShow: true,
                    type: 'data',
                    layerName: data.name,
                    activeId: id,
                    layers: layers
                });
            } else if (data.type == 'changeLayer') {
                self.setState({
                    activeId: data.layerId,
                    moduleShow: true,
                });
            } else if (data.type == 'addNewData') {
                self.forceUpdate()
            }
        });
    }

    changeValue(name, type) {
        var activeId = this.state.activeId;
        var option = this.state.layers[activeId].option;
        if (type == 'checkbox') {
            option[name] = !option[name];
        } else {
            option[name] = arguments[2].target.value
        }


        this.setState({
            layers: this.state.layers
        });
        Action.emit({
            data: {
                type: 'layerChange',
                id: activeId,
                option: option
            }
        });
    }

    getControl(name, options) {
        // console.log(type, options)
        var names = {
            fillStyle: {
                name: '填充颜色',
                type: 'color',
            },
            shadowColor: {
                name: '阴影颜色',
                type: 'color',
            },
            shadowBlur: {
                name: '阴影模糊',
                type: 'range',
            },
            size: {
                name: '大小',
                type: 'range'
            },
            // line
            strokeStyle: {
                name: '线条颜色',
                type: 'color',
            },
            lineWidth: {
                name: '线条宽度',
                type: 'range'
            },

            maxSize: {
                name: '最大半径',
                type: 'range'
            },
            max: {
                name: '最大阀值',
                type: 'range'
            },
            radius: {
                name: '半径',
                type: 'range'
            },
            gridWidth: {
                name: '网格宽度',
                type: 'range'
            },
            globalAlpha: {
                name: '全局透明度',
                type: 'range',
                min: 0.01,
                max: 1,
                step: 0.01,
            },
            strength: {
                name: '强度',
                type: 'range',
                min: 0.01,
                max: 1,
                step: 0.01,
            },
            withoutAlpha: {
                name: '启用透明度',
                type: 'checkbox'
            },
            absolute: {
                name: '绝对热力',
                type: 'checkbox'
            },

        }

        var ipt;
        if (names[name]) {
            var type = names[name].type;
            switch (type) {
                case 'color':
                    var color = options;
                    var testRGBA = color.match(/rgba\((.+?),(.+?),(.+?),(.+?)\)/);
                    if (testRGBA && testRGBA.length >= 4) {
                        var R = Number(testRGBA[1]).toString(16);
                        R = R.length <= 1 ? '0' + R : R;
                        var G = Number(testRGBA[2]).toString(16);
                        G = G.length <= 1 ? '0' + G : G;
                        var B = Number(testRGBA[3]).toString(16);
                        B = B.length <= 1 ? '0' + B : B;
                        color = '#' + R + G + B;
                    }
                    ipt = <input value={color}
                        type='color'
                        onChange={this.changeValue.bind(this, name, type) }
                        ref={name}/>;
                    break;
                case 'range':
                    ipt = [<input value={options}
                        type='range'
                        min={names[name].min}
                        step={names[name].step}
                        max={names[name].max}
                        onChange={this.changeValue.bind(this, name, type) }
                        ref={name}/>,
                        <input className="view" value={options}
                            onChange={this.changeValue.bind(this, name, type) }
                            type="text"/>
                    ];
                    break;
                case 'checkbox':
                    ipt = <input
                        checked={options ? 'checked' : ''}
                        type='checkbox'
                        onChange={this.changeValue.bind(this, name, type) }
                        ref={name}/>;
                    break;
                case 'select':
                    var opts = names.draw.options.map(function (item, index) {
                        return <option key={"select_item_" + index} value={item}>{item}</option>
                    });
                    ipt = (
                        <select onChange={this.changeValue.bind(this, name, type) } ref={name}>{opts}</select>
                    );
                    break;
            }
            return (
                <div className="map-style-optiosblock"
                    key={"options_" + name}>
                    <span className="options-name">{names[name].name}</span>
                    {ipt}
                </div>);
        } else {
            console.warn(name, ' is not configed')
            return '';
        }


    }

    changeDataType(type) {
        // console.log(type)
        var self = this;
        var id = self.state.activeId;
        var layers = self.state.layers;

        var _data = Data.get(type);
        var option = Config.drawType['simple'].config[_data.type];
        layers[id] = {
            data: _data.data,
            option: option,
            dataType: _data.type,
            dataName: type,
            drawType: 'simple'
        }

        self.setState({
            layers: layers
        })

        Action.emit({
            data: {
                type: 'layerChange',
                id: id,
                data: layers[id].data,
                option: layers[id].option
            }
        });
    }

    changeDrawType(type) {
        var layers = this.state.layers;
        var activeLayer = layers[this.state.activeId];
        var dataType = activeLayer.dataType;
        var option = Config.drawType[type].config ? Config.drawType[type].config[dataType] : {};
        activeLayer.option = option;
        activeLayer.drawType = type;
        this.setState({
            layers: layers
        });

        Action.emit({
            data: {
                type: 'layerChange',
                id: this.state.activeId,
                option: option
            }
        });
    }

    render() {
        // options
        var options = [];
        var activeLayer = this.state.layers[this.state.activeId] || {};
        // console.log(activeLayer.drawType)

        if (activeLayer) {
            var _options = activeLayer.option;
            for (var i in _options) {
                options.push(this.getControl(i, _options[i]));
            }
        };

        // layer type
        var layerTypes = [];
        var dataType = activeLayer.dataType;

        for (var i in Config.drawType) {
            var types = Config.drawType[i];
            if (types.useData.indexOf(dataType) != -1) {
                layerTypes.push(
                    <span  className={"map-style-dataTypes-block " + (activeLayer.drawType == i ? 'active' : '') }
                        key={"dataType_" + types.name}
                        onClick={this.changeDrawType.bind(this, i) }
                        >
                        {types.name}
                    </span>
                )
            }
        }

        var dataDom = [];
        var dataLists = Data.getList();
        var nameMaping = {
            'point': 'DEMO点数据',
            'line': 'DEMO线数据'
        }
        for (var i in dataLists) {
            var dataName = dataLists[i];
            dataDom.push(
                <p key={'datas_' + dataName} className={"radio-block " + (activeLayer.dataName == dataName ? 'active' : '') }
                    onClick={this.changeDataType.bind(this, dataName) }>
                    <span className="radio"></span>
                    {nameMaping[dataName] ? nameMaping[dataName] : dataName}
                </p>
            )
        }

        return (
            <div className="map-style" style={{ display: this.state.moduleShow ? 'block' : 'none' }}>
                <div className="map-style-info">
                    <div className="map-style-info-name">
                        <span className="map-style-info-name-liststyle"></span>
                        {this.state.layerName}
                    </div>
                    <div className="map-style-info-fn">
                        <span className="map-style-info-fn-btn active">
                            <span className="map-style-info-fn-icon">&#xe90c; </span>
                            <span>调整样式</span>
                        </span>
                    </div>
                </div>

                <div className="map-style-datablock" style={{ display: this.state.type == 'data' ? 'block' : 'none' }}>
                    <div className="map-style-datatitle">&#xe964; 选择数据</div>
                    <div>
                        {dataDom}
                    </div>
                </div>

                <div className="map-style-datablock"
                    style={{ display: (dataType ? '' : 'none') }}>
                    <div className="map-style-datatitle">&#xe9b8; 图层类型</div>
                    <div className="map-style-dataTypes">
                        {layerTypes}
                    </div>
                    <div className="map-style-datatitle">&#xe992; 调整参数</div>
                    {options}
                </div>
            </div>
        );
    };
};

//point line polygon self
export default Nav;

