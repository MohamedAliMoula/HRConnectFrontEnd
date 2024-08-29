import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Conge } from 'src/app/core/models/conge';
import { CongeService } from '../conge.service';
import { UserService } from 'src/app/core/services/user.service';
import { User } from 'src/app/core/models/User';

@Component({
  selector: 'app-conge',
  templateUrl: './conge.component.html',
  styleUrls: ['./conge.component.css']
})
export class CongeComponent implements OnInit {
  user: User;

  conges: Conge[] = [];
  newConge: Conge = {
    iduser: null,  // Cet ID pourrait provenir de l'utilisateur connecté
    dateDebut: '',
    dateFin: '',
    status:'PENDING',
    numberOfDays: 0,
    reason: '',
    halfDay: ''
  };
  formSubmitted = false;
  @ViewChild('confirmationModal', { static: false }) confirmationModal: ElementRef<HTMLDivElement>;

  constructor(private congeService: CongeService, private userservice: UserService) {}

  ngOnInit(): void {
    this.CurrentUser();
  }

  CurrentUser() {
    this.userservice.getCurentUser()
      .subscribe({
        next: (response) => {
          this.user = response;
          this.newConge.iduser = this.user.id;
          console.log(this.newConge.iduser);
          this.getAllConges();
        },
        error: (err) => {
          console.error('Erreur lors de la récupération de l\'utilisateur', err);
        }
      });
  }

  getAllConges() {
    this.congeService.getCongesUtilisateur(this.user.id).subscribe((data) => {
      this.conges = data;
    });
  }

  openModal() {
    if (this.confirmationModal) {
      const modalElement = new (window as any).bootstrap.Modal(this.confirmationModal.nativeElement);
      modalElement.show();
    }
  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.newConge.dateFin < this.newConge.dateDebut) {
      return;
    }
    this.newConge.numberOfDays = this.calculateNumberOfDays(this.newConge.dateDebut, this.newConge.dateFin);

    this.congeService.demanderConge(this.newConge)
      .subscribe({
        next: (response) => {
          console.log('conge request submitted successfully', response);
        },
        error: (err) => {
          console.error('Error submitting conge request', err);
        },
        complete: () => {
          this.ngOnInit();
        }
      });
  }

  private calculateNumberOfDays(startDate: string, endDate: string): number {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diff = end.getTime() - start.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24));
  }

  resetForm() {
    this.newConge = {
      iduser: 1,
      dateDebut: '',
      dateFin: '',
      numberOfDays: 0,
      reason: '',
      halfDay: ''
    };
    this.formSubmitted = false;
  }
}