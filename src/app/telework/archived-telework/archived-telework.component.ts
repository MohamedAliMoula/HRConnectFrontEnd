import { Component, OnInit } from '@angular/core';
import { TeleworkService } from '../telework.service';

@Component({
  selector: 'app-archived-telework',
  templateUrl: './archived-telework.component.html',
  styleUrls: ['./archived-telework.component.css']
})
export class ArchivedTeleworkComponent implements OnInit {
  archivedRequests: any[] = [];

  constructor(private teleworkService: TeleworkService) {}

  ngOnInit() {
    this.fetchArchivedRequests();
    console.log(this.archivedRequests);
    
  }

  fetchArchivedRequests() {
    this.teleworkService.getArchivedRequests().subscribe(data => {
      this.archivedRequests = data;
    });
  }
}
