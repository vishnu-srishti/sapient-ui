import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-spacex-result',
  templateUrl: './spacex-result.component.html',
  styleUrls: ['./spacex-result.component.scss']
})
export class SpacexResultComponent implements OnInit {

  @Input() resultData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
