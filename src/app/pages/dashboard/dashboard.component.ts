import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, DocumentData } from '@angular/fire/firestore';
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
      console.log(stage_name);
      console.log(data.id);

      let new_stage ={
        status: stage_name
      }
      this.updatingRecords(data.id, 'contact-us', new_stage)
      //updateing Method in here
    }
  }

  async updatingRecords(id:any, collection:any, data:any){
    let update = await collection(this.firestore, collection).doc(id).update(data)
      .then(() => {
        console.log('Document successfully updated in Firestore!');
      })
      .catch((error:any) => {
        console.error('Error updating document in Firestore:', error);
      });
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
