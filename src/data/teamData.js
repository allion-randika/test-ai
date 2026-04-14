// Dynamic team data for Thunderbolts Cricket Club - Season 2026

export const teamInfo = {
  name: 'Thunderbolts Cricket Club',
  founded: 2018,
  division: 'Softball Division A',
  homeGround: 'Oakwood Park Stadium',
  totalPlayers: 24,
  captain: 'Rahul Sharma',
  viceCaptain: 'James Mitchell',
  coach: 'Michael Thompson'
}

export const seasonStats = {
  matchesPlayed: 12,
  matchesWon: 8,
  matchesLost: 3,
  matchesDrawn: 1,
  runRate: 8.42,
  highestScore: 186,
  lowestScore: 98,
  totalRunsScored: 1924,
  totalWicketsLost: 89,
  avgBatingScore: 32.4,
  bestBowlingFigure: '5/18'
}

export const playerStats = [
  { id: 1, name: 'Virat Patel', role: 'Batsman', matches: 12, runs: 456, avg: 41.5, sr: 142.3, wickets: 2, position: 'Opener' },
  { id: 2, name: 'James Mitchell', role: 'All-rounder', matches: 12, runs: 387, avg: 35.2, sr: 138.7, wickets: 18, position: 'Captain' },
  { id: 3, name: 'Rahul Sharma', role: 'Batsman', matches: 11, runs: 342, avg: 38.0, sr: 135.2, wickets: 0, position: 'Opener' },
  { id: 4, name: 'David Chen', role: 'All-rounder', matches: 12, runs: 298, avg: 27.1, sr: 145.8, wickets: 22, position: 'Middle Order' },
  { id: 5, name: 'Arjun Reddy', role: 'Bowler', matches: 10, runs: 156, avg: 19.5, sr: 120.0, wickets: 24, position: 'Bowler' },
  { id: 6, name: 'Michael Brooks', role: 'Wicket-keeper', matches: 12, runs: 234, avg: 21.3, sr: 128.4, wickets: 8, position: 'WK-Batsman' },
  { id: 7, name: 'Sanjay Kumar', role: 'Bowler', matches: 11, runs: 89, avg: 11.1, sr: 95.6, wickets: 19, position: 'Bowler' },
  { id: 8, name: 'Tom Wilson', role: 'Batsman', matches: 9, runs: 178, avg: 22.3, sr: 132.1, wickets: 0, position: 'Middle Order' },
  { id: 9, name: 'Kiran Iyer', role: 'All-rounder', matches: 12, runs: 145, avg: 14.5, sr: 118.3, wickets: 15, position: 'All-rounder' },
  { id: 10, name: 'Adam Singh', role: 'Bowler', matches: 8, runs: 67, avg: 8.4, sr: 88.9, wickets: 16, position: 'Bowler' },
  { id: 11, name: 'Chris Taylor', role: 'All-rounder', matches: 10, runs: 112, avg: 12.4, sr: 110.2, wickets: 12, position: 'All-rounder' },
  { id: 12, name: 'Priya Sharma', role: 'Batsman', matches: 7, runs: 98, avg: 16.3, sr: 125.6, wickets: 0, position: 'Middle Order' }
]

export const matchResults = [
  { id: 1, opponent: 'Eagles CC', date: '2026-03-15', result: 'Won', ourScore: '178/4', theirScore: '156/8', venue: 'Oakwood Park', manOfMatch: 'Virat Patel' },
  { id: 2, opponent: 'Royals XI', date: '2026-03-22', result: 'Won', ourScore: '165/6', theirScore: '142/9', venue: 'Riverside Ground', manOfMatch: 'David Chen' },
  { id: 3, opponent: 'Tigers SC', date: '2026-03-29', result: 'Lost', ourScore: '134/8', theirScore: '145/6', venue: 'Oakwood Park', manOfMatch: 'James Mitchell' },
  { id: 4, opponent: 'Phoenix Rising', date: '2026-04-05', result: 'Won', ourScore: '186/3', theirScore: '167/7', venue: 'Sunnyvale Park', manOfMatch: 'Rahul Sharma' },
  { id: 5, opponent: 'Warriors CC', date: '2026-04-12', result: 'Won', ourScore: '172/5', theirScore: '158/8', venue: 'Oakwood Park', manOfMatch: 'Arjun Reddy' },
  { id: 6, opponent: 'Lions Athletic', date: '2026-04-19', result: 'Won', ourScore: '189/4', theirScore: '176/6', venue: 'Central Stadium', manOfMatch: 'Virat Patel' },
  { id: 7, opponent: 'Eagles CC', date: '2026-04-26', result: 'Lost', ourScore: '98/10', theirScore: '112/6', venue: 'Eagles Ground', manOfMatch: 'Michael Brooks' },
  { id: 8, opponent: 'Dragons CC', date: '2026-05-03', result: 'Won', ourScore: '156/7', theirScore: '134/9', venue: 'Oakwood Park', manOfMatch: 'Sanjay Kumar' },
  { id: 9, opponent: 'Royals XI', date: '2026-05-10', result: 'Won', ourScore: '168/5', theirScore: '145/8', venue: 'Oakwood Park', manOfMatch: 'James Mitchell' },
  { id: 10, opponent: 'Falcons SC', date: '2026-05-17', result: 'Won', ourScore: '175/6', theirScore: '162/9', venue: 'Falcons Ground', manOfMatch: 'David Chen' },
  { id: 11, opponent: 'Tigers SC', date: '2026-05-24', result: 'Lost', ourScore: '127/9', theirScore: '134/7', venue: 'Tigers Arena', manOfMatch: 'Arjun Reddy' },
  { id: 12, opponent: 'Phoenix Rising', date: '2026-05-31', result: 'Draw', ourScore: '156/8', theirScore: '156/8', venue: 'Phoenix Park', manOfMatch: 'Rahul Sharma' }
]

