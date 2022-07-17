import { Component } from '@angular/core';

@Component({
  selector: 'sentenceGenerator-root',
  template: `
  <nav class='navbar navbar-expand navbar-light bg-light'>
     <a class='navbar-brand' style="padding-left: 20px;">{{pageTitle}}</a>
     <ul class='nav nav-pills'>
       <li><a class='nav-link' routerLink='/welcome'>Home</a></li>
       <li><a class='nav-link' routerLink='/builder'>Builder</a></li>
       <li><a class='nav-link' routerLink='/viewer'>Viewer</a></li>
     </ul>
  </nav>
  <div class='container'>
   <router-outlet></router-outlet>
  </div>
  `
})

export class AppComponent {
  pageTitle: string = 'Sentence Generator';
}
