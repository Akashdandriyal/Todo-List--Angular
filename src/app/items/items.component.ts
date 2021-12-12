import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ItemsInterface } from '../interfaces/items-interface';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  @Input() item:any;
  @Output() deleteItemEvent = new EventEmitter<ItemsInterface>();
  @Output() updateItemEvent = new EventEmitter<ItemsInterface>();
  @Output() addSubItemEvent = new EventEmitter<ItemsInterface>();
  edit: boolean = false;
  subItem: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.updateComplete();
  }

  deleteItem(item:ItemsInterface): void{
    console.log(item);
    this.deleteItemEvent.emit(item);
  }

  editItem(): void{
    this.edit = !this.edit;
  }

  saveEdit(): void{
    let result = confirm('Save the edit?');
    if(result) {
      this.editItem();
      this.updateItemEvent.emit(this.item);
    }
  }

  addItem(): void{
    this.subItem = !this.subItem;
  }

  addSubItem(form: NgForm): void{
    console.log(form);
    this.addItem();
    if(this.item.child){
      this.item.child.push({
        id: new Date().getTime(),
        value: form.value.newSubItem,
        completed: false
      });
    }
    else {
      this.item.child = [{
        id: new Date().getTime(),
        value: form.value.newSubItem,
        completed: false
      }];
    }
    this.updateComplete();
    this.addSubItemEvent.emit(this.item);
  }

  deleteSubItem(subItem: any): void {
    console.log(subItem);
    let result = confirm('Are you sure, you want to delete this item?');
    if(result) {
      this.item.child = this.item.child.filter((i: any) => i.id != subItem.id);
      console.log(this.item);
      this.updateComplete();
      this.updateItemEvent.emit(this.item);
    }
  }

  someComplete(): boolean {
    return this.item.child?.filter((i: ItemsInterface) => i.completed).length > 0 && !this.item.completed;
  }

  setAll(completed: boolean) {
    this.item.completed = completed;
    this.item.child?.map((child: ItemsInterface) => {
      child.completed = completed;
      return child;
    });
    this.updateItemEvent.emit(this.item);
  }

  updateComplete() {
    if(this.item.child)
    this.item.completed = this.item.child.every((i: ItemsInterface) => i.completed);
  }

  setChild() {
    this.updateComplete();
    this.updateItemEvent.emit(this.item);
  }
}
