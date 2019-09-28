import {Component, OnInit} from '@angular/core';
import {PostsContentService} from '../../services/posts-content.service';
import {UserService} from '../../services/user-service';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  constructor(private postContentService: PostsContentService, private userService: UserService) {
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
    if (files.length === 0) {
      return;
    }

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

  /* Adds a Post initially with empty content, and then loops through a content array and adds each content media item
  * to the newly created Post */
  public addPost() {
    // for now, just hit this endpoint to make sure it works in console output
    this.postContentService.addPost().then((response) => {
      console.log('/addPost response:', response);

      // retrieve objectID of post from response
      const postID = response.post_id;

      // for now, hitting addContentMedia endpoint to test if content media being added in correct post doc
      this.postContentService.addContentMedia(postID, 'Empty Content', 'Text',
        'Title', 'Description').then((res) => {
        console.log('/addContentMedia response:', res);

      }).catch((error) => {
        console.error('/addContentMedia Error:', error);
      });

    }).catch((error) => {
      console.error('/addPost Error:', error);
    });
  }

  /* method will send the entire content array with the properties needed for each content item
   @see postContentService.addPostWithContent()
   Each item in the content array must contain these properties:
   - mediaObj: The media buffer in binary (see BLOB topic)
   - mediaType: Type of the media
   - userMediaTitle: Title of the media content
   - userMediaDescription: Description of the media content
   - authorUserID: the originating author of this media */
  public addPostWithContentArray() {
    // todo: example content array below, to remap a existing content array like in for loop fashion to a
    //  new array with properties needed, see the .map( (item) => {} function in typescript that will return a new array
    const content = [
      {
        mediaObj: 'Binary stuff - 12u90jgbn93012ngnbidmasv-220gnibfbondkoefm0122340gbbbbb030b303',
        mediaType: 'Example Media Type',
        userMediaTitle: 'Title of Media',
        userMediaDescription: 'Description of media',
        authorUserID: this.userService.getStoredLoggedInUsername()
      }];

    this.postContentService.addPostWithContent(content).then((res) => {
      console.log('/addPostWithContent response:', res);
      const PostIDtoSaveIntoUser = res.post_id;
      this.userService.storePostID(PostIDtoSaveIntoUser).then((response) => {
        console.log('saved Post ID response: ', response);
      });
    }).catch((error) => {
      console.error('/addPostWithContent Error:', error);
    });
  }


  /* todo: save the post id in the user's content[] array mongodb document */
  public saveUsersPost(postID: any) {
    // todo: call user Service to save the postID user's doc in mongodb
  }
}
