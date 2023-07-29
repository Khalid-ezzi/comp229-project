import { Component, OnInit } from '@angular/core';
import { collection, doc, Firestore, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.scss']
})
export class FullDetailsComponent implements OnInit{

  is_edit = false;
  client_info: any;
  id: any;

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.getContactedData();
  }

  async getContactedData(){
    try {
      const documentRef = doc(this.firestore, 'contact-us', this.id);
      const docSnap = await getDoc(documentRef);
      this.client_info = docSnap.data();
      console.log(this.client_info)
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
}
