export interface GitHubStats {
  username: string;
  stats: {
    totalStars: number;
    totalCommits: number;
    totalPRs: number;
    totalIssues: number;
    contributedTo: number;
    followers: number;
    following: number;
    publicRepos: number;
    streak: number;
  };
  topLanguages: Array<{
    name: string;
    percentage: number;
    color: string;
  }>;
}

// Replace 'Skpow1234' with your actual GitHub username
export const githubConfig = {
  username: 'Skpow1234',
  // You can customize these URLs or use GitHub's API directly
  statsUrl: 'https://github-readme-stats.vercel.app/api?username=Skpow1234&show_icons=true&theme=transparent&hide_border=true&bg_color=00000000',
  topLanguagesUrl: 'https://github-readme-stats.vercel.app/api/top-langs/?username=Skpow1234&layout=compact&theme=transparent&hide_border=true&bg_color=00000000',
  contributionGraphUrl: 'https://github-readme-activity-graph.vercel.app/graph?username=Skpow1234&theme=transparent&hide_border=true&bg_color=00000000',
  // GitHub Snake Animation
  snakeUrl: 'https://raw.githubusercontent.com/Platane/snk/output/github-contribution-grid-snake.svg',
  // GitHub Profile Summary Cards
  summaryCardUrl: 'https://github-profile-summary-cards.vercel.app/api/cards/profile-details?username=Skpow1234&theme=transparent',
  reposCardUrl: 'https://github-profile-summary-cards.vercel.app/api/cards/repos-per-language?username=Skpow1234&theme=transparent',
  commitsCardUrl: 'https://github-profile-summary-cards.vercel.app/api/cards/most-commit-language?username=Skpow1234&theme=transparent',
  statsCardUrl: 'https://github-profile-summary-cards.vercel.app/api/cards/stats?username=Skpow1234&theme=transparent',
  productiveTimeUrl: 'https://github-profile-summary-cards.vercel.app/api/cards/productive-time?username=Skpow1234&theme=transparent',
  // GitHub Profile README
  profileReadmeUrl: 'https://github-readme-stats.vercel.app/api?username=Skpow1234&show_icons=true&theme=transparent&hide_border=true&bg_color=00000000&include_all_commits=true&count_private=true&show_owner=true',
};
