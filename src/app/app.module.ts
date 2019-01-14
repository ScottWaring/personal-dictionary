import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }    from '@angular/forms';
import { HttpClientModule }  from '@angular/common/http';
import { WordService } from './word.service';
import { AppComponent } from './app.component';
import { WordComponent } from './word/word.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { DisplayComponent } from './display/display.component';

@NgModule({
  declarations: [
    AppComponent,
    WordComponent,
    SearchFormComponent,
    DisplayComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [WordService],
  bootstrap: [AppComponent]
})
export class AppModule { }
