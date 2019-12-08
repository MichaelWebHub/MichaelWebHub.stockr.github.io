import React, { useEffect } from 'react';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { useSelector } from 'react-redux';
import { IStockData, IStore } from '../../_store/interfaces/stock.interfaces';

am4core.useTheme(am4themes_animated);

const Chart = () => {

  /** Subscribe to store */
  const dataLoaded: boolean = useSelector((store: IStore) => store.stock.loaded);
  const data: IStockData[] = useSelector((store: IStore) => store.stock.collection);

  useEffect(() => {
      let chart = am4core.create('chartdiv', am4charts.XYChart);

      if (dataLoaded) {
        // Create chart
        chart.padding(20, 20, 20, 20);


        // Load data
        chart.data = [...data].splice(0, 30);

        // the following line makes value axes to be arranged vertically.
        chart.leftAxesContainer.layout = 'vertical';

        // uncomment this line if you want to change order of axes
        //chart.bottomAxesContainer.reverseOrder = true;

        let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        dateAxis.renderer.grid.template.location = 0;
        // @ts-ignore
        dateAxis.renderer.ticks.template.length = 8;
        dateAxis.renderer.ticks.template.strokeOpacity = 0.1;
        dateAxis.renderer.grid.template.disabled = false;
        dateAxis.renderer.ticks.template.disabled = false;
        dateAxis.renderer.ticks.template.strokeOpacity = 0.2;
        dateAxis.renderer.minLabelPosition = 0.01;
        dateAxis.renderer.maxLabelPosition = 0.99;
        dateAxis.tooltip.fill = am4core.color('#1e88e5');
        dateAxis.keepSelection = true;
        dateAxis.minHeight = 30;
        dateAxis.renderer.labels.template.fill = am4core.color('#fff');

        dateAxis.groupData = true;
        dateAxis.minZoomCount = 5;

        // these two lines makes the axis to be initially zoomed-in
        // dateAxis.start = 0.7;
        // dateAxis.keepSelection = true;

        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis.tooltip.disabled = true;
        valueAxis.zIndex = 1;
        valueAxis.renderer.baseGrid.disabled = true;
        // height of axis
        valueAxis.height = am4core.percent(65);

        valueAxis.renderer.gridContainer.background.fill = am4core.color('transparent');
        valueAxis.renderer.gridContainer.background.fillOpacity = 0
        valueAxis.renderer.inside = false;
        valueAxis.renderer.labels.template.verticalCenter = 'bottom';
        valueAxis.renderer.labels.template.padding(0, 0, 0, 2);
        valueAxis.renderer.labels.template.fill = am4core.color('#fff');

        //valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis.renderer.fontSize = '0.8em';

        let series = chart.series.push(new am4charts.CandlestickSeries());
        series.dataFields.dateX = 'Date';
        series.dataFields.openValueY = 'Open';
        series.dataFields.valueY = 'Close';
        series.dataFields.lowValueY = 'Low';
        series.dataFields.highValueY = 'High';
        series.clustered = false;
        series.tooltipText = 'open: {openValueY.value}\nlow: {lowValueY.value}\nhigh: {highValueY.value}\nclose: {valueY.value}';
        series.name = 'MSFT';
        series.defaultState.transitionDuration = 0;

        series.riseFromOpenState.properties.fill = am4core.color('#4cb65d');
        series.dropFromOpenState.properties.fill = am4core.color('#f53d36');
        series.riseFromOpenState.properties.stroke = am4core.color('#4cb65d');
        series.dropFromOpenState.properties.stroke = am4core.color('#f53d36');

        let valueAxis2 = chart.yAxes.push(new am4charts.ValueAxis());
        valueAxis2.tooltip.disabled = true;
        // height of axis
        valueAxis2.height = am4core.percent(35);
        valueAxis2.zIndex = 3;
        // this makes gap between panels
        valueAxis2.marginTop = 30;
        valueAxis2.renderer.baseGrid.disabled = true;
        valueAxis2.renderer.inside = false;
        valueAxis2.renderer.labels.template.verticalCenter = 'bottom';
        valueAxis2.renderer.labels.template.padding(0, 0, 0, 2);
        valueAxis2.renderer.labels.template.fill = am4core.color('#fff');
        //valueAxis.renderer.maxLabelPosition = 0.95;
        valueAxis2.renderer.fontSize = '0.8em';

        valueAxis2.renderer.gridContainer.background.fill = am4core.color('transparent');
        valueAxis2.renderer.gridContainer.background.fillOpacity = 0;

        let series2 = chart.series.push(new am4charts.ColumnSeries());
        series2.dataFields.dateX = 'Date';
        series2.clustered = false;
        series2.dataFields.valueY = 'Volume';
        series2.yAxis = valueAxis2;
        series2.tooltipText = '{valueY.value}';
        series2.columns.template.fill = am4core.color('#1e88e5');
        series2.columns.template.stroke = am4core.color('#1e88e5');
        series2.name = 'Series 2';
        // volume should be summed
        series2.groupFields.valueY = 'sum';
        series2.defaultState.transitionDuration = 0;

        chart.cursor = new am4charts.XYCursor();
        chart.cursor.lineX.stroke = am4core.color('#ddd');
        chart.cursor.lineY.stroke = am4core.color('#ddd');
        chart.cursor.behavior = 'none';

        // let scrollbarX = new am4charts.XYChartScrollbar();
        //
        // let sbSeries = chart.series.push(new am4charts.LineSeries());
        // sbSeries.dataFields.valueY = 'Close';
        // sbSeries.dataFields.dateX = 'Date';
        // scrollbarX.series.push(sbSeries);
        // sbSeries.disabled = true;
        // scrollbarX.marginBottom = 20;
        // chart.scrollbarX = scrollbarX;
        // scrollbarX.scrollbarChart.xAxes.getIndex(0).minHeight = undefined;


//       /**
//        * Set up external controls
//        */
//
// // Date format to be used in input fields
//       let inputFieldFormat = 'yyyy-MM-dd';
//
//       document.getElementById('b1m').addEventListener('click', function () {
//         resetButtonClass();
//         let max = dateAxis.groupMax['day1'];
//         let date = new Date(max);
//         date.setMonth(date.getMonth() - 1);
//
//         dateAxis.zoomToDates(
//           date,
//           new Date(max)
//         );
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       document.getElementById('b3m').addEventListener('click', function () {
//         resetButtonClass();
//         let max = dateAxis.groupMax['day1'];
//         let date = new Date(max);
//         date.setMonth(date.getMonth() - 3);
//
//         dateAxis.zoomToDates(
//           date,
//           new Date(max)
//         );
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       document.getElementById('b6m').addEventListener('click', function () {
//         resetButtonClass();
//         let max = dateAxis.groupMax['day1'];
//         let date = new Date(max);
//         date.setMonth(date.getMonth() - 6);
//
//         dateAxis.zoomToDates(
//           date,
//           new Date(max)
//         );
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       document.getElementById('b1y').addEventListener('click', function () {
//         resetButtonClass();
//         let max = dateAxis.groupMax['week1'];
//         let date = new Date(max);
//         date.setFullYear(date.getFullYear() - 1);
//
//         dateAxis.zoomToDates(
//           date,
//           new Date(max)
//         );
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       document.getElementById('bytd').addEventListener('click', function () {
//         resetButtonClass();
//         let date = new Date(dateAxis.max);
//         date.setMonth(0, 1);
//         date.setHours(0, 0, 0, 0);
//         dateAxis.zoomToDates(date, new Date(dateAxis.max));
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       document.getElementById('bmax').addEventListener('click', function () {
//         resetButtonClass();
//         dateAxis.zoom({ start: 0, end: 1 });
//         //this.className = "amcharts-input amcharts-input-selected";
//       });
//
//       const resetButtonClass = () => {
//         let selected = document.getElementsByClassName('amcharts-input-selected');
//         for (var i = 0; i < selected.length; i++) {
//           selected[i].className = 'amcharts-input';
//         }
//       }
//
//       dateAxis.events.on('selectionextremeschanged', function () {
//         updateFields();
//       });
//
//       const updateFields = () => {
//         let minZoomed = dateAxis.minZoomed + am4core.time.getDuration(dateAxis.mainBaseInterval.timeUnit, dateAxis.mainBaseInterval.count) * 0.5;
//         (document.getElementById('fromfield') as HTMLInputElement).value = chart.dateFormatter.format(minZoomed, inputFieldFormat);
//         (document.getElementById('tofield') as HTMLInputElement).value = chart.dateFormatter.format(new Date(dateAxis.maxZoomed), inputFieldFormat);
//       };
//
//       dateAxis.events.on('extremeschanged', updateFields);
//
//       let zoomTimeout;
//       const updateZoom = () => {
//         if (zoomTimeout) {
//           clearTimeout(zoomTimeout);
//         }
//         zoomTimeout = setTimeout(function () {
//           resetButtonClass();
//           let start = (document.getElementById('fromfield') as HTMLInputElement).value;
//           let end = (document.getElementById('tofield') as HTMLInputElement).value;
//           if ((start.length < inputFieldFormat.length) || (end.length < inputFieldFormat.length)) {
//             return;
//           }
//           let startDate = chart.dateFormatter.parse(start, inputFieldFormat);
//           let endDate = chart.dateFormatter.parse(end, inputFieldFormat);
//
//           if (startDate && endDate) {
//             dateAxis.zoomToDates(startDate, endDate);
//           }
//         }, 500);
//       };
//
//       document.getElementById('fromfield').addEventListener('keyup', updateZoom);
//       document.getElementById('tofield').addEventListener('keyup', updateZoom);
//
      }

      return () => {
        if (chart && dataLoaded) {
          chart.dispose();
        }
      }
    },
    [dataLoaded, data]
  );

  return <>
    {/*<div id="controls" style={{ width: '100%', overflow: 'hidden' }}>*/}
    {/*  <div style={{ float: 'left', marginLeft: '15px' }}>*/}
    {/*    From: <input type="text" id="fromfield" className="amcharts-input"/>*/}
    {/*    To: <input type="text" id="tofield" className="amcharts-input"/>*/}
    {/*  </div>*/}
    {/*  <div style={{ float: 'right', marginRight: '15px' }}>*/}
    {/*    <button id="b1m" className="amcharts-input">1m</button>*/}
    {/*    <button id="b3m" className="amcharts-input">3m</button>*/}
    {/*    <button id="b6m" className="amcharts-input">6m</button>*/}
    {/*    <button id="b1y" className="amcharts-input">1y</button>*/}
    {/*    <button id="bytd" className="amcharts-input">YTD</button>*/}
    {/*    <button id="bmax" className="amcharts-input">MAX</button>*/}
    {/*  </div>*/}
    {/*</div>*/}
    <div id="chartdiv" style={{ width: '100%', height: '100%' }}/>
  </>
};

export default Chart;
