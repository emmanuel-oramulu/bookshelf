export default function DashboardCard({ title, children }) {
  return (
    <div className="card">
      <div className="cardHeader">{title}</div>
      {children}
    </div>
  );
}