import { UiService } from './../../services/ui.service';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReCaptchaV3Service } from 'ng-recaptcha';
import { ToastrService } from 'ngx-toastr';
import { ApiuserService } from 'src/app/services/apiuser.service';
import { NgbModal,  NgbModalConfig, } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [ApiuserService, NgbModalConfig, NgbModal],
})
export class SignupComponent implements OnInit {
  signUpForm!: FormGroup;

  submitted: boolean = false;

  emailExist!: boolean;

  hostExist!: boolean;

  reCAPTCHAToken: string = '';

  userName!: string;

  closeResult = '';
  @ViewChild("content") modalContent: TemplateRef<any> | undefined;

  constructor(
    private formBuilder: FormBuilder,
    private recaptchaV3Service: ReCaptchaV3Service,
    private toastr: ToastrService,
    private apiuser: ApiuserService,
    private uiService: UiService,
    private modalService: NgbModal,
    config: NgbModalConfig
  ) {

    config.backdrop = 'static';
    config.keyboard = false;
  }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstname: ['', [Validators.required, Validators.maxLength(25)]],
      lastname: ['', [Validators.required, Validators.maxLength(25)]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('[a-z0-9]+@[a-z]+.[a-z]{2,3}'),
        ],
      ],
      host: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9](?:(?:[a-zA-Z0-9-]*|(?<!-).(?![-.]))*[a-zA-Z0-9]+)?)$'
          ),
        ],
      ],
      accept: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (!this.signUpForm.invalid) {
      this.recaptchaV3Service
        .execute('importantAction')
        .subscribe((token: string) => {
          this.reCAPTCHAToken = token;
        });

      if (this.reCAPTCHAToken != null) {
        const apiUser = {
          f_name: this.signUpForm.controls['firstname'].value,
          l_name: this.signUpForm.controls['lastname'].value,
          email: this.signUpForm.controls['email'].value,
          host: this.signUpForm.controls['host'].value,
        };
        this.uiService.showPreloader();
        this.apiuser.createApiUser(apiUser).subscribe((value) => {
          if (value) {
            this.uiService.showPreloader();
            this.signUpForm.reset();
            this.submitted = false;
            this.reCAPTCHAToken = '';
            this.userName = value.f_name;
            this.modalService.open(this.modalContent);
          }
        });
      }
    }
  }

  open(content: any) {
    this.modalService.open(content);
  }

}
