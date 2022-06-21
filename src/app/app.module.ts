import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxEchartsModule } from 'ngx-echarts';
import { HttpClientModule } from '@angular/common/http';
import {MatDividerModule} from '@angular/material/divider';

import * as echarts from 'echarts';
import { AppComponent } from './app.component';
import { MonitorComponent } from './monitor/monitor.component';
import { DetailsComponent } from './details/details.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    MonitorComponent,
    DetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatDividerModule,
    NgxEchartsModule.forRoot({echarts}),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
