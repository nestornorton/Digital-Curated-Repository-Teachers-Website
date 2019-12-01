import {Component, OnInit} from '@angular/core';
import {PostsContentService} from '../../services/posts-content.service';
import {UserService} from '../../services/user-service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-sharing',
  templateUrl: './sharing.component.html',
  styleUrls: ['./sharing.component.scss']
})
export class SharingComponent implements OnInit {

  constructor(private postContentService: PostsContentService, private userService: UserService, private router: Router) {
  }

  containers = [];
  // fileArray holds a list of  objects as { file: "{FileBinaryAsString}", type: "{mimetype}" }
  public fileArray: any[] = [];
  // titleAndDescriptions holds a list of objects as { title: "{file title}", description: "{desc}" }
  public titleAndDescriptions: any[] = [];

  // For embedding an image
  public imageUrlArray: any[] = [];
  public message: string;

  // youtube player links array - contains a string of the link for respective container with youtube links
  public youtubeLinksArray: any[] = [];

  // pdf array - contains pdfIds for displaying
  public pdfIdArray: any[] = [];

  // bool array for each container - once uploaded, container inputs (to upload stuff) will be removed from DOM
  public showContainerInputs: boolean[] = [];

  ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/Login']);
    } else {
      // initialize empty content arrays
      // this.youtubeLinksArray.push(undefined);
    }
  }

  /* Adds another container box
  For adding content, adds empty title and description to titleAndDescriptionArray, empty imageURL in imageUrlArr and
   add space for link in youtubeLinkArray and pdfIds Array for displaying pdf page, and showing container inputs is
    initially true until content is uploaded for respective container in which container inputs will then be hidden */
  add() {
    this.containers.push(this.containers.length);
    this.titleAndDescriptions.push({title: '', description: ''});
    this.imageUrlArray.push(undefined);
    this.youtubeLinksArray.push(undefined);
    this.pdfIdArray.push(undefined);
    this.showContainerInputs.push(true);
    console.log('state of arrays: ', this.youtubeLinksArray, 'imageUrl: ', this.imageUrlArray,
      this.titleAndDescriptions, 'containers: ', this.containers);
  }

  /* Add container Index for future feature of container deletion (and corresponding files deletion)*/
  previewImage(files, containerIndex) {
    if (files.length === 0) {
      return;
    }

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imageUrlArray[containerIndex] = reader.result;
      this.showContainerInputs[containerIndex] = false;
    };
    // save the binary of the file as string into fileArray
    this.saveFileAsBinaryString(files, mimeType, containerIndex);
  }


  // Add embedded Youtube video in the container given the full youtube link
  submitVideo(fullLink, containerIndex) {
    const id = fullLink.split('v=')[1].substring(0, 11);
    this.youtubeLinksArray[containerIndex] = id;
    this.showContainerInputs[containerIndex] = false;
    console.log('ID:  ', id, this.youtubeLinksArray);
    // add video meta and required attributes for file array
    const videoContent = {file: id, type: 'LinkID',};
    this.fileArray.push(videoContent);
  }

  savePlayer(player) {
    // this.player = player;
    // console.log('player instance', player);
  }

  onStateChange(event) {
    // console.log('player state', event.data);
  }


  /* For embedding PDF (containerIndex used to keep track of which container has respective file(s)) */
  previewPDF(event: any, containerIndex?: number) {
    // extract Files array from input
    const pdfFile = event.target.files;
    console.log('event: ', event, event.target);
    if (typeof (FileReader) !== 'undefined') {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.pdfIdArray[containerIndex] = e.target.result;
        this.showContainerInputs[containerIndex] = false;
      };
      reader.readAsArrayBuffer(pdfFile[0]);
    }
    // save the binary of the file as string into fileArray
    this.saveFileAsBinaryString(pdfFile, containerIndex);
  }


  /* Saves file as Binary String - used for adding Post to backend later on */
  public saveFileAsBinaryString(files: any, mimeType?: any, containerIndex?: number) {
    // read the file as binary string to store in fileArray and send to backend API
    const newReader = new FileReader();
    newReader.readAsDataURL(files[0]);
    const fileType = files[0].type;
    // tslint:disable-next-line:only-arrow-functions
    newReader.onload = (event) => {
      console.log('Blob buffer array: ', newReader.result);
      const fileObj = {file: newReader.result, type: fileType};
      this.fileArray.push(fileObj);
      console.log('fileArray new file in binary: ', this.fileArray);
    };
  }


  /* Adds a Post initially with empty content, and then loops through a content array and adds each content media item
   * to the newly created Post */
  /*public addPost() {
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
  }*/

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
    const content = this.fileArray.map((fileObj, index) => {
      return {
        mediaObj: fileObj.file,
        mediaType: fileObj.type,
        userMediaTitle: this.titleAndDescriptions[index].title,
        userMediaDescription: this.titleAndDescriptions[index].description,
        authorUserID: this.userService.getStoredLoggedInUsername()
      };
    });
    console.log('Mapped fileArray to new content array with properties needed: ', content);
    this.postContentService.addPostWithContent(content).then((res) => {
      console.log('/addPostWithContent response:', res);
      const PostIDtoSaveIntoUser = res.post_id;
      this.userService.storePostID(PostIDtoSaveIntoUser).then((response) => {
        console.log('saved Post ID response: ', response);
        // navigate to view post component
        const url = '/Viewing/'.concat(PostIDtoSaveIntoUser);
        console.log('url:', url);
        this.router.navigateByUrl(url);
      });
    }).catch((error) => {
      console.error('/addPostWithContent Error:', error);
    });
  }
}
