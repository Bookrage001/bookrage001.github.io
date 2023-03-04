import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss']
})
export class LineGraphComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    var myChart = echarts.init(document.getElementById('echarts-Demo'));

    // Draw the chart
    myChart.setOption({
      title: {
        text: 'Sample Graph'
      },
      tooltip: {},
      xAxis: {
        data: ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks']
      },
      yAxis: {},
      series: [
        {
          name: 'sales',
          type: 'line',
          data: [5, 20, 36, 10, 10, 20]
        }
      ]
    });
  }

}
