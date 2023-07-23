import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-add-new-client',
  templateUrl: './add-new-client.component.html',
  styleUrls: ['./add-new-client.component.scss']
})
export class AddNewClientComponent {


  status = 'New'
  assign_to = 'Khaled'
  email:any = new FormControl('',
  [Validators.required, Validators.email]
  );
  job_title:any = new FormControl('',
  Validators.required
  );
  name:any = new FormControl('',
  Validators.required
  );
  phone:any = new FormControl('',
  Validators.required
  );
  message:any = new FormControl('',
  Validators.required
  );

  constructor(
    private firestore: AngularFirestore,
    private router: Router
    ) { }

  isFilled(){
    if (this.name.invalid ||
        this.job_title.invalid ||
        this.email.invalid
      ) {
      return false
    }
    return true
  }



  submit(){
    const newContact = {
      name: this.name.value,
      email: this.email.value,
      phone:this.phone.value,
      status: this.status,
      assign_to: this.assign_to,
      job_title: this.job_title.value,
      message : this.message.value
    };

    
      this.firestore.collection('contact-us').add(newContact)
      .then((docRef) => {
        console.log('Document written with ID: ', docRef.id);
        window.location.reload()

      })
      .catch((error) => {
        console.error('Error adding document: ', error);
      });
    
  }

}
