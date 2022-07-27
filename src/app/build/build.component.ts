import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-build',
  templateUrl: './build.component.html',
  styleUrls: ['./build.component.css']
})
export class BuildComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  hyperParameters = new FormGroup({
    epochs: new FormControl(''),
    learning_rate: new FormControl(''),
    batch_size: new FormControl(''),
    optimizer: new FormControl('')
  });
}
