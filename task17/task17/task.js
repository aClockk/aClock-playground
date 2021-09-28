/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date('2016-01-01');
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  北京: randomBuildData(500),
  上海: randomBuildData(300),
  广州: randomBuildData(200),
  深圳: randomBuildData(100),
  成都: randomBuildData(300),
  西安: randomBuildData(500),
  福州: randomBuildData(100),
  厦门: randomBuildData(100),
  沈阳: randomBuildData(500),
  武汉: randomBuildData(900),
};
let vm = new Vue({
  el: '#functionCityData',
  data: {
    cityName: Object.keys(aqiSourceData),
    dateClass: 'day',
    city: '北京',
  },
  methods: {
    col: function () {
      str = '#';
      for (let i = 0; i < 6; i++) {
        str += Math.floor(Math.random() * 16).toString(16);
      }
      return str;
    },
    daysChartMaker: function () {
      chartData = aqiSourceData[this.city];
      daysData = Object.keys(chartData);
      days = daysData
        .map((item, index) => {
          this.col();
          return `<div style="width:11px;height:${
            chartData[item]
          }px;background:${str};display:inline-block;position:absolute;bottom:0;left:${
            index * 17
          }px" title="时间：${item}
空气质量：${chartData[item]}" ></div>`;
        })
        .join('');
      return days;
    },
    weeksChartMaker: function () {
      chartData = aqiSourceData[this.city];
      daysData = Object.keys(chartData);
      weeksData = [];
      for (let i = 0; i < 55; i++) {
        weeksData.push(0);
      }
      for (let i = 0; i < daysData.length / 7; i++) {
        daysData.map((item, index) => {
          if (i === Math.floor(index / 7)) {
            weeksData[i] += chartData[item];
          }
        });
      }
      sum = weeksData.filter((item) => {
        return item > 0;
      });
      avr = sum.map((item) => {
        return Math.floor(item / 7);
      });
      weeks = avr
        .map((item, index) => {
          this.col();
          return `<div style="width:90px;height:${item}px;background:${str};margin-left:20px;display:inline-block;position:absolute;bottom:0;left:${
            index * 115
          }px"" title="时间：第${index + 1}周
空气质量：${item}" ></div>`;
        })
        .join('');
      return weeks;
    },
    monthsChartMaker: function () {
      chartData = aqiSourceData[this.city];
      date = Object.keys(chartData);
      monthsData = [];
      for (let i = 1; i <= 12; i++) {
        monthsData.push(0);
        date.forEach((item) => {
          if (parseInt(item.slice(5, 7)) === i) {
            monthsData[i - 1] += chartData[item];
          }
        });
      }
      sum = monthsData.filter((item) => {
        return item > 0;
      });
      num = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      avr = [];
      sum.forEach((item, index) => {
        avr[index] = Math.floor(item / num[index]);
      });
      months = avr
        .map((item, index) => {
          this.col();
          return `<div style="width:480px;height:${item}px;background:${str};margin-left:20px;display:inline-block;position:absolute;bottom:0;left:${
            index * 500
          }px"" title="时间：${index + 1}月
空气质量：${item}" ></div>`;
        })
        .join('');
      return months;
    },
  },
});

// // 用于渲染图表的数据
// var chartData = {};

// // 记录当前页面的表单选项
// var pageState = {
//     nowSelectCity: '北京',
//     nowGraTime: 'day',
// };
// var str = '#';
// // 颜色随机函数（抄）
// function col() {
//   str = '#';
//   for (let i = 0; i < 6; i++) {
//     str += Math.floor(Math.random() * 16).toString(16);
//   }
// }
// /**
//  * 渲染图表
//  */

