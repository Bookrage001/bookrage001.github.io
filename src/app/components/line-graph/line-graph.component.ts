import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import * as echarts from 'echarts';


@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  standalone: true
})
export class LineGraphComponent implements AfterViewInit, OnChanges, OnDestroy {
  @Input() chartTitle = 'Sample Graph';
  @Input() seriesName = 'series';
  @Input() xAxisLabels: string[] = ['shirt', 'cardigan', 'chiffon', 'pants', 'heels', 'socks'];
  @Input() seriesData: number[] = [5, 20, 36, 10, 10, 20];
  @Input() trendSeriesName = '';
  @Input() trendSeriesData: number[] = [];
  @Input() highlightStartLabel = '';
  @Input() highlightEndLabel = '';
  @Input() highlightLabel = '';
  @ViewChild('chartHost', { static: true }) chartHost!: ElementRef<HTMLDivElement>;

  private chart: any;

  constructor() { }

  ngAfterViewInit(): void {
    const chartElement = this.chartHost?.nativeElement;

    if (!chartElement) {
      return;
    }

    this.chart = (echarts as any).init(chartElement);
    this.updateChart();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.dispose();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.chart) {
      return;
    }

    if (
      changes['chartTitle'] ||
      changes['seriesName'] ||
      changes['xAxisLabels'] ||
      changes['seriesData'] ||
      changes['trendSeriesName'] ||
      changes['trendSeriesData'] ||
      changes['highlightStartLabel'] ||
      changes['highlightEndLabel'] ||
      changes['highlightLabel']
    ) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const hasHighlight =
      !!this.highlightStartLabel &&
      !!this.highlightEndLabel &&
      this.xAxisLabels.includes(this.highlightStartLabel) &&
      this.xAxisLabels.includes(this.highlightEndLabel);

    const chartSeries: any[] = [
      {
        name: this.seriesName,
        type: 'line',
        data: this.seriesData,
        smooth: true,
        areaStyle: {
          opacity: 0.2
        },
        markArea: hasHighlight
          ? {
              silent: true,
              label: {
                show: !!this.highlightLabel,
                formatter: this.highlightLabel,
                color: '#5f2120'
              },
              itemStyle: {
                color: 'rgba(239, 83, 80, 0.14)',
                borderColor: 'rgba(183, 28, 28, 0.8)',
                borderWidth: 1
              },
              data: [[{ xAxis: this.highlightStartLabel }, { xAxis: this.highlightEndLabel }]]
            }
          : undefined
      }
    ];

    const hasTrendSeries =
      !!this.trendSeriesName &&
      this.trendSeriesData.length === this.xAxisLabels.length;

    if (hasTrendSeries) {
      chartSeries.push({
        name: this.trendSeriesName,
        type: 'line',
        data: this.trendSeriesData,
        smooth: false,
        symbol: 'none',
        lineStyle: {
          type: 'dashed',
          width: 2,
          color: '#0d47a1'
        }
      });
    }

    this.chart.setOption({
      title: {
        text: this.chartTitle
      },
      tooltip: {
        trigger: 'axis',
        valueFormatter: (value: number) => `$${value.toFixed(3)}`
      },
      xAxis: {
        data: this.xAxisLabels
      },
      yAxis: {
        axisLabel: {
          formatter: '${value}'
        }
      },
      legend: {
        show: hasTrendSeries,
        data: hasTrendSeries ? [this.seriesName, this.trendSeriesName] : [this.seriesName]
      },
      series: chartSeries
    });
  }

}
