import React from 'react'
import { 
  Trophy, 
  TrendingUp, 
  Users, 
  Target, 
  Calendar,
  Award,
  Flame,
  Shield,
  Clock,
  Star,
  Activity
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
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { 
  teamInfo, 
  seasonStats, 
  playerStats, 
  matchResults, 
  upcomingMatches,
  battingPerformance,
  awardsData,
  teamRanking
} from '../data/teamData'
import { format } from 'date-fns'

const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ef4444']

function StatCard({ icon: Icon, title, value, subtitle, color, trend }) {
  return (
    <div className="stat-card" style={{ '--accent-color': color }}>
      <div className="stat-icon">
        <Icon size={24} />
      </div>
      <div className="stat-content">
        <span className="stat-title">{title}</span>
        <span className="stat-value">{value}</span>
        {subtitle && <span className="stat-subtitle">{subtitle}</span>}
      </div>
      {trend && (
        <div className={`stat-trend ${trend > 0 ? 'up' : 'down'}`}>
          <TrendingUp size={16} />
          <span>{Math.abs(trend)}%</span>
        </div>
      )}
    </div>
  )
}

function ResultBadge({ result }) {
  const bgColor = result === 'Won' ? '#10b981' : result === 'Lost' ? '#ef4444' : '#f59e0b'
  return (
    <span className="result-badge" style={{ backgroundColor: bgColor }}>
      {result}
    </span>
  )
}

function Dashboard() {
  const topScorers = [...playerStats].sort((a, b) => b.runs - a.runs).slice(0, 5)
  const topBowlers = [...playerStats].sort((a, b) => b.wickets - a.wickets).slice(0, 5)

  const pieData = [
    { name: 'Wins', value: seasonStats.matchesWon },
    { name: 'Losses', value: seasonStats.matchesLost },
    { name: 'Draws', value: seasonStats.matchesDrawn }
  ]

  const recentForm = matchResults.slice(-5).map(m => ({
    result: m.result
  }))

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="header-content">
          <h1>Team Dashboard</h1>
          <p>Thunderbolts Cricket Club - Season 2026 Performance Overview</p>
        </div>
        <div className="live-indicator">
          <Activity size={16} />
          <span>Season Active</span>
        </div>
      </div>

      {/* Key Stats Row */}
      <div className="stats-grid">
        <StatCard 
          icon={Trophy} 
          title="Matches Won" 
          value={seasonStats.matchesWon} 
          subtitle={`of ${seasonStats.matchesPlayed} played`}
          color="#10b981"
          trend={12}
        />
        <StatCard 
          icon={Target} 
          title="Win Rate" 
          value={`${((seasonStats.matchesWon / seasonStats.matchesPlayed) * 100).toFixed(1)}%`}
          subtitle="This season"
          color="#3b82f6"
          trend={8}
        />
        <StatCard 
          icon={Flame} 
          title="Total Runs" 
          value={seasonStats.totalRunsScored}
          subtitle="Team total"
          color="#f59e0b"
          trend={15}
        />
        <StatCard 
          icon={Star} 
          title="Best Score" 
          value={seasonStats.highestScore}
          subtitle="vs Phoenix Rising"
          color="#8b5cf6"
        />
        <StatCard 
          icon={Shield} 
          title="Run Rate" 
          value={seasonStats.runRate}
          subtitle="Team economy"
          color="#06b6d4"
          trend={5}
        />
        <StatCard 
          icon={Users} 
          title="Active Players" 
          value={teamInfo.totalPlayers}
          subtitle="Squad size"
          color="#ec4899"
        />
      </div>

      {/* Charts Row */}
      <div className="charts-row">
        {/* Batting Performance Chart */}
        <div className="chart-card large">
          <div className="chart-header">
            <h3><TrendingUp size={20} /> Batting Performance</h3>
            <span className="chart-subtitle">Runs scored per match</span>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart data={battingPerformance}>
                <defs>
                  <linearGradient id="colorRuns" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                  </linearGradient>
                </defs>
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
                <Area 
                  type="monotone" 
                  dataKey="runs" 
                  stroke="#f59e0b" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorRuns)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Win/Loss Distribution */}
        <div className="chart-card small">
          <div className="chart-header">
            <h3><Trophy size={20} /> Season Results</h3>
            <span className="chart-subtitle">Match outcomes</span>
          </div>
          <div className="chart-container pie-container">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="pie-legend">
              {pieData.map((item, index) => (
                <div key={item.name} className="legend-item">
                  <span className="legend-dot" style={{ backgroundColor: COLORS[index] }}></span>
                  <span className="legend-label">{item.name}</span>
                  <span className="legend-value">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Form and Top Performers */}
      <div className="content-row">
        {/* Recent Form */}
        <div className="content-card">
          <div className="card-header">
            <h3><Activity size={20} /> Recent Form</h3>
            <span className="last-5-label">Last 5 matches</span>
          </div>
          <div className="form-indicators">
            {recentForm.map((match, i) => (
              <div 
                key={i} 
                className={`form-dot ${match.result.toLowerCase()}`}
                title={`Match ${i + 1}: ${match.result}`}
              >
                {match.result === 'Won' && <Trophy size={14} />}
                {match.result === 'Lost' && <span>✕</span>}
                {match.result === 'Draw' && <span>−</span>}
              </div>
            ))}
          </div>
          <div className="form-summary">
            <div className="form-stat">
              <span className="form-stat-value win">{recentForm.filter(m => m.result === 'Won').length}</span>
              <span className="form-stat-label">Wins</span>
            </div>
            <div className="form-stat">
              <span className="form-stat-value loss">{recentForm.filter(m => m.result === 'Lost').length}</span>
              <span className="form-stat-label">Losses</span>
            </div>
            <div className="form-stat">
              <span className="form-stat-value draw">{recentForm.filter(m => m.result === 'Draw').length}</span>
              <span className="form-stat-label">Draws</span>
            </div>
          </div>
        </div>

        {/* Team Ranking */}
        <div className="content-card ranking-card">
          <div className="card-header">
            <h3><Award size={20} /> Division Ranking</h3>
          </div>
          <div className="ranking-display">
            <div className="ranking-position">
              <span className="position-number">#{teamRanking.position}</span>
              <span className="position-label">of {teamRanking.totalTeams}</span>
            </div>
            <div className="ranking-details">
              <div className="ranking-item">
                <span className="ranking-label">Points</span>
                <span className="ranking-value">{teamRanking.points}</span>
              </div>
              <div className="ranking-item">
                <span className="ranking-label">Net Run Rate</span>
                <span className="ranking-value positive">{teamRanking.nrr}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Match */}
        <div className="content-card upcoming-card">
          <div className="card-header">
            <h3><Calendar size={20} /> Next Match</h3>
          </div>
          {upcomingMatches.length > 0 && (
            <div className="next-match">
              <div className="match-vs">
                <span className="team thunderbolts">Thunderbolts</span>
                <span className="vs">VS</span>
                <span className="team opponent">{upcomingMatches[0].opponent}</span>
              </div>
              <div className="match-details">
                <div className="detail">
                  <Calendar size={14} />
                  <span>{format(new Date(upcomingMatches[0].date), 'MMM dd, yyyy')}</span>
                </div>
                <div className="detail">
                  <Clock size={14} />
                  <span>{upcomingMatches[0].time}</span>
                </div>
                <div className="detail">
                  <Target size={14} />
                  <span>{upcomingMatches[0].venue}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Top Performers */}
      <div className="performers-row">
        {/* Top Batsmen */}
        <div className="performers-card">
          <div className="card-header">
            <h3><Flame size={20} /> Top Run Scorers</h3>
          </div>
          <div className="performers-list">
            {topScorers.map((player, index) => (
              <div key={player.id} className="performer-item">
                <span className="performer-rank">{index + 1}</span>
                <div className="performer-info">
                  <span className="performer-name">{player.name}</span>
                  <span className="performer-role">{player.role}</span>
                </div>
                <div className="performer-stats">
                  <span className="stat-main">{player.runs}</span>
                  <span className="stat-secondary">runs</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Bowlers */}
        <div className="performers-card">
          <div className="card-header">
            <h3><Target size={20} /> Top Wicket Takers</h3>
          </div>
          <div className="performers-list">
            {topBowlers.map((player, index) => (
              <div key={player.id} className="performer-item">
                <span className="performer-rank">{index + 1}</span>
                <div className="performer-info">
                  <span className="performer-name">{player.name}</span>
                  <span className="performer-role">{player.role}</span>
                </div>
                <div className="performer-stats">
                  <span className="stat-main">{player.wickets}</span>
                  <span className="stat-secondary">wickets</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Match Results */}
        <div className="performers-card results-card">
          <div className="card-header">
            <h3><Trophy size={20} /> Recent Results</h3>
          </div>
          <div className="results-list">
            {matchResults.slice(-5).reverse().map((match) => (
              <div key={match.id} className="result-item">
                <div className="result-info">
                  <span className="result-opponent">vs {match.opponent}</span>
                  <span className="result-date">{format(new Date(match.date), 'MMM dd')}</span>
                </div>
                <div className="result-scores">
                  <span className="our-score">{match.ourScore}</span>
                  <span className="score-sep">-</span>
                  <span className="their-score">{match.theirScore}</span>
                </div>
                <ResultBadge result={match.result} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Man of Match Players */}
      <div className="mom-section">
        <div className="card-header">
          <h3><Star size={20} /> Man of the Match Awards</h3>
        </div>
        <div className="mom-grid">
          {matchResults.filter(m => m.result === 'Won').slice(-4).reverse().map((match) => (
            <div key={match.id} className="mom-card">
              <div className="mom-match">vs {match.opponent}</div>
              <div className="mom-player">{match.manOfMatch}</div>
              <div className="mom-score">{match.ourScore}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard
