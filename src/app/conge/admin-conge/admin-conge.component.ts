import { Component, OnInit } from '@angular/core';
import { CongeService } from '../conge.service';
import { Conge } from 'src/app/core/models/conge';

@Component({
  selector: 'app-admin-conge',
  templateUrl: './admin-conge.component.html',
  styleUrls: ['./admin-conge.component.css']
})
export class AdminCongeComponent implements OnInit {
  conges: Conge[] = [];

  constructor(private congeService: CongeService) {}

  ngOnInit(): void {
    this.loadAllConges();
  }

  // Charger tous les congés
  loadAllConges(): void {
    this.congeService.getAllConges()
      .subscribe({
        next: (data) => {
          this.conges = data;
          console.log('Congés chargés avec succès', this.conges);
        },
        error: (err) => {
          console.error('Erreur lors du chargement des congés', err);
        }
      });
  }

  // Valider un congé
  validerConge(idDemande: number): void {
    this.congeService.validerConge(idDemande)
      .subscribe({
        next: (response) => {
          console.log('Congé validé avec succès', response);
          this.loadAllConges(); // Recharger la liste des congés après validation
        },
        error: (err) => {
          console.error('Erreur lors de la validation du congé', err);
        }
      });
  }

  // Refuser un congé
  refuserConge(idDemande: number): void {
    this.congeService.refuserConge(idDemande)
      .subscribe({
        next: (response) => {
          console.log('Congé refusé avec succès', response);
          this.loadAllConges(); // Recharger la liste des congés après refus
        },
        error: (err) => {
          console.error('Erreur lors du refus du congé', err);
        }
      });
  }

  // Supprimer un congé
  deleteConge(idDemande: number): void {
    this.congeService.deleteConge(idDemande)
      .subscribe({
        next: () => {
          console.log('Congé supprimé avec succès');
          this.loadAllConges(); // Recharger la liste des congés après suppression
        },
        error: (err) => {
          console.error('Erreur lors de la suppression du congé', err);
        }
      });
  }
}
