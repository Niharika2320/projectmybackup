import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-assgin-cargo',
  templateUrl: './assgin-cargo.component.html',
  styleUrls: ['./assgin-cargo.component.scss']
})
export class AssginCargoComponent {
 
 
  showError:boolean=false;
  errorMessage:any;
  cargList:any=[];
  statusModel: any={};
  showMessage: any;
  responseMessage: any;
 
  constructor(public router:Router, public httpService:HttpService, private formBuilder: FormBuilder, private authService:AuthService)
  {
  }
  ngOnInit(): void {
   this.getAssginCargo();
   this.statusModel.newStatus=null;
  }
  getAssginCargo() {
    this.cargList=[];
    this.httpService.getAssignOrders(1).subscribe((data: any) => {
      this.cargList=data;
      console.log(this.cargList);
    }, error => {
      // Handle error
      this.showError = true;
      this.errorMessage = "An error occurred while logging in. Please try again later.";
      console.error('Login error:', error);
    });;
  }
  addStatus(value:any)
  {
    this.statusModel.cargoId=value.id
  }
  assignDriver()
  {
    if(this.statusModel.newStatus!=null)
    {
      this.showMessage = false;
      this.httpService.updateCargoStatus(this.statusModel.newStatus,this.statusModel.cargoId).subscribe((data: any) => {
        debugger;
        this.showMessage = true;
        this.responseMessage=data.message;;
        this.getAssginCargo();
      }, error => {
        // Handle error
        this.showError = true;
        this.errorMessage = "An error occurred while logging in. Please try again later.";
        console.error('Login error:', error);
      });;
    }
  }
 
 
 
}
 
 