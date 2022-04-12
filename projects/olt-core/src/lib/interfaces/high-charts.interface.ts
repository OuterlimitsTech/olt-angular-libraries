
export interface IOltHighchartPieSeriesData {
  name: string;
  y: number;
  sliced: boolean;
  selected: boolean;
}

export interface IOltHighchartPieSeries {
  name: string;
  colorByPoint: boolean;
  data: IOltHighchartPieSeriesData[];
}

export interface IOltHighchart {
  // highcharts: any;
  runOutsideAngular: boolean;
  oneToOneFlag: boolean;
  updateFlag: boolean;
  chartConstructor: string;
  options: any;
}
