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
  private id: string;
  constructor() { }
  private youtube

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
  
  //Embed Youtube video
  submitVideo(num1) {
    this.id = num1.split("v=")[1].substring(0,11);
    console.log(this.id);
  }
  player: YT.Player;
  // private x: string = "https://www.youtube.com/watch?v=EDx1RIqRj-g&list=RDEDx1RIqRj-g&start_radio=1";
  // private vid_regex: string = "/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/";
  
  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }
  onStateChange(event) {
    // console.log('player state', event.data);
  }

}