export const upcomingMatches = [
  { id: 13, opponent: 'Stars United', date: '2026-06-07', time: '10:00 AM', venue: 'Oakwood Park' },
  { id: 14, opponent: 'Knights CC', date: '2026-06-14', time: '2:00 PM', venue: 'Knights Ground' },
  { id: 15, opponent: 'Vikings SC', date: '2026-06-21', time: '10:00 AM', venue: 'Oakwood Park' },
  { id: 16, opponent: 'Titans XI', date: '2026-06-28', time: '11:30 AM', venue: 'Titans Arena' }
]

export const battingPerformance = [
  { match: 'vs Eagles', runs: 178, wickets: 4, result: 'Won' },
  { match: 'vs Royals', runs: 165, wickets: 6, result: 'Won' },
  { match: 'vs Tigers', runs: 134, wickets: 8, result: 'Lost' },
  { match: 'vs Phoenix', runs: 186, wickets: 3, result: 'Won' },
  { match: 'vs Warriors', runs: 172, wickets: 5, result: 'Won' },
  { match: 'vs Lions', runs: 189, wickets: 4, result: 'Won' },
  { match: 'vs Eagles', runs: 98, wickets: 10, result: 'Lost' },
  { match: 'vs Dragons', runs: 156, wickets: 7, result: 'Won' },
  { match: 'vs Royals', runs: 168, wickets: 5, result: 'Won' },
  { match: 'vs Falcons', runs: 175, wickets: 6, result: 'Won' },
  { match: 'vs Tigers', runs: 127, wickets: 9, result: 'Lost' },
  { match: 'vs Phoenix', runs: 156, wickets: 8, result: 'Draw' }
]

export const bowlingPerformance = [
  { match: 'vs Eagles', overs: 18, runs: 42, wickets: 5 },
  { match: 'vs Royals', overs: 18, runs: 56, wickets: 3 },
  { match: 'vs Tigers', overs: 18, runs: 67, wickets: 4 },
  { match: 'vs Phoenix', overs: 18, runs: 48, wickets: 6 },
  { match: 'vs Warriors', overs: 18, runs: 38, wickets: 4 },
  { match: 'vs Lions', overs: 18, runs: 52, wickets: 5 },
  { match: 'vs Eagles', overs: 18, runs: 45, wickets: 3 },
  { match: 'vs Dragons', overs: 18, runs: 61, wickets: 7 },
  { match: 'vs Royals', overs: 18, runs: 44, wickets: 4 },
  { match: 'vs Falcons', overs: 18, runs: 58, wickets: 5 },
  { match: 'vs Tigers', overs: 18, runs: 71, wickets: 4 },
  { match: 'vs Phoenix', overs: 18, runs: 63, wickets: 5 }
]

export const awardsData = {
  topRunScorer: { name: 'Virat Patel', runs: 456, matches: 12 },
  highestIndividualScore: { name: 'Virat Patel', score: 89, opponent: 'Lions Athletic', date: '2026-04-19' },
  bestBowlingFigure: { name: 'Arjun Reddy', figure: '5/18', opponent: 'Eagles CC', date: '2026-03-15' },
  mostWickets: { name: 'Arjun Reddy', wickets: 24, matches: 10 },
  bestBatsman: { name: 'Virat Patel', avg: 41.5 },
  bestBowler: { name: 'David Chen', economy: 5.8, wickets: 22 },
  bestAllRounder: { name: 'James Mitchell', runs: 387, wickets: 18 },
  playerOfSeason: { name: 'Virat Patel', contributions: 8 }
}

export const teamRanking = {
  division: 'Softball Division A',
  position: 2,
  totalTeams: 10,
  points: 17,
  nrr: '+0.84'
}
