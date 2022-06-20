import { Component, OnInit } from '@angular/core';
import { EChartsOption, number } from 'echarts';
import { Subscription, TimeInterval } from 'rxjs';
import { SamplingDataService } from '.././sampling-data.service';
@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {

  constructor(private samplingDataService: SamplingDataService){}
  private requestInterval :any 
  chartOption: EChartsOption;
  ngOnInit(){
    this.requestInterval = setInterval(()=>{
      return this.samplingDataService.loadLastMinSampling()
        .subscribe( res => this.setOption(res) );
    }
  ,1000);
  }
  ngOnDestroy(): void{
    this.requestInterval.clearInterval()

  }
  setOption(samplingList:number[]){
    this.chartOption = {
      xAxis: {
        type: 'category',
        // data: Array.from(Array(60).keys()),
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: samplingList,
          type: 'line',
        },
      ],
    };
  }
 
}

