import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  itemForm!: FormGroup;
  users$: Observable<any[]> = of([]);
  formModel: any = { role: null, email: '', password: '', username: '' };
  showMessage: boolean = false;
  responseMessage: any;

  constructor(public router:Router, private httpService:HttpService, private formBuilder: FormBuilder) { 
    
    this.itemForm = this.formBuilder.group({
      email: [this.formModel.email,[ Validators.required, Validators.email]],
      password: [this.formModel.password,[ Validators.required]],
      role: [this.formModel.userType,[ Validators.required]],
      username: [this.formModel.username,[ Validators.required,this.uniqueUsernameValidator]],
  });
}

uniqueUsernameValidator(userName: string): ValidationErrors | null {
  let users = JSON.parse(localStorage.getItem('users') || '[]');
  if (Array.isArray(users)) {
    const userNameArray = users.map((user: any) => user.username);
    if (userNameArray.includes(userName)) {
      return { notUnique: true };
    }
  }
  return null;
}
  ngOnInit(): void {
    this.users$ = this.httpService.getAllUsers();
 
    this.users$.subscribe((userArray) => {
      if (userArray) {
        localStorage.setItem('users', JSON.stringify(userArray));
      }
    });
  }


onRegister()
{
  if(this.itemForm.valid)
  {
    this.showMessage=false;
    this.httpService.registerUser(this.itemForm.value).subscribe(data=>{    
      debugger;
      this.showMessage=true;
      this.responseMessage='Welcome '+data.name +" you are successfully registered";
      this.itemForm.reset();
      
    },error=>{ })
  }
  else{
    this.itemForm.markAllAsTouched();
  }
}
}
