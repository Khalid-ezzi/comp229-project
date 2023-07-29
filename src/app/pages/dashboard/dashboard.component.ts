import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData,doc,  setDoc } from '@angular/fire/firestore';
import { FirbaseServiceService } from 'src/app/services/firbase-service.service';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit { // Implement the OnInit interface

  stages: any;

  all_stages :any = [
    {title:'New', "data":[]},
    {title:'In Progress', "data":[]},
    {title:'Contacted', "data":[]},
    {title:'Complete', "data":[]},
    {title:'Other', "data":[]},
  ]

  constructor(
    private firestore: Firestore,
    private firebaseService:FirbaseServiceService
    ) { 

  }

  ngOnInit() {
    this.getContactedData();
    console.log(this.all_stages)

  }

  drop(event: CdkDragDrop<string[]>) {
    console.log('event.container:', event.container);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

    } else {
      console.log('Out')

      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      let stage_index = event.container.id.split('-')[3];
      let stage_name = this.all_stages[stage_index].title;
      let data = this.all_stages[stage_index].data[event.currentIndex]
      // console.log(stage_name);
      console.log(data);

      let new_stage ={
        name: data.name,
        email: data.email,
        phone: data.phone,
        assign_to: data.assign_to,
        job_title: data.job_title,
        message: data.message,
        status: stage_name
      }
      console.log(new_stage)
      this.saveChanges(data.id, new_stage)
      //updateing Method in here
    }
  }

  async saveChanges(id:any, data:any) {
    try {
      const documentRef = doc(this.firestore, 'contact-us', id);
      await setDoc(documentRef, data);
      window.location.reload()
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  }


  getContactedData() {

    let itemsCollection = collection(this.firestore, 'contact-us');
    collectionData(itemsCollection, { idField: 'id' }).subscribe((data:any) => {
      for (let i = 0; i < data.length; i++) {
        const record = data[i];
        this.dataSerialization(record);
      }

      console.log(this.all_stages);
    });
  }

  dataSerialization(record:any){

    for (let i = 0; i < this.all_stages.length; i++) {
      const stage = this.all_stages[i];
      if (stage.title == record.status) {
          stage.data.push(record)
          return
        }
    }
  }
  
}
