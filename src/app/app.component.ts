import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Your Personal Dictionary';

  onSubmit(event: any) {
    event.preventDefault()
    console.log(event.target.search.value)
  }
}
