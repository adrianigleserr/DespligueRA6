// En src/app/app.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    RouterModule,    // Para routerLink
    HttpClientModule,
    FormsModule   // ← Nombre correcto
  ],
  template: `
    <div class="container">
      <header>
        <h1>📚 Biblioteca Digital</h1>
        <nav>
          <a routerLink="/" routerLinkActive="active">Lista de Libros</a>
          <a routerLink="/new" routerLinkActive="active">Agregar Libro</a>
        </nav>
      </header>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: [`
    .container { max-width: 1000px; margin: 0 auto; padding: 20px; }
    header { margin-bottom: 30px; }
    h1 { color: #2c3e50; }
    nav { margin-top: 15px; }
    nav a { 
      margin-right: 15px; 
      color: #3498db; 
      text-decoration: none;
      padding: 5px 10px;
      border-radius: 4px;
    }
    nav a:hover { background-color: #f0f8ff; }
    nav a.active { 
      background-color: #3498db; 
      color: white;
    }
  `]
})
export class App {
  title = 'library_app';
}