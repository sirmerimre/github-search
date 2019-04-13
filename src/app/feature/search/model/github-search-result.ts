import {GithubRepo} from './github-repo';

export interface GithubSearchResult {
  total_count: number;
  incomplete_results: boolean;
  items: GithubRepo[];
}
