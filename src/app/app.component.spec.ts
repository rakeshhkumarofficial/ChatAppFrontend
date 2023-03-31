import { HttpClientModule } from '@angular/common/http';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { LoginComponent } from './authComponent/Login/login.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
describe('ContactFormComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
let email=['tarunsharma98555@gmail.com','tarunsharma98855gmail.com','tarunsharma@9855@gmail.com']
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    for (let x=0;x<2;x++){
      console.log(x)
    component.loginForm.setValue({
      "email":email[x], 
      "password":'Tarun@123@'
    });
    expect(component.loginForm.valid).toEqual(true);
  }
  });
});


