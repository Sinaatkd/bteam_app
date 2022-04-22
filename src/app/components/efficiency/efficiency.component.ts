import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-efficiency',
  templateUrl: './efficiency.component.html',
  styleUrls: ['./efficiency.component.scss'],
})
export class EfficiencyComponent implements OnInit {
  @Input('signal') signal
  targetTouchedCount = 0;
  constructor() {
  }

  ngOnInit() {
    this.targetTouchedCount = this.signal.targets.filter(t => t.is_touched).length;
  }

}
