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
  private samplingList=Array<number>();
  updateOptions: any;

  timer :any;
  chartOption: EChartsOption;
  ngOnInit(){
    
      this.samplingDataService.loadLastMinSampling()
        .subscribe( res => {
          this.samplingList=res;
          this.setOption(res);
        });
  this.timer = setInterval(() => {
    this.samplingDataService.loadLastSampling()
    .subscribe( res => {
      this.updateSampling(res['current_bytes']);
      this.updateOptions = {
      series: [{
        data: this.samplingList
      }]
    }});
  }, 1000);
}

  ngOnDestroy(): void{
    this.timer.clearInterval()
  }
  setOption(samplingList:number[]){
    this.chartOption = {
      xAxis: {
        type: 'category',
        //data: Array.from({length: 60}, (_, i) => i + 1),
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
          // hoverAnimation: false,
          data: samplingList,
          type: 'line',
          animation: false,
          // animationDelayUpdate: 0
        },
      ],
    
    };
    
  }
  updateSampling(newVal:number){
    this.samplingList =  [newVal,...this.samplingList.slice(0,-1)];
    console.log(this.samplingList);
  }
 
}