// function renderChart() {
//     let aqiChartWrap = document.querySelector('.aqi-chart-wrap');
//     if (pageState['nowGraTime'] === 'day') {
//         let daysData = Object.keys(chartData);
//         let days = daysData
//             .map((item, index) => {
//                 col();
//                 return `<div style="width:11px;height:${
//           chartData[item]
//         }px;background:${str};display:inline-block;position:absolute;bottom:0;left:${
//           index * 17
//         }px" title="时间：${item}
// 空气质量：${chartData[item]}" ></div>`;
//             })
//             .join('');
//         aqiChartWrap.innerHTML = days;
//     } else if (pageState['nowGraTime'] === 'week') {
//         let date = Object.keys(chartData);
//         let weeksData = [
//             0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//             0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
//             0, 0, 0, 0, 0, 0, 0,
//         ];
//         for (let i = 0; i < date.length / 7; i++) {
//             date.map((item, index) => {
//                 if (i === Math.floor(index / 7)) {
//                     weeksData[i] += chartData[item];
//                 }
//             });
//         }
//         sum = weeksData.filter((item) => {
//             return item > 0;
//         });
//         let avr = sum.map((item) => {
//             return Math.floor(item / 7);
//         });
//         // let avr = [];
//         // avr = weeksData.map((item, index) => {
//         //     let sum = [];
//         //     for (let i = 1; i <= 7; i++) {
//         //         let arr = item.slice(9 + 10 * (i - 1), 10 * i + 9);
//         //         sum = chartData[arr];
//         //     }
//         //     return Math.floor(sum / 7);
//         // });
//         let weeks = avr
//             .map((item, index) => {
//                 col();
//                 return `<div style="width:90px;height:${item}px;background:${str};margin-left:20px;display:inline-block;position:absolute;bottom:0;left:${
//           index * 115
//         }px"" title="时间：第${index + 1}周
// 空气质量：${item}" ></div>`;
//             })
//             .join('');
//         aqiChartWrap.innerHTML = weeks;
//     } else {
//         let date = Object.keys(chartData);
//         let monthsData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//         for (let i = 1; i <= 12; i++) {
//             date.forEach((item) => {
//                 if (parseInt(item.slice(5, 7)) === i) {
//                     monthsData[i - 1] += chartData[item];
//                 }
//             });
//         }
//         let sum = monthsData.filter((item) => {
//             return item > 0;
//         });
//         let num = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
//         let avr = [];
//         sum.forEach((item, index) => {
//             avr[index] = Math.floor(item / num[index]);
//         });
//         let months = avr
//             .map((item, index) => {
//                 col();
//                 return `<div style="width:480px;height:${item}px;background:${str};margin-left:20px;display:inline-block;position:absolute;bottom:0;left:${
//           index * 500
//         }px"" title="时间：${index + 1}月
// 空气质量：${item}" ></div>`;
//             })
//             .join('');
//         aqiChartWrap.innerHTML = months;
//     }
// }

// /**
//  * 日、周、月的radio事件点击时的处理函数
//  */
// function graTimeChange() {
//     let graTime = [...document.querySelectorAll('#form-gra-time input')];
//     let formGraTime = document.querySelector('#form-gra-time');
//     formGraTime.addEventListener('click', () => {
//         graTime.forEach((item) => {
//             if (item.checked === true) {
//                 pageState['nowGraTime'] = item.value;
//             }
//         });
//         init();
//     });

//     // 确定是否选项发生了变化
//     // 设置对应数据
//     // 调用图表渲染函数
// }
// graTimeChange();

// /**
//  * select发生变化时的处理函数
//  */
// function citySelectChange() {
//     let citySelect = document.querySelector('#city-select');
//     let arr = [Array.from(citySelect)];
//     arr[0].forEach((item) => {
//         if (item.selected === true) {
//             pageState['nowSelectCity'] = item.value;
//         }
//     });
//     // 确定是否选项发生了变化
//     // 设置对应数据
//     // 调用图表渲染函数
// }

// /**
//  * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
//  */
// function initGraTimeForm() {
//     let citySelect = document.querySelector('#city-select');
//     let cityName = Object.keys(aqiSourceData);
//     let selection = cityName
//         .map((item) => {
//             return `<option value='${item}'>${item}</option>`;
//         })
//         .join('');
//     citySelect.innerHTML = selection;
// }

// /**
//  * 初始化城市Select下拉选择框中的选项
//  */
// function initCitySelector() {
//     let citySelect = document.querySelector('#city-select');

//     citySelect.addEventListener('click', () => {
//         citySelectChange();
//         initAqiChartData();
//     });
//     // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
//     // 给select设置事件，当选项发生变化时调用函数citySelectChange
// }

// /**
//  * 初始化图表需要的数据格式
//  */
// function initAqiChartData() {
//     chartData = aqiSourceData[pageState['nowSelectCity']];
//     renderChart();
//     // 将原始的源数据处理成图表需要的数据格式
//     // 处理好的数据存到 chartData 中
// }
// /**
//  * 初始化函数
//  */
// function init() {
//     initGraTimeForm();
//     initCitySelector();
//     initAqiChartData();
// }
// init();
