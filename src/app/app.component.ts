import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from '@components/navbar/navbar.component';

@Component({
  selector: 'div.wrapper',
  templateUrl: './app.component.html',
  imports: [RouterOutlet, NavbarComponent],
})
export class AppComponent {}
