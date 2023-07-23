import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewClientComponent } from './add-new-client.component';

describe('AddNewClientComponent', () => {
  let component: AddNewClientComponent;
  let fixture: ComponentFixture<AddNewClientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewClientComponent]
    });
    fixture = TestBed.createComponent(AddNewClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
