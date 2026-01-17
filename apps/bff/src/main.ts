import express from 'express';
import type { ApiStatus } from '@dlocal/types';

const app = express();
app.use(express.json());

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

const port = process.env.PORT ? Number(process.env.PORT) : 4300;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`BFF listening on port ${port}`);
});
