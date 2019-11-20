import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Params } from "@angular/router";
import {PostsContentService} from '../../services/posts-content.service';
import {UserService} from '../../services/user-service';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-viewing',
  templateUrl: './viewing.component.html',
  styleUrls: ['./viewing.component.scss']
})
export class ViewingComponent implements OnInit {

  // Dynamic parameters for this component's route: /example-params/:first/:second
  routeParams: Params;

  // Query parameters found in the URL: /example-params/one/two?query1=one&query2=two
  queryParams: Params;
 
  contentArray: any[] = [];

  imageArray: any[] = [];
  imageURL: any;

  pdfArray: any[] = [];

  // @ViewChild('preview') preview: ElementRef;

  constructor(
    private activatedRoute: ActivatedRoute, private userService: UserService, private postContentService: PostsContentService, private sanitizer: DomSanitizer
  ) {
      this.getRouteParams();
  }


  ngOnInit() {
    //Get data from MongoDB then put in contentArray
    this.postContentService.getPostById(this.routeParams.id).then((response) => {
      // console.log(response.content)
      var temp = response.content;
      this.contentArray = [];
      temp.forEach(async (item) => {
        this.contentArray.push(item);
        if (item.mediaType == 'image/png') {
          this.imageArray.push(item)
        } else if (item.mediaType == 'application/pdf') {
          this.pdfArray.push(item);
        }
      });
      console.log(this.contentArray);
    });
    
    //Make empty divs/containers given how many contents there are in the contentArray

  }

  getRouteParams() {

    // Route parameters
    this.activatedRoute.params.subscribe( params => {
        this.routeParams = params;
    });

    // URL query parameters
    this.activatedRoute.queryParams.subscribe( params => {
        this.queryParams = params;
    });
  }

  previewImage() {
    var curr = this.imageArray.shift();
    var reader = new FileReader();
    reader.readAsDataURL(curr.mediaObj);
    var base64data;
    reader.onloadend = function() {
      base64data = reader.result;
    }
    this.imageURL = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64data);
    console.log(this.imageURL);
  }

  previewFile() {
    var container = this.imageArray.shift();
    // var preview = document.querySelector(container.mediaType);
    var file    = document.querySelector(container.mediaObj);
    var reader  = new FileReader();
    reader.readAsDataURL(container.mediaObj);
    var base64data;
    reader.onloadend = function() {
      base64data = reader.result;
    }
    // this.imageURL = this.sanitizer.bypassSecurityTrustUrl('data:image/png;base64,' + base64data);


    var temp;
    console.log("hello");
  
    reader.addEventListener("load", function () {
      temp = reader.result;
    }, false);
    this.imageURL = temp;
  
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  // function previewFiles() {

  //   var preview = document.querySelector('#preview');
  //   var files   = document.querySelector('input[type=file]').files;
  
  //   function readAndPreview(file) {
  
  //     // Make sure `file.name` matches our extensions criteria
  //     if ( /\.(jpe?g|png|gif)$/i.test(file.name) ) {
  //       var reader = new FileReader();
  
  //       reader.addEventListener("load", function () {
  //         var image = new Image();
  //         image.height = 100;
  //         image.title = file.name;
  //         image.src = this.result;
  //         preview.appendChild( image );
  //       }, false);
  
  //       reader.readAsDataURL(file);
  //     }
  
  //   }
  
  //   if (files) {
  //     [].forEach.call(files, readAndPreview);
  //   }
  
  // }

}
