import { Component } from '@angular/core';
import { EChartsOption, number } from 'echarts';
import { Subscription, TimeInterval } from 'rxjs';
import { SamplingDataService } from './sampling-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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
