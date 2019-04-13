import {Component} from '@angular/core';
import {SearchService} from './search.service';
import {GithubRepo} from './model/github-repo';
import {GithubSearchResult} from './model/github-search-result';
import {GithubRepoDetails} from './model/github-repo-details';
import {Animations} from '../helpers/animation-fly-in';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  animations: [Animations.flyIn]
})
export class SearchComponent {

  repoDetails: GithubRepoDetails;
  loading = false;
  notFound = false;
  isSearchInitialised = false;

  constructor(private service: SearchService) {
  }

  searchRepository(searchInput) {
    if (searchInput) {
      this.resetData();
      this.service.getSearchResults(searchInput).subscribe(
        (data: GithubSearchResult) => {
          if (data && data.items && data.items.length) {
            this.getRepoDetails(data.items[0]);
          } else {
            this.notFound = true;
            this.loading = false;
          }
        },
        error => {
          console.log(error);
          this.loading = false;
        }
      );
    }
  }

  private getRepoDetails(githubRepo: GithubRepo) {
    this.service.getRepoDetails(githubRepo.url).subscribe(
      (data: GithubRepoDetails) => {
        if (data) {
          this.repoDetails = data;
        }
        this.loading = false;
      },
      error => {
        console.log('Repo details not found');
        this.loading = false;
      }
    );
  }

  private resetData() {
    this.notFound = false;
    this.isSearchInitialised = true;
    this.loading = true;
    this.repoDetails = null;
  }

}
