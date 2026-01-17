import express from 'express';
import type { ApiStatus } from '@dlocal/types';

const app = express();
app.use(express.json());

const payments = [
  {
    id: 'PMT-1041',
    customer: 'Northwind Traders',
    amount: 1280,
    currency: 'USD',
    method: 'card',
    status: 'Pending',
    createdAt: '2024-04-12T08:24:00Z'
  },
  {
    id: 'PMT-1040',
    customer: 'Nexa Mobility',
    amount: 3420,
    currency: 'EUR',
    method: 'bank_transfer',
    status: 'Processing',
    createdAt: '2024-04-12T07:50:00Z'
  },
  {
    id: 'PMT-1039',
    customer: 'Aurora Health',
    amount: 920,
    currency: 'USD',
    method: 'wallet',
    status: 'Completed',
    createdAt: '2024-04-11T18:20:00Z'
  }
];

const riskReviews = [
  {
    id: 'RSK-3001',
    merchant: 'Aurora Health',
    status: 'open',
    score: 0.91,
    reason: 'Velocity spike in LATAM corridor',
    updatedAt: '2024-04-12T08:10:00Z'
  },
  {
    id: 'RSK-3002',
    merchant: 'Nexa Mobility',
    status: 'in_review',
    score: 0.77,
    reason: 'Chargeback trend over 3-day window',
    updatedAt: '2024-04-12T07:40:00Z'
  },
  {
    id: 'RSK-3003',
    merchant: 'Blue Harbor',
    status: 'resolved',
    score: 0.48,
    reason: 'KYC refresh completed',
    updatedAt: '2024-04-11T21:15:00Z'
  }
];

let merchantProfile = {
  merchantId: 'MER-2204',
  legalName: 'Aurora Health Holdings LLC',
  displayName: 'Aurora Health',
  settlementSchedule: 'Daily',
  supportEmail: 'payments@aurorahealth.com',
  riskTier: 'Tier 2',
  notificationsEnabled: true,
  updatedAt: '2024-04-12T08:00:00Z'
};

const dailySummary = [
  { date: '2024-04-08', volume: 82000, approvals: 94, disputes: 2 },
  { date: '2024-04-09', volume: 90500, approvals: 93, disputes: 4 },
  { date: '2024-04-10', volume: 110400, approvals: 95, disputes: 3 },
  { date: '2024-04-11', volume: 99000, approvals: 92, disputes: 5 },
  { date: '2024-04-12', volume: 120600, approvals: 96, disputes: 2 }
];

app.get('/health', (_req, res) => {
  const status: ApiStatus = {
    service: 'bff',
    healthy: true,
    timestamp: new Date().toISOString()
  };

  res.json(status);
});

app.get('/api/dashboard/summary', (_req, res) => {
  res.json({
    payments: { pending: 12, latencyMs: 180 },
    risk: { alertsOpen: 4, score: 0.92 },
    merchantPortal: { onboardingQueue: 7 },
    reporting: { reportsReady: 3 }
  });
});

app.get('/api/payments', (_req, res) => {
  res.json({ payments });
});

app.post('/api/payments', (req, res) => {
  const { customer, amount, currency, method } = req.body ?? {};

  if (!customer || !amount || !currency || !method) {
    res.status(400).json({ message: 'Missing required payment fields.' });
    return;
  }

  const payment = {
    id: `PMT-${Math.floor(1000 + Math.random() * 9000)}`,
    customer,
    amount: Number(amount),
    currency,
    method,
    status: 'Pending',
    createdAt: new Date().toISOString()
  };

  payments.unshift(payment);

  res.status(201).json(payment);
});

app.get('/api/risk/reviews', (req, res) => {
  const status = String(req.query.status ?? 'all');
  const filtered =
    status === 'all' ? riskReviews : riskReviews.filter((review) => review.status === status);

  res.json({ reviews: filtered });
});

app.get('/api/merchant/profile', (_req, res) => {
  res.json(merchantProfile);
});

app.put('/api/merchant/profile', (req, res) => {
  merchantProfile = {
    ...merchantProfile,
    ...req.body,
    updatedAt: new Date().toISOString()
  };

  res.json(merchantProfile);
});

app.get('/api/reporting/daily-summary', (_req, res) => {
  const totalVolume = dailySummary.reduce((acc, entry) => acc + entry.volume, 0);
  const avgApprovals =
    dailySummary.reduce((acc, entry) => acc + entry.approvals, 0) / dailySummary.length;

  res.json({
    summary: dailySummary,
    totals: {
      totalVolume,
      averageApprovalRate: Number(avgApprovals.toFixed(1))
    }
  });
});

const port = process.env.PORT ? Number(process.env.PORT) : 4300;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`BFF listening on port ${port}`);
});
