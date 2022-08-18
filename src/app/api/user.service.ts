import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // On définit une propriété de type HttpHeaders qui représente les options de configuration d’un entête d'une requête http (la requête vers le serveur)
  headers: HttpHeaders;
  // HttpClient représente une requête html. Le service est récupéré par injection de dépendance dans le constructeur
  constructor(public http: HttpClient) {
    // On instancie le service
    this.headers = new HttpHeaders();
    // On définit les options de configuration et la CORS policy
    this.headers.append('Accept', 'application/json');
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
    this.headers.append('Access-Control-Allow-Headers', 'Content-Type');
  }

  // On définit les méthodes qui envoient les données des formulaires au serveur backend.
  // Méthode pour l'envoi des formulaires pour les objets perdus et trouvés
  submitForm(data: any) {
    return this.http.post('http://localhost/ionicserver/manage-data.php?key=create', data);
  }

  // Méthode pour l'envoi du formulaire d'inscription 
  submitSignUpForm(data: any) {
    return this.http.post('http://localhost/ionicserver/manage-data.php?key=users', data);
  }

  // Méthode pour l'envoi du formulaire de connexion
  submitLoginForm(data: any) {
    return this.http.post('http://localhost/ionicserver/manage-data.php?key=login', data);
  }

  // Méthode de suppression d'un objet selon l'id
  deleteViewData(id: string) {
    // console.log('Je passe par là');
    return this.http.get('http://localhost/ionicserver/manage-data.php?key=delete&id=' + id);
  }

  // Méthode de changement de status d'un objet
  updateViewData(id: string) {
    // console.log('Je passe par là');
    return this.http.get('http://localhost/ionicserver/manage-data.php?key=update&id=' + id);
  }
  // getEntry(data: any) {
  //   return this.http.get('http://localhost/ionicserver/retrieve-data.php', data);
  // }
}
