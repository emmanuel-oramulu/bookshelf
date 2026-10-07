import { useMemo } from 'react';
import styles from './Dashboard.module.css';
import DashboardCard from './DashboardCard';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, LineChart, Line, RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';

const COLORS = ['#e8956d', '#6db86d', '#6d9be8'];
const GOAL = 20;

export default function Dashboard({ books = [] }) {
  if (!books.length) return <div className={styles.empty}>Add books to see your dashboard</div>;

  const { statusData, genreData, lineData, completed } = useMemo(() => {
    const statusCounts = {};
    const genreCounts = {};
    const booksByDate = {};

    books.forEach(book => {
      const status = book.status || 'unknown';
      const genre = book.genre || 'Uncategorized';
      const date = book.createdAt?.slice(0, 10) || 'Unknown';

      statusCounts[status] = (statusCounts[status] || 0) + 1;
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
      booksByDate[date] = (booksByDate[date] || 0) + 1;
    });

    return {
      statusData: [
        { name: 'Reading', value: statusCounts.reading || 0 },
        { name: 'Completed', value: statusCounts.completed || 0 },
        { name: 'Want', value: statusCounts.want || 0 },
      ],
      genreData: Object.entries(genreCounts).map(([genre, count]) => ({ genre, count })),
      lineData: Object.entries(booksByDate)
       .sort(([a], [b]) => a.localeCompare(b))
       .map(([date, count]) => ({ date, count })),
      completed: statusCounts.completed || 0
    };
  }, [books]);

  return (
    <div className={styles.dashboard}>
      <DashboardCard title="Reading Status">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={statusData} dataKey="value" innerRadius={60} outerRadius={90} paddingAngle={4}>
              {statusData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </DashboardCard>

      <DashboardCard title="Genres">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={genreData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="genre" angle={-45} textAnchor="end" height={80} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Bar dataKey="count" radius={[6, 6, 0, 0]}>
              {genreData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </DashboardCard>

      <DashboardCard title="Reading Activity">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={lineData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#6d9be8" strokeWidth={3} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </DashboardCard>

      <DashboardCard title="Reading Goal">
        <ResponsiveContainer width="100%" height={300}>
          <RadialBarChart
            innerRadius="70%"
            outerRadius="100%"
            data={[{ value: completed }]}
            startAngle={90}
            endAngle={90 - 360 * Math.min(completed / GOAL, 1)}
          >
            <RadialBar dataKey="value" cornerRadius={10} fill="#6db86d" background />
            <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className={styles.goalText}>
              {completed}/{GOAL}
            </text>
          </RadialBarChart>
        </ResponsiveContainer>
      </DashboardCard>
    </div>
  );
}