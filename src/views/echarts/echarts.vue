<template>
	<div class="echarts">
		<div class="top">
			<div class="top-left" ref='left'></div>
			<div class="top-right" ref='right'></div>
		</div>
		<div class="bottom" ref='bottom'></div>
	</div>
</template>

<script>
import echart from 'echarts'	
export default {
	name: 'Echarts',
	data() {
		return {};
	},
	mounted() {
		const option = {
			backgroundColor: '#fff',
		    title: {
		        text: '平台用户交易来源',
		        left: 'center'
		    },
		    tooltip: {
		        trigger: 'item',
		        formatter: '{a} <br/>{b} : {c} ({d}%)'
		    },
		    legend: {
		        orient: 'vertical',
		        left: 'left',
		        data: ['官网访问', '其他', '小程序', '官方软件', '公众号']
		    },
		    series: [
		        {
		            name: '交易来源',
		            type: 'pie',
		            radius: '55%',
		            center: ['50%', '60%'],
		            data: [
		                {value: 230, name: '官网访问'},
		                {value: 89, name: '其他'},
		                {value: 153, name: '小程序'},
		                {value: 186, name: '公众号'},
		                {value: 563, name: '官方软件'}
		            ],
		            emphasis: {
		                itemStyle: {
		                    shadowBlur: 10,
		                    shadowOffsetX: 0,
		                    shadowColor: 'rgba(0, 0, 0, 0.5)'
		                }
		            }
		        }
		    ]
		};
		const option1 = {
			backgroundColor: '#fefefe',
            title: {
                text: '销量提升榜'
            },
            tooltip: {},
            legend: {
                data:['当月销量','上月销量']
            },
            xAxis: {
                data: ["方便面","游戏机","网红面包","洗面奶","高等奥数"]
            },
            yAxis: {},
            series: [{
                name: '当月销量',
                type: 'bar',
                data: [795, 714, 832, 984, 734]
            },{
                name: '上月销量',
                type: 'bar',
                data: [324, 208, 234, 381, 212]
            }]
        };
		const option2 = {
		    title: {
		        text: '15天内各端访问量'
		    },
		    tooltip: {
		        trigger: 'axis',
		        axisPointer: {
		            type: 'cross',
		            label: {
		                backgroundColor: '#6a7985'
		            }
		        }
		    },
		    legend: {
		        data: ['官网访问', '其他', '小程序', '官方软件', '公众号']
		    },
		    grid: {
		        left: '3%',
		        right: '4%',
		        bottom: '3%',
		        containLabel: true
		    },
		    xAxis: [
		        {
		            type: 'category',
		            boundaryGap: false,
		            data: ['1', '2', '3', '4', '5', '6', '7','8','9','10','11','12','13','14','15']
		        }
		    ],
		    yAxis: [
		        {
		            type: 'value'
		        }
		    ],
		    series: [
		        {
		            name: '官网访问',
		            type: 'line',
		            stack: '总量',
		            areaStyle: {},
		            data: [757, 673, 806, 913, 793, 1002, 998,687,987,876,913, 793, 1002,687,987]
		        },
		        {
		            name: '其他',
		            type: 'line',
		            stack: '总量',
		            areaStyle: {},
		            data: [132, 87, 92, 120, 99, 160, 130,109,150,190,120, 99, 160, 130,89]
		        },
		        {
		            name: '小程序',
		            type: 'line',
		            stack: '总量',
		            areaStyle: {},
		            data: [327, 332, 403, 326, 470, 502, 489,456,520,604,489,456,332, 403,456]
		        },
		        {
		            name: '官方软件',
		            type: 'line',
		            stack: '总量',
		            areaStyle: {},
		            data: [1020, 1102, 1082, 1102, 1007, 1203, 1320,1007,1123,1302,1007, 1203,1020, 1102, 1082,]
		        },
		        {
		            name: '公众号',
		            type: 'line',
		            stack: '总量',
		            // label: {
		            //     normal: {
		            //         show: true,
		            //         position: 'top'
		            //     }
		            // },
		            areaStyle: {},
		            data: [780, 872, 801, 684, 890, 1030, 920,785,896,998,684, 890,920,785,890]
		        }
		    ]
		};
		echart.init(this.$refs.left).setOption(option);
		echart.init(this.$refs.right).setOption(option1);
		echart.init(this.$refs.bottom).setOption(option2);
	}
};
</script>

<style lang="scss" scoped>
.echarts{
	width: 100%;
	height: 100%;
	background-color: #fafafa;
	overflow: hidden;
}	
.top{
	height: 50%;
	width: 100%;
	display: flex;
	&-left{
		width: 50%;
		overflow: hidden;
	}
	&-right{
		width: 50%;
		overflow: hidden;
	}
}
.bottom{
	overflow: hidden;
	margin-top: 20px;
	height: calc(50% - 20px);
	width: 100%;
	box-sizing: border-box;
}
</style>
