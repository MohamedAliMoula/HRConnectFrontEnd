import { Injectable } from '@angular/core';
import { Conge } from '../core/models/conge';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CongeService {


  private apiUrl = 'http://localhost:8090/api/conges';

  constructor(private http: HttpClient) {}

  // Demander un congé
  demanderConge(conge: Conge): Observable<Conge> {
    return this.http.post<Conge>(this.apiUrl, conge);
  }

  // Valider un congé
  validerConge(idDemande: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/validerConge/${idDemande}`, {});
  }

  // Refuser un congé
  refuserConge(idDemande: number): Observable<Conge> {
    return this.http.put<Conge>(`${this.apiUrl}/refuserConge/${idDemande}`, {});
  }

  // Récupérer les congés d'un utilisateur
  getCongesUtilisateur(idUtilisateur: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/utilisateur/${idUtilisateur}`);
  }

  // Récupérer tous les congés
  getAllConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(this.apiUrl);
  }

  // Supprimer un congé
  deleteConge(idDemande: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${idDemande}`);
  }

  // Récupérer les congés à venir
  getUpcomingConges(): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/upcoming`);
  }

  // Récupérer les congés à venir pour un utilisateur spécifique
  getUpcomingCongesUser(iduser: number): Observable<Conge[]> {
    return this.http.get<Conge[]>(`${this.apiUrl}/upcoming/${iduser}`);
  }}
