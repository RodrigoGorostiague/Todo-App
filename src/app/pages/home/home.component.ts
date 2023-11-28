import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  tasks = signal<Task[]>([
    {
      id: Date.now(),
      title: "Instalar Angular CLI",
      done: false
    },
    {
      id: Date.now(),
      title: "Crear proyecto",
      done: false
    },
    {
      id: Date.now(),
      title: "Crear componentes",
      done: false
    },
    {
      id: Date.now(),
      title: "Crear servicios",
      done: false
    },
    {
      id: Date.now(),
      title: "Crear pipes",
      done: false
    },
  ])

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,

    ]
  });

  changeHandler() {
    if(this.newTaskCtrl.valid) {
      const value = this.newTaskCtrl.value.trim();
      if(value !== '') {

      this.addTask(value);

      this.newTaskCtrl.reset();
      }
      else{
        this.newTaskCtrl.reset();
      }

    }
  }

  addTask(title: string) {
    const newTask: Task = {
      id: Date.now(),
      title,
      done: false
    }
    this.tasks.update((tasks) => [...tasks, newTask]);
  }

  deleteTask(index: number) {
    this.tasks.update((tasks) => tasks.filter((task, position) => position !== index));
  }

  taskComplete(index: number) {
    console.log(index);
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            done: !task.done
          }
        }
        return task;
      })
    });
  }
  updateTaskEdit(index: number) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index && !task.done) {
          return {
            ...task,
            editing: true,
          }
        }
        return {
          ...task,
          editing: false,
        };
      })
    });
  }

  updateTaskText(index: number, event: Event) {
    this.tasks.update((tasks) => {
      return tasks.map((task, position) => {
        if (position === index) {
          return {
            ...task,
            title: (event.target as HTMLInputElement).value,
            editing: false,
          }
        }
        return {
          ...task,
          editing: false,
        };
      })
    });
  }
}
