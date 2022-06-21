import { Component, OnInit } from '@angular/core';
import { SamplingDataService, CurrentSampling } from 'app/sampling-data.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  constructor(private samplingDataService: SamplingDataService) {}
  lowValue:string;
  highValue:string;
  sampling$:Observable<any>;
  
  ngOnInit(): void {
    this.sampling$ = this.samplingDataService.currentSampling$.asObservable().pipe(
      map((sampling) => this.foramtSampling(sampling))
    );
    
    this.samplingDataService.initSamplingSubject$.subscribe(()=>this.updateLowHighValue());

  }

  bytesToSize(bytes: any) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i)) + ' ' + sizes[i];
  }
  foramtSampling(sampling:CurrentSampling){
    let bytes_sent=this.bytesToSize(sampling.bytes_sent);
    let bytes_recv=this.bytesToSize(sampling.bytes_recv);
    let current_bytes=this.bytesToSize(sampling.current_bytes);

    return {bytes_sent:bytes_sent,bytes_recv:bytes_recv,current_bytes:current_bytes};
  }
  updateLowHighValue(){
    this.lowValue=this.samplingDataService.getLowValue();
    this.highValue=this.samplingDataService.getHighValue();
  }
}
