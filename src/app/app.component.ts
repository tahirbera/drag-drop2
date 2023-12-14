import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import {CdkDrag, CdkDragDrop, CdkDropList, DragDropModule, copyArrayItem, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule, DragDropModule, CdkDropList, CdkDrag],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
    newH1: string | undefined;
    newH2: string | undefined;
    newIMG: string | undefined;
    newText: string | undefined;

    getValues(val: any) 
    {
      this.newH1 = val.newH1;
      this.newH2 = val.newH2;
      this.newIMG = val.newIMG;
      this.newText = val.newText;

      console.log(val);
    }


    todo = ['Drop Here After Set Values Than Click On Them'];

    done = ['h1', 'h2', 'text', 'image'];
  
    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        
      } else if(event.container.id === 'todo-list') {
        copyArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      }
    }
    
    onItemClick(item: string) {
      // Add your logic here to modify the HTML structure based on the clicked item
      console.log(`Item clicked: ${item}`);
      // Example: Change the item to uppercase
      const index = this.todo.indexOf(item);
      if (index !== -1) {
        if (this.todo[index] === 'h1') {
          this.todo[index] = `<h1>${this.newH1}</h1>`;
        } else if (this.todo[index] === 'text') {
          this.todo[index] = `<div class="content"><p class="textA">${this.newText}</p></div>`;
        } else if (this.todo[index] === 'image') {
          this.todo[index] = `<img src=${this.newIMG}>`;
        } else if (this.todo[index] === 'h2') {
          this.todo[index] = `<h2>${this.newH2}</h2>`;
        }
      }
    }

    onDeleteClick(item: string) {
      const index = this.todo.indexOf(item);
      if (index !== -1) {
        this.todo.splice(index, 1); // Remove the item from the todo list
      }
    }

}
