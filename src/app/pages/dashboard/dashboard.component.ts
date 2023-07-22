import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit { // Implement the OnInit interface

  stages: any;

  all_stages :any = [
    {title:'New', data:[]},
    {title:'In Progress', data:[]},
    {title:'Contacted', data:[]},
    {title:'Complete', data:[]},
    {title:'Other', data:[]},
  ]

  constructor(private firestore: Firestore) { // Make sure to inject 'Firestore' properly

  }

  ngOnInit() {
    this.getContactedData();
    console.log(this.all_stages)

  }


  getContactedData(){
    let itemsCollection = collection(this.firestore, 'contact-us');
    collectionData(itemsCollection).subscribe((data: any[]) => {
      for (let i = 0; i < data.length; i++) {
        const record = data[i];
        this.dataSerialization(record)
      }
      
      console.log(this.all_stages)
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
