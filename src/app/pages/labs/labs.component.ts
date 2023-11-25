import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.scss'
})
export class LabsComponent {
  title = 'Welcomje to Labs';
  tasks = [
    "Create a new Angular project",
    "Create a new component",
    "Create a new service",];

}
