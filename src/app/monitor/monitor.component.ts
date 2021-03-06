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
  DELAY_SAMPLING:number = 1000;
  private samplingList=Array<number>();
  updateOptions: any;
  timer :any;
  chartOption: EChartsOption;
  ngOnInit(){   
      this.samplingDataService.loadLastMinSampling()
        .subscribe( lastMinSampling => {
          this.samplingList=lastMinSampling;
          this.setOption(lastMinSampling);
        });
  this.timer = setInterval(() => {
    this.samplingDataService.loadLastSampling()
    .subscribe( res => {
      this.samplingDataService.currentSampling$.next(res);
      this.updateSampling(res.current_bytes);
      this.updateOptions = {
      series: [{
        data: this.samplingList
      }]
    }});
  }, this.DELAY_SAMPLING);
}

  ngOnDestroy(): void{
    this.timer.clearInterval()
  }
  setOption(samplingList:number[]){
    this.chartOption = {
      
      xAxis: {
        type: 'category',
        min:0,
        max:60,
        show: false,
      },
      yAxis: {
        type: 'value',
        splitLine: {
          show: false
        }
      },
      series: [
        {
          showSymbol: false,
          data: samplingList,
          type: 'line',
          animation: false,
        },
      ],
    
    };
    
  }
  updateSampling(newVal:number){
    this.samplingList =  [newVal,...this.samplingList.slice(0,-1)];
  }
}

