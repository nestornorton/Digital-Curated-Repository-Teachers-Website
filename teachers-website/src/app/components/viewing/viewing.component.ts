import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {PostsContentService} from '../../services/posts-content.service';
import {UserService} from '../../services/user-service';
import {DomSanitizer} from '@angular/platform-browser';


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

  constructor(
    private activatedRoute: ActivatedRoute, private userService: UserService,
    private postContentService: PostsContentService, private router: Router
  ) {
    this.getRouteParams();
  }


  ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/Login']);
    }
    // Get data from MongoDB then put in contentArray
    this.postContentService.getPostById(this.routeParams.id).then((response) => {
      console.log('response: ', response.content);
      const temp = response.content;
      this.contentArray = [];
      temp.forEach(async (item) => {
        this.contentArray.push(item);
      });
    });
  }

  getRouteParams() {

    // Route parameters
    this.activatedRoute.params.subscribe(params => {
      this.routeParams = params;
    });

    // URL query parameters
    this.activatedRoute.queryParams.subscribe(params => {
      this.queryParams = params;
    });
  }
}
