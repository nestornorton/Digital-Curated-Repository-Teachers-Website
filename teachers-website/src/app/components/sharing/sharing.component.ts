import {Component, OnInit} from '@angular/core';
import {PostsContentService} from '../../services/posts-content.service';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  constructor(private postContentService: PostsContentService) {
  }

  containers = [];
  private id: string;
  pdfId: string = '';

  // For embedding an image
  public imagePath;
  imageURL: any;
  public message: string;

  player: YT.Player;


  ngOnInit() {
  }

  // Adding another content
  add() {
    this.containers.push(this.containers.length);
  }

  previewImage(files) {
    if (files.length === 0)
      return;

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }

    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imageURL = reader.result;
    };
  }

  // For embedding Youtube video
  submitVideo(num1) {
    this.id = num1.split('v=')[1].substring(0, 11);
    console.log(this.id);
  }

  // private x: string = "https://www.youtube.com/watch?v=EDx1RIqRj-g&list=RDEDx1RIqRj-g&start_radio=1";
  // private vid_regex: string = "/(?:youtube(?:-nocookie)?\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)
  // |youtu\.be\/)([a-zA-Z0-9_-]{11})/";

  savePlayer(player) {
    this.player = player;
    // console.log('player instance', player);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }

  // For embedding PDF
  previewPDF() {
    const img: any = document.querySelector('#file');
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfId = e.target.result;
      };
      reader.readAsArrayBuffer(img.files[0]);
    }
  }

  public addPost() {
    // for now, just hit this endpoint to make sure it works in console output
    this.postContentService.addPost('');
  }
}
