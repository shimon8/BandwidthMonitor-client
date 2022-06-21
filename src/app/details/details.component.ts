import { Component, OnInit } from '@angular/core';
import { SamplingDataService } from 'app/sampling-data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(private samplingDataService: SamplingDataService) { }
  sampling$=this.samplingDataService.loadLastSampling()
  ngOnInit(): void {
  }

}
