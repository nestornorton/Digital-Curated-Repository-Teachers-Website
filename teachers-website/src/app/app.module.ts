import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule, Routes} from '@angular/router';
import {NgxYoutubePlayerModule} from 'ngx-youtube-player';
import {PdfViewerModule} from 'ng2-pdf-viewer';


import {AppComponent} from './app.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from './components/register/register.component';
import {HomeComponent} from './components/home/home.component';
import {ProfileComponent} from './components/profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {UserService} from './services/user-service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharingComponent} from './components/sharing/sharing.component';
import {PostsContentService} from './services/posts-content.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    SharingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgxYoutubePlayerModule.forRoot(),
    PdfViewerModule
  ],
  providers: [UserService, PostsContentService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
