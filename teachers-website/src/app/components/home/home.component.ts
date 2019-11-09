import {Component, OnInit} from '@angular/core';
import {UserService} from '../../services/user-service';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {PostsContentService} from '../../services/posts-content.service';
import {Router} from '@angular/router';

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
          this.postList.push(await this.postContentService.getPostById(item.id));
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
      debounceTime(200),
      distinctUntilChanged(), map((term) => {
        if (term.length > 2) {
          this.getPostSearchResults(term);
          return this.searchResults;
        } else {
          return [];
        }
      }))

  /* Returns completed searchResults */
  private getPostSearchResults(term?: any) {
    console.log('term recvd: ', term);
    this.postContentService.getPostSearchResults(term).then((res) => {
      this.searchResults = res.map((item) => {
        return item.content[0].userMediaTitle.concat(' ', item.content[0].userMediaDescription);
      });
    });
  }


}
