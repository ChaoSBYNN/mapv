/**
 * Data
 * @author Mofei Zhu <zhuwenlong@baidu.com>
 */


/**
 * TODO: 网格聚合
 */

var config = {
    dataType: ['point', 'line', 'polygon'],
    drawType: {
        'simple': {
            name: '普通',
            useData: ['point', 'line'],
            config: {
                point: {
                    fillStyle: 'rgba(151, 192, 247, 0.6)',
                    shadowColor: 'rgba(151, 192, 247, 0.5)',
                    shadowBlur: 10,
                    size: 5,
                },
                line: {
                    strokeStyle: 'rgba(255, 250, 50, 0.3)',
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    lineWidth: 0.7,
                }
            }
        },
        'bubble': {
            name: '气泡',
            useData: ['point'],
            config: {
                point: {
                    fillStyle: 'rgba(151, 192, 247, 0.6)',
                    maxSize: 20,
                    max: 30,
                    draw: 'bubble'
                }
            }
        },
        'intensity': {
            name: '密度',
            useData: ['point'],
            config: {
                point: {
                    gradient: {
                        0: 'blue',
                        0.5: 'yellow',
                        1: 'red'
                    },
                    max: 30,
                    draw: 'intensity'
                }
            }
        },
        'category': {
            name: '分类',
            useData: ['point'],
            config: {
                point: {
                    splitList: {
                        other: 'white',
                        1: 'blue',
                        2: 'yellow',
                        3: 'red'
                    },
                    size: 2,
                    max: 30,
                    draw: 'category'
                }
            }
        },
        'choropleth': {
            name: '集合',
            useData: ['point'],
            config: {
                point: {
                    splitList: [{
                        start: 0,
                        end: 2,
                        value: 'red'
                    }, {
                        start: 2,
                        end: 4,
                        value: 'yellow'
                    }, {
                        start: 4,
                        value: 'blue'
                    }],
                    max: 30,
                    draw: 'choropleth'
                }
            }
        },
        'heatmap': {
            name: '热力图',
            useData: ['point', 'line'],
            config: {
                point: {
                    radius: 19,
                    gradient: {
                        0.25: "rgb(0,0,255)",
                        0.55: "rgb(0,255,0)",
                        0.85: "yellow",
                        1.00: "rgb(255,0,0)"
                    },
                    max: 100,
                    draw: 'heatmap'
                },
                line: {
                    gradient: {
                        0.25: "rgb(0,0,255)",
                        0.55: "rgb(0,255,0)",
                        0.85: "yellow",
                        1.0: "rgb(255,0,0)"
                    },
                    max: 5000,
                    withoutAlpha: true,
                    absolute: true,
                    draw: 'heatmap'
                }
            }
        },
        'grid': {
            name: '网格',
            useData: ['point'],
            config: {
                point: {
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    gridWidth: 30,
                    globalAlpha: 0.5,
                    gradient: {
                        0: 'white',
                        1: 'red'
                    },
                    draw: 'grid'
                }
            }
        },
        'honeycomb': {
            name: '蜂窝',
            useData: ['point'],
            config: {
                point: {
                    shadowColor: 'rgba(255, 250, 50, 1)',
                    shadowBlur: 20,
                    max: 100,
                    gridWidth: 30,
                    globalAlpha: 0.5,
                    gradient: {
                        0: 'white',
                        1: 'blue'
                    },
                    draw: 'honeycomb'
                }
            }
        },
        'text': {
            name: '文本',
            useData: [],
            config: {
                point: {}
            }
        },
        'icon': {
            name: '图标',
            useData: [],
            config: {
                point: {}
            }
        },
        'animate': {
            name: '动画',
            useData: [],
            config: {
                point: {}
            }
        },
        'time': {
            name: '时间动画',
            useData: [],
            config: {
                point: {}
            }
        },
    },
    controlList: {
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
        }
    }
}

export default config;