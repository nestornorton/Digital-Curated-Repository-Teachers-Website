import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PostsContentService} from '../../services/posts-content.service';
import {Router} from '@angular/router';
import {NgbTypeaheadSelectItemEvent} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public username;

  public PostIDList: any[] = [];

  public postList: any[];

  public searchResults: any[] = [];

  constructor(private userService: UserService, private postContentService: PostsContentService, private router: Router) {
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['/Login']);
    } else {
      this.username = this.userService.getStoredLoggedInUsername();

      /* Get All Post IDs the User currently has and display as table */
      this.userService.getUserPostIDs().then((response) => {
        console.log('Response Retrieved Post ID List: ', response);
        this.PostIDList = response.content;
        this.postList = [];
        this.PostIDList.forEach(async (item) => {
          this.postList.unshift(await this.postContentService.getPostById(item.id));
        });

        console.log('PostList: ', this.postList);
      });
    }
  }

  search = (text$: Observable<string>) =>
    // text.pipe executes a series of functions in order of arguments provided, each function returns Observable that
    // must be finished to move on to next function, map() function projects a function on each search stream and
    // returns a observable for completion
    text$.pipe(
      debounceTime(100),
      distinctUntilChanged(), map((term) => {
        if (term.length > 2) {
          this.getPostSearchResults(term);
          return this.searchResults;
        } else {
          return [];
        }
      }))

  /* Format Popup Search Results */
  public formatter(x: any): any {
    return x.content[0].userMediaTitle.concat(' ', x.content[0].userMediaDescription);
  }

  /* Formats the input value */
  public inputValFormatter = (x: any) => x.content[0].userMediaTitle + ' ' + x.content[0].userMediaDescription;

  /* Returns completed searchResults */
  private getPostSearchResults(term?: any) {
    console.log('term recvd: ', term);
    this.postContentService.getPostSearchResults(term).then((res) => {
      this.searchResults = res;
    });
  }


  public onSearchItemSelection($event: NgbTypeaheadSelectItemEvent) {
    console.log('clicked search item: ', $event.item);
    // navigate to view post component with the _id of this post
    this.router.navigate(['/Viewing/'.concat($event.item._id)]);
  }

  onPostIdClick($event) {
    console.log('user clicked on PostID, navigating to view post component: ', $event.target.innerText);
    // navigate to post component with the post _id clicked
    this.router.navigate(['/Viewing/'.concat($event.target.innerText)]);
  }
}
