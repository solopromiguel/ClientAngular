import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ValueComponent } from './value/value.component';
import { FileUploadModule } from 'ng2-file-upload';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';

// Angular Material
import {MatBadgeModule} from '@angular/material/badge';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatTableModule} from '@angular/material/table';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';




import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './_service/auth.service';
import {TransitionService } from './_service/transition.service';
import { ErrorInterceptorProvider } from './_service/error.interceptor';
import { AlertifyService } from './_service/alertify.service';
import { TestService } from './_service/test.service';
import { NavComponent } from './nav/nav.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_guards/auth.guard';
import { FilesComponent } from './modulos/files/files.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MemberDetailComponent } from './modulos/members/member-detail/member-detail.component';
import { MemberEditComponent } from './modulos/members/member-edit/member-edit.component';
import {SuiModule} from 'ng2-semantic-ui';
import { FooterComponent } from './common/footer/footer.component';

export function tokenGetter() {
   return localStorage.getItem('token');
 }

@NgModule({
   declarations: [
      AppComponent,
      ValueComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      FilesComponent,
      MemberDetailComponent,
      MemberEditComponent,
      FooterComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      MatTableModule,
      MatProgressSpinnerModule,
      MatStepperModule,
      MatBadgeModule,
      MatCheckboxModule,
      MatInputModule,
      MatFormFieldModule,
      MatToolbarModule,
      MatButtonModule,
      ReactiveFormsModule,
      MatPaginatorModule,
      MatCardModule,
      MatSelectModule,
      MatIconModule,
      MatMenuModule,
      MatGridListModule,
      FormsModule,
      MatChipsModule,
      MatTabsModule,
      RouterModule.forRoot(appRoutes),
      FileUploadModule,
      SuiModule,
      JwtModule.forRoot({
         config: {
           tokenGetter,
           whitelistedDomains: ['localhost', 'localhost:44317'],
           blacklistedRoutes: ['localhost:4200/api/auth', 'localhost/api/auth']
         }
       })
   ],
   providers: [
      AuthService,
      TransitionService,
      ErrorInterceptorProvider,
      AlertifyService,
      TestService,
      AuthGuard
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
