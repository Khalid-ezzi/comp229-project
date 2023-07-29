import { Component, OnInit } from '@angular/core';
import { doc, Firestore, setDoc, getDoc, deleteDoc } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-full-details',
  templateUrl: './full-details.component.html',
  styleUrls: ['./full-details.component.scss']
})
export class FullDetailsComponent implements OnInit{

  is_edit = false;
  is_delete = false;
  client_info: any;
  id: any;
  email:any
  job_title:any
  assign_to:any
  phone:any
  name:any
  message:any
  status:any

  constructor(
    private firestore: Firestore,
    private route: ActivatedRoute,
    private router: Router

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
      this.setData()
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  setData(){
    this.name = this.client_info.name
    this.email = this.client_info.email
    this.phone = this.client_info.phone
    this.assign_to = this.client_info.assign_to
    this.job_title = this.client_info.job_title
    this.message = this.client_info.message
    this.status = this.client_info.status
  }

  changeEditView(){
    this.is_edit = !this.is_edit
  }

  changeDeleteView(){
    this.is_delete = !this.is_delete
  }

  async saveChanges() {
    try {
      const documentRef = doc(this.firestore, 'contact-us', this.id);
      await setDoc(documentRef, {
        name: this.name,
        email: this.email,
        phone: this.phone,
        assign_to: this.assign_to,
        job_title: this.job_title,
        message: this.message,
        status: this.status
      });
      this.is_edit = false; // Disable edit mode after saving changes
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  }

  async deleteContact() {
    try {
      const documentRef = doc(this.firestore, 'contact-us', this.id);
      await deleteDoc(documentRef);
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Error deleting contact:', error);
    }
  }
  
}
