'use client';

import { useEffect, useState } from 'react';
import { Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

type DailySummary = {
  date: string;
  volume: number;
  approvals: number;
  disputes: number;
};

type DailySummaryResponse = {
  summary: DailySummary[];
  totals: {
    totalVolume: number;
    averageApprovalRate: number;
  };
};

const bffUrl = process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4300';

export default function ReportingPage() {
  const { user } = useAuth();
  const [summary, setSummary] = useState<DailySummary[]>([]);
  const [totals, setTotals] = useState<DailySummaryResponse['totals'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSummary = async () => {
      const response = await fetch(`${bffUrl}/api/reporting/daily-summary`);
      const data = (await response.json()) as DailySummaryResponse;
      setSummary(data.summary);
      setTotals(data.totals);
      setIsLoading(false);
    };

    loadSummary();
  }, []);

  const maxVolume = Math.max(...summary.map((entry) => entry.volume), 1);

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Daily Summary"
        subtitle="Track revenue, reconciliation status, and compliance snapshots."
      />
      <Card>
        <div className="ui-inline">
          <div>
            Reporting lead: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
          </div>
          {totals ? (
            <span className="ui-chip">
              Total volume: {totals.totalVolume.toLocaleString('en-US')} USD
            </span>
          ) : null}
        </div>
      </Card>
      <Card>
        <div className="ui-grid ui-grid--two">
          <div className="ui-metric">
            <span className="ui-metric__label">Average approval rate</span>
            <span className="ui-metric__value">
              {totals ? `${totals.averageApprovalRate}%` : '--'}
            </span>
          </div>
          <div className="ui-metric">
            <span className="ui-metric__label">Days tracked</span>
            <span className="ui-metric__value">{summary.length}</span>
          </div>
        </div>
      </Card>
      <Card>
        {isLoading ? (
          <p>Loading reporting summary…</p>
        ) : (
          <div className="ui-grid ui-grid--two">
            <div>
              <strong>Volume trend</strong>
              <div className="ui-bar-chart" style={{ marginTop: 'var(--space-4)' }}>
                {summary.map((entry) => (
                  <div key={entry.date}>
                    <div className="ui-inline" style={{ justifyContent: 'space-between' }}>
                      <span>{entry.date}</span>
                      <span>{entry.volume.toLocaleString('en-US')} USD</span>
                    </div>
                    <div className="ui-bar">
                      <div
                        className="ui-bar__fill"
                        style={{ width: `${(entry.volume / maxVolume) * 100}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <strong>Daily breakdown</strong>
              <table className="ui-table" style={{ marginTop: 'var(--space-4)' }}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Approvals</th>
                    <th>Disputes</th>
                    <th>Volume</th>
                  </tr>
                </thead>
                <tbody>
                  {summary.map((entry) => (
                    <tr key={entry.date}>
                      <td>{entry.date}</td>
                      <td>{entry.approvals}%</td>
                      <td>{entry.disputes}</td>
                      <td>{entry.volume.toLocaleString('en-US')} USD</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
