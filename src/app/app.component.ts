import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OnInit } from '@angular/core';
import { ItemsInterface } from './interfaces/items-interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  data?: ItemsInterface[];
  edit: boolean = false;
  allComplete: boolean = false;
  ngOnInit() {
    let fetchedData = localStorage.getItem('items');
    if(fetchedData){
      this.data = JSON.parse(fetchedData);
      if(this.data){
        this.allComplete = this.data.every((i: ItemsInterface) => i.completed);
      }
    }
  }

  addItem(item: NgForm): void {
    console.log(item.value);
    if(this.data != null) {
      this.data.push({
        id: new Date().getTime(),
        value: item.value.newItem,
        completed: false
      });
    }
    else {
      this.data = [{
        id: new Date().getTime(),
        value: item.value.newItem,
        completed: false
      }];
    }
    localStorage.setItem('items', JSON.stringify(this.data));
    this.updateComplete();
  }

  deleteItem(item:ItemsInterface): void {
    console.log(item);
    let result = confirm('Are you sure, you want to delete this item?');
    if(result) {
      this.data = this.data?.filter((i:ItemsInterface) => i.id != item.id);
      localStorage.setItem('items', JSON.stringify(this.data));
      this.updateComplete();
    }
  }

  updateItem(item:ItemsInterface): void {
    this.data = this.data?.map((i:any) => {
      if(i.id == item.id){
        i.value = item.value;
      }
      return i;
    });
    localStorage.setItem('items', JSON.stringify(this.data));
    this.updateComplete();
  }

  addSubItem(item:ItemsInterface): void {
    this.data = this.data?.map((i:any) => {
      if(i.id == item.id) {
        return item;
      }
      else { 
        return i;
      }
    });
    localStorage.setItem('items', JSON.stringify(this.data));
    this.updateComplete();
  }

  someComplete(): boolean {
    if(this.data){
      return this.data?.filter((i: ItemsInterface) => i.completed).length > 0 && !this.allComplete;
    }
    else{
      return false;
    }
  }

  setAll(complete: boolean): void {
    this.allComplete = complete;
    this.data = this.data?.map((item: ItemsInterface) => {
      item.completed = complete;
      item.child?.map((child: ItemsInterface) => {
        child.completed = complete;
        return child;
      })
      return item;
    });
    localStorage.setItem('items', JSON.stringify(this.data));
  }

  updateComplete() {
    if(this.data)
    this.allComplete = this.data.every((i: ItemsInterface) => i.completed);
  }
}
