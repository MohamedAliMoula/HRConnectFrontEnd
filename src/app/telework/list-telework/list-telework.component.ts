import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TeleworkService } from '../telework.service';

@Component({
  selector: 'app-list-telework',
  templateUrl: './list-telework.component.html',
  styleUrls: ['./list-telework.component.css']
})
export class ListTeleworkComponent implements OnInit {
  requests: any[] = [];
  requestToRejectId: number | null = null;

  @ViewChild('rejectModal', { static: false }) rejectModal: ElementRef<HTMLDivElement>;

  constructor(private teleworkService: TeleworkService) {}

  ngOnInit() {
    this.fetchRequests();
  }

  fetchRequests() {
    this.teleworkService.getAllRequests().subscribe(data => {
      this.requests = data;
    });
  }

  acceptRequest(id: number) {
    this.teleworkService.acceptRequest(id).subscribe(() => {
      this.fetchRequests();
    });
  }

  openRejectModal(id: number) {
    this.requestToRejectId = id;
    const modalElement = new (window as any).bootstrap.Modal(this.rejectModal.nativeElement);
    modalElement.show();
  }

  confirmReject() {
    if (this.requestToRejectId !== null) {
      this.teleworkService.rejectRequest(this.requestToRejectId).subscribe(() => {
        this.fetchRequests();
        this.requestToRejectId = null;
        const modalElement = new (window as any).bootstrap.Modal(this.rejectModal.nativeElement);
        modalElement.hide();
      });
    }
  }
}
