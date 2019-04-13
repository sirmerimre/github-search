export interface GithubRepoDetails {
  full_name: string;
  description: string;
  url: string;
  language: string;
  private: boolean;
  created_at: string;
  updated_at: string;
  stargazers_count: number;
  watchers_count: number;
  forks: number;
  subscribers_count: number;
  owner: { login: string, id: number, type: string, avatar_url: string };
  license: { spdx_id: string };
}
