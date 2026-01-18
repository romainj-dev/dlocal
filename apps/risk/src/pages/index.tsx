import { useEffect, useState } from 'react';
import { Button, Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

type RiskReview = {
  id: string;
  merchant: string;
  status: 'open' | 'in_review' | 'resolved';
  score: number;
  reason: string;
  updatedAt: string;
};

const statusOptions: Array<'all' | RiskReview['status']> = ['all', 'open', 'in_review', 'resolved'];
const bffUrl = process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4300';

export default function RiskPage() {
  const { user } = useAuth();
  const [statusFilter, setStatusFilter] = useState<'all' | RiskReview['status']>('all');
  const [reviews, setReviews] = useState<RiskReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      const response = await fetch(`${bffUrl}/api/risk/reviews?status=${statusFilter}`);
      const data = (await response.json()) as { reviews: RiskReview[] };
      setReviews(data.reviews);
      setIsLoading(false);
    };

    loadReviews();
  }, [statusFilter]);

  const getChipClass = (status: RiskReview['status']) => {
    if (status === 'resolved') {
      return 'ui-chip ui-chip--success';
    }
    if (status === 'in_review') {
      return 'ui-chip ui-chip--warning';
    }
    return 'ui-chip';
  };

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Risk Review Dashboard"
        subtitle="Investigate alerts, monitor fraud signals, and tune decision rules."
      />
      <Card>
        <div className="ui-inline">
          <div>
            Analyst on duty: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
          </div>
          <span className="ui-chip">Active cases: {reviews.length}</span>
        </div>
      </Card>
      <Card>
        <div className="ui-inline" style={{ justifyContent: 'space-between' }}>
          <strong>Status filters</strong>
          <div className="ui-inline">
            {statusOptions.map((status) => (
              <Button
                key={status}
                type="button"
                variant={statusFilter === status ? 'primary' : 'ghost'}
                onClick={() => setStatusFilter(status)}
              >
                {status.replace('_', ' ')}
              </Button>
            ))}
          </div>
        </div>
      </Card>
      <Card>
        {isLoading ? (
          <p>Loading risk reviews…</p>
        ) : (
          <table className="ui-table">
            <thead>
              <tr>
                <th>Case ID</th>
                <th>Merchant</th>
                <th>Reason</th>
                <th>Score</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {reviews.map((review) => (
                <tr key={review.id}>
                  <td>{review.id}</td>
                  <td>{review.merchant}</td>
                  <td>{review.reason}</td>
                  <td>{review.score.toFixed(2)}</td>
                  <td>
                    <span className={getChipClass(review.status)}>
                      {review.status.replace('_', ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
