'use client';

import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Button, Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

type Payment = {
  id: string;
  customer: string;
  amount: number;
  currency: string;
  method: string;
  status: string;
  createdAt: string;
};

const bffUrl = process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4300';

export default function PaymentsPage() {
  const { user } = useAuth();
  const [payments, setPayments] = useState<Payment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formState, setFormState] = useState({
    customer: '',
    amount: '',
    currency: 'USD',
    method: 'card'
  });

  const formatCurrency = (amount: number, currency: string) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency
    }).format(amount);

  useEffect(() => {
    const loadPayments = async () => {
      try {
        const response = await fetch(`${bffUrl}/api/payments`);
        const data = (await response.json()) as { payments: Payment[] };
        setPayments(data.payments);
      } catch (fetchError) {
        setError('Unable to load payments.');
      } finally {
        setIsLoading(false);
      }
    };

    loadPayments();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const response = await fetch(`${bffUrl}/api/payments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer: formState.customer,
          amount: Number(formState.amount),
          currency: formState.currency,
          method: formState.method
        })
      });

      if (!response.ok) {
        throw new Error('Failed to create payment');
      }

      const created = (await response.json()) as Payment;
      setPayments((prev) => [created, ...prev]);
      setFormState({ customer: '', amount: '', currency: 'USD', method: 'card' });
    } catch (submitError) {
      setError('Unable to create payment. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Create Payment"
        subtitle="Capture a new transaction and track recent submissions."
      />
      <Card>
        <div className="ui-inline">
          <div>
            Signed in as <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
          </div>
          <span className="ui-chip">Live queue: {payments.length} payments</span>
        </div>
      </Card>
      <Card>
        <form className="ui-grid ui-grid--two" onSubmit={handleSubmit}>
          <div className="ui-field">
            <label className="ui-field__label" htmlFor="customer">
              Customer
            </label>
            <input
              id="customer"
              name="customer"
              className="ui-input"
              placeholder="Acme Industries"
              value={formState.customer}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ui-field">
            <label className="ui-field__label" htmlFor="amount">
              Amount
            </label>
            <input
              id="amount"
              name="amount"
              className="ui-input"
              placeholder="1500"
              type="number"
              min="1"
              value={formState.amount}
              onChange={handleChange}
              required
            />
          </div>
          <div className="ui-field">
            <label className="ui-field__label" htmlFor="currency">
              Currency
            </label>
            <select
              id="currency"
              name="currency"
              className="ui-select"
              value={formState.currency}
              onChange={handleChange}
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="BRL">BRL</option>
            </select>
          </div>
          <div className="ui-field">
            <label className="ui-field__label" htmlFor="method">
              Method
            </label>
            <select
              id="method"
              name="method"
              className="ui-select"
              value={formState.method}
              onChange={handleChange}
            >
              <option value="card">Card</option>
              <option value="bank_transfer">Bank transfer</option>
              <option value="wallet">Wallet</option>
            </select>
          </div>
          <div className="ui-inline" style={{ gridColumn: '1 / -1' }}>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting…' : 'Create Payment'}
            </Button>
            <Button
              type="button"
              variant="ghost"
              onClick={() =>
                setFormState({ customer: '', amount: '', currency: 'USD', method: 'card' })
              }
            >
              Clear
            </Button>
            {error ? <span>{error}</span> : null}
          </div>
        </form>
      </Card>
      <Card>
        <div className="ui-inline" style={{ justifyContent: 'space-between' }}>
          <div className="ui-metric">
            <span className="ui-metric__label">Payments today</span>
            <span className="ui-metric__value">{payments.length}</span>
          </div>
          <span className="ui-chip ui-chip--success">Settlement ready</span>
        </div>
        {isLoading ? (
          <p>Loading recent payments…</p>
        ) : (
          <table className="ui-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Method</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.id}</td>
                  <td>{payment.customer}</td>
                  <td>{payment.method.replace('_', ' ')}</td>
                  <td>{payment.status}</td>
                  <td>{formatCurrency(payment.amount, payment.currency)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
