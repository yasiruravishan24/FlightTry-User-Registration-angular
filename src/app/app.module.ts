import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { RecaptchaV3Module, RECAPTCHA_V3_SITE_KEY } from 'ng-recaptcha';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { DocumentationComponent } from './components/documentation/documentation.component';
import { SignupComponent } from './components/signup/signup.component';
import { FaqComponent } from './components/faq/faq.component';
import { environment } from 'src/environments/environment';
import { UniqueEmailDirective } from './directives/unique-email.directive';
import { UniqueHostDirective } from './directives/unique-host.directive';

const appRoutes: Routes = [
  {
    path:'',
    component:HomeComponent,
  },
  {
    path:'signup',
    component:SignupComponent,
  },
  {
    path:'docs',
    component:DocumentationComponent,
  },
  {
    path:'faq',
    component:FaqComponent,
  },
  {
    path:'**',
    pathMatch:'full',
    component: PageNotFoundComponent,
  }
]


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    PageNotFoundComponent,
    DocumentationComponent,
    SignupComponent,
    FaqComponent,
    UniqueEmailDirective,
    UniqueHostDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes, {enableTracing: false}),
    ReactiveFormsModule,
    HttpClientModule,
    RecaptchaV3Module,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: RECAPTCHA_V3_SITE_KEY,
      useValue: environment.recaptcha.siteKey,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
