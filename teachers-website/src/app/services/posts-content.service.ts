import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from './user-service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
/* Service to send request to add, retrieve and save posts and corresponding content from user */
export class PostsContentService {

  /* URL Endpoint */
  private readonly endpoint = 'http://localhost:3000/posts';

  constructor(private http: HttpClient, private userService: UserService) {
  }

  /* Adds a post with empty content to mongodb utilizing posts mongoose schema (see posts.js under models)
  Contract:
  Request body contains:
   - userID of poster
   Expected Response:
   - post_id: the added post's objectID
   - message: success or error message
   - status: error or success */
  public addPost(): Promise<any> {
    const userID = this.userService.getStoredLoggedInUsername();
    console.log('sending request to add new Post with userID: ', userID);
    return this.http.post(this.endpoint.concat('/addPost'), {post_userID: userID},
      {}).toPromise();
  }

  /* Add Post with non-empty content, similar to /AddPost above, but a content array with properties below is provided
  * Request body contains:
      - userID of poster
      - content array with each item in the array containing these properties:
          - mediaObj: The media buffer
          - mediaType: Type of the media
          - userMediaTitle: Title of the media content
          - userMediaDescription: Description of the media content
          - authorUserID: the originating author of this media
     Response:
     - post_id: the added post's objectID
     - message: success or error message
     - status: error or success
     - the post document
     */
  public addPostWithContent(contentArray: any): Promise<any> {
    const userID = this.userService.getStoredLoggedInUsername();
    const body = {
      post_userID: userID,
      content: contentArray
    };
    return this.http.post(this.endpoint.concat('/addPostWithContent'), body,
      {}).toPromise();
  }


  /* Add a single media Content to a Post
   Request body contains:
   - postObjID: objectID of the post
  - mediaObj: he media buffer
  - mediaType: of the media
  - userMediaTitle: of the media content
  - userMediaDescription: of the media content
  - authorUserID: the originating author of this media */
  public addContentMedia(postObjectID: string, content: any, contentType: string, title, description) {
    const userID = this.userService.getStoredLoggedInUsername();
    const body = {
      postObjID: postObjectID,
      mediaObj: content,
      mediaType: contentType,
      userMediaTitle: title,
      userMediaDescription: description,
      authorUserID: userID
    };
    return this.http.post(this.endpoint.concat('/addContentMedia'), body,
      {}).toPromise();
  }


  /* Retrieve Posts that match a search term - the search term will be matched against a Post's content title and
  * content description, the search term will also match against uploaded file types such as "ex.pdf" */
  public getPostSearchResults(searchTerm: any): Promise<any> {
    console.log('creating request for search results: ', searchTerm);
    const body = {term: searchTerm};
    return this.http.post(this.endpoint.concat('/searchPosts'), body, {}).toPromise();
  }


  // tslint:disable-next-line:variable-name
  public getPostById(postId: any): Promise<any> {
    console.log('creating request to get Post by ID: ', postId);
    return this.http.get(this.endpoint.concat('/getPostById'), {params: {id: postId}}).toPromise();
  }
}
