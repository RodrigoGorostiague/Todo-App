import { Component, Inject, Injector, computed, effect, inject, signal } from '@angular/core';
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
  tasks = signal<Task[]>([])

  filter = signal<'all' | 'pending' | 'completed'>('all');

  tasksFiltered = computed(() => {
    const filter = this.filter();
    const tasks = this.tasks();
    switch (filter) {
      case 'all':
        return tasks;
      case 'completed':
        return tasks.filter(task => task.done);
      case 'pending':
        return tasks.filter(task => !task.done);
      default:
        return tasks;
    }
  })

  newTaskCtrl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.required,

    ]
  });

  inhector = inject(Injector);
  
  ngOnInit(){
    const tasks = localStorage.getItem('tasks');
    if(tasks) {
      this.tasks.set(JSON.parse(tasks));
    }
    this.trackTasks();
  }

  trackTasks(){
    effect(() => {
      const task =  this.tasks();
      localStorage.setItem('tasks', JSON.stringify(task));
    }, { injector: this.inhector})
  }

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

  escape() {
    
    this.tasks.update((tasks) => {
      return tasks.map((task) => {
        return {
          ...task,
          editing: false,
        };
      })
    });
  } 

  changeFilter(filter: 'all' | 'pending' | 'completed') {
    this.filter.set(filter);
  }
}
