import { Angular2Homework2Page } from './app.po';

describe('angular2-homework2 App', () => {
  let page: Angular2Homework2Page;

  beforeEach(() => {
    page = new Angular2Homework2Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
