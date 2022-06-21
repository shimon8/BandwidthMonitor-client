import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';

import * as echarts from 'echarts';
import { AppComponent } from './app.component';
import { MonitorComponent } from './monitor/monitor.component';
import { DetailsComponent } from './details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxEchartsModule.forRoot({echarts})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
