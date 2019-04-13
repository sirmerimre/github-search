import {TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {SearchService} from './search.service';
import {GithubSearchResult} from './model/github-search-result';
import {GithubRepoDetails} from './model/github-repo-details';
import {SearchComponent} from './search.component';

describe('GithubApiService', () => {

  let fixture;
  let component: SearchComponent;
  let service: SearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [SearchComponent],
      providers: [SearchService]
    });
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance; // BannerComponent test instance
    service = TestBed.get(SearchService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should return on search an Observable<GithubSearchResult>', () => {
    const searchQuery = 'atom';
    const dummySearchResult = {
      total_count: 25,
      incomplete_results: false,
      items: [{url: ''}]
    };

    service.getSearchResults(searchQuery).subscribe((result: GithubSearchResult) => {
      expect(result.items.length).toBe(1);
      expect(result).toEqual(dummySearchResult);
    });

    const req = httpMock.expectOne(`https://api.github.com/search/repositories?q=${searchQuery}`);
    expect(req.request.method).toBe('GET');
    req.flush(dummySearchResult);
  });

  it('should return on call an Observable<GithubRepoDetails>', () => {
    const repoUrl = 'https://api.github.com/repos/atom/atom';
    const dummyRepoDetail = {
      url: repoUrl
    };

    service.getRepoDetails(repoUrl).subscribe((result: GithubRepoDetails) => {
      expect(result.url).toBeDefined('Url not defined');
      expect(result.url).toEqual(dummyRepoDetail.url);
    });

    const req = httpMock.expectOne(repoUrl);
    expect(req.request.method).toBe('GET');
    req.flush(dummyRepoDetail);
  });

});
