import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  onFileSelected(event) {
    console.log(event);
  }

  containers = [];
  constructor() { }

  ngOnInit() {
  }
  //Adding another content
  add() {
    this.containers.push(this.containers.length);
  }

  //For embedding an image
  public imagePath;
  imageURL: any;
  public message: string;
 
  previewImage(files) {
    if (files.length === 0)
      return;
 
    var mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
 
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]); 
    reader.onload = (_event) => { 
      this.imageURL = reader.result; 
    }
  }

}
