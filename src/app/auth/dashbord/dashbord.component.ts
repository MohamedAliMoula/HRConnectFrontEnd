import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.css']
})

export class DashbordComponent {
  @Input() svgIcon = '';
  @Input() iconColor = '';
  @Input() color = '';
  @Input() description = '';
  @Input() title = '';
}
