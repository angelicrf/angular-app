import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent} from './components/user/user.component';
import { UsersComponent } from './components/users/users.component';
import {FormsModule} from '@angular/forms';
import {DataService} from './services/data.service';
import { PostsComponent } from './components/posts/posts.component';
import {PostService} from './services/post.service';
import {HttpClientModule} from '@angular/common/http';
import { PostFormComponent } from './components/post-form/post-form.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    UsersComponent,
    PostsComponent,
    PostFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [DataService, PostService],
  bootstrap: [AppComponent]
})
export class AppModule { }
