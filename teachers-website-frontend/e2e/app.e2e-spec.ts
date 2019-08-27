import { TeachersWebsiteFrontendPage } from './app.po';

describe('teachers-website-frontend App', function() {
  let page: TeachersWebsiteFrontendPage;

  beforeEach(() => {
    page = new TeachersWebsiteFrontendPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
