import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {Client} from '../../models/Client';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

  client: Observable<Client>;
  clients: Observable<Client[]>;
  clientsCollection: AngularFirestoreCollection<Client>;
  clientDoc: AngularFirestoreDocument<Client>;

  constructor(private fs: AngularFirestore) {
    this.clientsCollection = this.fs.collection('clients', ref => ref.orderBy('lastName', 'asc'));
  }
  getClients(): Observable<Client[]> {
    this.clients = this.clientsCollection.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Client;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    );
    return this.clients;
  }
  newClient(client: Client) {
    this.clientsCollection.add(client);
  }
  getClient(id: string): Observable<Client> {
    this.clientDoc = this.fs.doc<Client>(`clients/${id}`);
    this.client = this.clientDoc.snapshotChanges().pipe(
      map(actions => {
        if (actions.payload.exists === false) {
          return null;
        } else {
        const data = actions.payload.data() as Client;
        data.id = actions.payload.id;
        return data;
      }}));
    return this.client;
  }
  updateClient(client: Client) {
    this.clientDoc = this.fs.doc(`clients/${client.id}`);
    this.clientDoc.update(client);
  }
  deleteClient(client: Client) {
    this.clientDoc = this.fs.doc(`clients/${client.id}`);
    this.clientDoc.delete();
  }
}
