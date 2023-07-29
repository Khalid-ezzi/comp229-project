import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class FirbaseServiceService {

  constructor(
    private firestore: Firestore,
    private fireauth : AngularFireAuth,
    private router : Router
    ) { 

  }

  getCollection(collection_name:string) {
    let _data:any
    let itemsCollection
    collectionData(collection(this.firestore, collection_name), { idField: 'id' }).subscribe((data:any) => {
      _data = data
    });
    console.log(_data)
    return _data
  }


}
