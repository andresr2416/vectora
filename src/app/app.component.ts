import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'banco-vectora';

  constructor(private router: Router) {}

  ngOnInit() {
    // Configuramos las rutas para que el router las use
    this.router.config = routes;
  }
}
