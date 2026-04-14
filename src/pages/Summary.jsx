import React from 'react'
import { 
  Trophy, 
  Award, 
  TrendingUp, 
  Target, 
  Users,
  Star,
  Flame,
  Shield,
  Calendar,
  Medal,
  Crown,
  Zap
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from 'recharts'
import { 
  teamInfo, 
  seasonStats, 
  playerStats, 
  matchResults, 
  battingPerformance,
  bowlingPerformance,
  awardsData,
  teamRanking
} from '../data/teamData'
import { format } from 'date-fns'

function Summary() {
  const sortedByRuns = [...playerStats].sort((a, b) => b.runs - a.runs)
  const sortedByWickets = [...playerStats].sort((a, b) => b.wickets - a.wickets)
  const sortedByAvg = [...playerStats].sort((a, b) => b.avg - a.avg)

  const teamComparison = [
    { name: 'Thunderbolts', runs: seasonStats.runRate * 20, wickets: seasonStats.totalWicketsLost },
    { name: 'Division Avg', runs: 7.2 * 20, wickets: 95 }
  ]

  return (
    <div className="summary">
      <div className="summary-header">
        <div className="header-content">
          <h1>Season Summary 2026</h1>
          <p>Thunderbolts Cricket Club - Complete Season Analysis</p>
        </div>
        <div className="season-badge">
          <Crown size={20} />
          <span>Softball Division A</span>
        </div>
      </div>

      {/* Hero Stats */}
      <div className="hero-stats">
        <div className="hero-stat main-stat">
          <div className="hero-stat-icon">
            <Trophy size={48} />
          </div>
          <div className="hero-stat-content">
            <span className="hero-stat-label">Season Position</span>
            <span className="hero-stat-value">#{teamRanking.position}</span>
            <span className="hero-stat-sub">of {teamRanking.totalTeams} teams</span>
          </div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-icon win">
            <TrendingUp size={32} />
          </div>
          <div className="hero-stat-content">
            <span className="hero-stat-label">Win Rate</span>
            <span className="hero-stat-value">{((seasonStats.matchesWon / seasonStats.matchesPlayed) * 100).toFixed(0)}%</span>
            <span className="hero-stat-sub">{seasonStats.matchesWon} victories</span>
          </div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-icon runs">
            <Flame size={32} />
          </div>
          <div className="hero-stat-content">
            <span className="hero-stat-label">Total Runs</span>
            <span className="hero-stat-value">{seasonStats.totalRunsScored}</span>
            <span className="hero-stat-sub">team total</span>
          </div>
        </div>
        <div className="hero-stat">
          <div className="hero-stat-icon wickets">
            <Target size={32} />
          </div>
          <div className="hero-stat-content">
            <span className="hero-stat-label">Wickets Taken</span>
            <span className="hero-stat-value">{seasonStats.totalWicketsLost}</span>
            <span className="hero-stat-sub">team total</span>
          </div>
        </div>
      </div>

      {/* Season Awards */}
      <div className="awards-section">
        <div className="section-header">
          <h2><Award size={24} /> Season Awards</h2>
        </div>
        <div className="awards-grid">
          <div className="award-card gold">
            <div className="award-icon">
              <Crown size={32} />
            </div>
            <div className="award-content">
              <span className="award-title">Player of the Season</span>
              <span className="award-winner">{awardsData.playerOfSeason.name}</span>
              <span className="award-detail">{awardsData.playerOfSeason.contributions} Man of Match awards</span>
            </div>
          </div>
          <div className="award-card">
            <div className="award-icon runs-icon">
              <Flame size={28} />
            </div>
            <div className="award-content">
              <span className="award-title">Top Run Scorer</span>
              <span className="award-winner">{awardsData.topRunScorer.name}</span>
              <span className="award-detail">{awardsData.topRunScorer.runs} runs in {awardsData.topRunScorer.matches} matches</span>
            </div>
          </div>
          <div className="award-card">
            <div className="award-icon wickets-icon">
              <Target size={28} />
            </div>
            <div className="award-content">
              <span className="award-title">Most Wickets</span>
              <span className="award-winner">{awardsData.mostWickets.name}</span>
              <span className="award-detail">{awardsData.mostWickets.wickets} wickets in {awardsData.mostWickets.matches} matches</span>
            </div>
          </div>
          <div className="award-card">
            <div className="award-icon score-icon">
              <Star size={28} />
            </div>
            <div className="award-content">
              <span className="award-title">Highest Individual Score</span>
              <span className="award-winner">{awardsData.highestIndividualScore.name}</span>
              <span className="award-detail">{awardsData.highestIndividualScore.score} runs vs {awardsData.highestIndividualScore.opponent}</span>
            </div>
          </div>
          <div className="award-card">
            <div className="award-icon bowling-icon">
              <Shield size={28} />
            </div>
            <div className="award-content">
              <span className="award-title">Best Bowling Figure</span>
              <span className="award-winner">{awardsData.bestBowlingFigure.name}</span>
              <span className="award-detail">{awardsData.bestBowlingFigure.figure} vs {awardsData.bestBowlingFigure.opponent}</span>
            </div>
          </div>
          <div className="award-card">
            <div className="award-icon allround-icon">
              <Zap size={28} />
            </div>
            <div className="award-content">
              <span className="award-title">Best All-Rounder</span>
              <span className="award-winner">{awardsData.bestAllRounder.name}</span>
              <span className="award-detail">{awardsData.bestAllRounder.runs} runs + {awardsData.bestAllRounder.wickets} wickets</span>
            </div>
          </div>
        </div>
      </div>

      {/* Player Statistics Table */}
      <div className="stats-section">
        <div className="section-header">
          <h2><Users size={24} /> Player Statistics</h2>
        </div>
        <div className="stats-table-container">
          <table className="stats-table">
            <thead>
              <tr>
                <th>Player</th>
                <th>Role</th>
                <th>Matches</th>
                <th>Runs</th>
                <th>Avg</th>
                <th>SR</th>
                <th>Wickets</th>
                <th>Position</th>
              </tr>
            </thead>
            <tbody>
              {playerStats.map((player) => (
                <tr key={player.id}>
                  <td className="player-name">{player.name}</td>
                  <td><span className="role-badge">{player.role}</span></td>
                  <td>{player.matches}</td>
                  <td className="highlight-value">{player.runs}</td>
                  <td>{player.avg.toFixed(1)}</td>
                  <td>{player.sr.toFixed(1)}</td>
                  <td className="highlight-value">{player.wickets}</td>
                  <td>{player.position}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Charts */}
      <div className="charts-section">
        <div className="section-header">
          <h2><TrendingUp size={24} /> Season Performance Analysis</h2>
        </div>
        <div className="charts-grid">
          <div className="chart-card full">
            <h3>Batting Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={battingPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="match" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="runs" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  dot={{ fill: '#f59e0b', r: 4 }}
                  name="Runs Scored"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <h3>Wickets Taken per Match</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={bowlingPerformance}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="match" stroke="#9ca3af" fontSize={10} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="wickets" fill="#10b981" name="Wickets" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="chart-card">
            <h3>Top 5 Run Scorers</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={sortedByRuns.slice(0, 5)} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={11} width={100} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="runs" fill="#f59e0b" name="Runs" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Match-by-Match Results */}
      <div className="results-section">
        <div className="section-header">
          <h2><Calendar size={24} /> Match-by-Match Results</h2>
        </div>
        <div className="results-table-container">
          <table className="results-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Opponent</th>
                <th>Venue</th>
                <th>Our Score</th>
                <th>Their Score</th>
                <th>Result</th>
                <th>Man of Match</th>
              </tr>
            </thead>
            <tbody>
              {matchResults.map((match) => (
                <tr key={match.id}>
                  <td>{format(new Date(match.date), 'MMM dd, yyyy')}</td>
                  <td className="opponent">{match.opponent}</td>
                  <td>{match.venue}</td>
                  <td className="our-score">{match.ourScore}</td>
                  <td className="their-score">{match.theirScore}</td>
                  <td>
                    <span className={`result-badge ${match.result.toLowerCase()}`}>
                      {match.result}
                    </span>
                  </td>
                  <td className="mom">{match.manOfMatch}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Season Highlights */}
      <div className="highlights-section">
        <div className="section-header">
          <h2><Medal size={24} /> Season Highlights</h2>
        </div>
        <div className="highlights-grid">
          <div className="highlight-card">
            <div className="highlight-number">186</div>
            <div className="highlight-label">Highest Team Score</div>
            <div className="highlight-detail">vs Phoenix Rising - April 5, 2026</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">5/18</div>
            <div className="highlight-label">Best Bowling Figure</div>
            <div className="highlight-detail">Arjun Reddy vs Eagles CC</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">89</div>
            <div className="highlight-label">Highest Individual Score</div>
            <div className="highlight-detail">Virat Patel vs Lions Athletic</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">8</div>
            <div className="highlight-label">Consecutive Wins</div>
            <div className="highlight-detail">Best winning streak this season</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">8.42</div>
            <div className="highlight-label">Team Run Rate</div>
            <div className="highlight-detail">Above division average of 7.2</div>
          </div>
          <div className="highlight-card">
            <div className="highlight-number">+0.84</div>
            <div className="highlight-label">Net Run Rate</div>
            <div className="highlight-detail">Strong positive NRR</div>
          </div>
        </div>
      </div>

      {/* Team Standing */}
      <div className="standing-section">
        <div className="section-header">
          <h2><Trophy size={24} /> Final Division Standing</h2>
        </div>
        <div className="standing-display">
          <div className="standing-team">
            <div className="team-position">#{teamRanking.position}</div>
            <div className="team-info">
              <div className="team-name">Thunderbolts CC</div>
              <div className="team-stats">
                <span>{teamRanking.points} Points</span>
                <span>•</span>
                <span>NRR: {teamRanking.nrr}</span>
              </div>
            </div>
            <div className="team-medal">
              {teamRanking.position === 1 && <Crown size={40} className="gold" />}
              {teamRanking.position === 2 && <Medal size={40} className="silver" />}
              {teamRanking.position === 3 && <Medal size={40} className="bronze" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary
