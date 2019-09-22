import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from "./user-service";

@Injectable({
  providedIn: 'root'
})
/* Service to send request to add, retrieve and save posts and corresponding content from user */
export class PostsContentService {

  /* URL Endpoint */
  private readonly endpoint = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  /* Adds a empty post with empty content to mongodb utilizing posts mongoose schema (see posts.js under models)
  Contract:
  Request body contains:
   - userID of poster
   Expected Response:
   - the added post's objectID with success message
   */
  public addPost(content: any) {
    const userID = this.userService.getStoredLoggedInUsername();
    console.log('sending request to add new Post with userID: ', userID);
    this.http.post(this.endpoint.concat('/addPost'), {post_userID: userID},
      {}).toPromise().then((response) => {
      console.log('/addPost response:', response);
    }).catch((error) => {
      console.error('/addPost Error:', error);
    });
  }
}
