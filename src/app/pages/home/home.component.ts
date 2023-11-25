import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal([
    "Instalar Angular CLI",
    "Crear nuevo proyecto",
    "Crear componentes",
    "Crear servicios",
    "Crear pipes",
  ])

  changeHandler(event: Event) {
    let inputValue = (event.target as HTMLInputElement).value;

    this.tasks.update((tasks) => [...tasks, inputValue]);

    inputValue = '';
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }
}
