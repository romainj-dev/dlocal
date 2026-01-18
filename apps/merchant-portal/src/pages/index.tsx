import { type ChangeEvent, type FormEvent, useEffect, useState } from 'react';
import { Button, Card, SectionHeading } from '@dlocal/ui';
import { useAuth } from '@dlocal/auth';

type MerchantProfile = {
  merchantId: string;
  legalName: string;
  displayName: string;
  settlementSchedule: string;
  supportEmail: string;
  riskTier: string;
  notificationsEnabled: boolean;
  updatedAt: string;
};

const bffUrl = process.env.NEXT_PUBLIC_BFF_URL ?? 'http://localhost:4300';

export default function MerchantPortalPage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<MerchantProfile | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      const response = await fetch(`${bffUrl}/api/merchant/profile`);
      const data = (await response.json()) as MerchantProfile;
      setProfile(data);
    };

    loadProfile();
  }, []);

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!profile) {
      return;
    }
    const target = event.target;
    const { name, value, type } = target;
    const checked = target instanceof HTMLInputElement ? target.checked : false;
    setProfile({
      ...profile,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!profile) {
      return;
    }
    setIsSaving(true);
    const response = await fetch(`${bffUrl}/api/merchant/profile`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(profile)
    });
    const data = (await response.json()) as MerchantProfile;
    setProfile(data);
    setIsSaving(false);
  };

  return (
    <div className="mfe-stack">
      <SectionHeading
        title="Merchant Profile"
        subtitle="Review account metadata and adjust operational settings."
      />
      <Card>
        <div className="ui-inline">
          <div>
            Account manager: <strong>{user?.name ?? 'Guest'}</strong> ({user?.role ?? 'n/a'}).
          </div>
          {profile ? <span className="ui-chip">ID: {profile.merchantId}</span> : null}
        </div>
      </Card>
      <Card>
        {!profile ? (
          <p>Loading merchant profile…</p>
        ) : (
          <form className="ui-grid ui-grid--two" onSubmit={handleSubmit}>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="legalName">
                Legal name
              </label>
              <input
                id="legalName"
                name="legalName"
                className="ui-input"
                value={profile.legalName}
                onChange={handleChange}
              />
            </div>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="displayName">
                Display name
              </label>
              <input
                id="displayName"
                name="displayName"
                className="ui-input"
                value={profile.displayName}
                onChange={handleChange}
              />
            </div>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="settlementSchedule">
                Settlement schedule
              </label>
              <select
                id="settlementSchedule"
                name="settlementSchedule"
                className="ui-select"
                value={profile.settlementSchedule}
                onChange={handleChange}
              >
                <option>Daily</option>
                <option>Weekly</option>
                <option>Monthly</option>
              </select>
            </div>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="supportEmail">
                Support email
              </label>
              <input
                id="supportEmail"
                name="supportEmail"
                type="email"
                className="ui-input"
                value={profile.supportEmail}
                onChange={handleChange}
              />
            </div>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="riskTier">
                Risk tier
              </label>
              <select
                id="riskTier"
                name="riskTier"
                className="ui-select"
                value={profile.riskTier}
                onChange={handleChange}
              >
                <option>Tier 1</option>
                <option>Tier 2</option>
                <option>Tier 3</option>
              </select>
            </div>
            <div className="ui-field">
              <label className="ui-field__label" htmlFor="notificationsEnabled">
                Notifications
              </label>
              <div className="ui-inline">
                <input
                  id="notificationsEnabled"
                  name="notificationsEnabled"
                  type="checkbox"
                  checked={profile.notificationsEnabled}
                  onChange={handleChange}
                />
                <span>Enable operational alerts</span>
              </div>
            </div>
            <div className="ui-inline" style={{ gridColumn: '1 / -1' }}>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? 'Saving…' : 'Save changes'}
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={() => setProfile({ ...profile })}
              >
                Reset
              </Button>
              <span className="ui-chip ui-chip--success">
                Updated {new Date(profile.updatedAt).toLocaleString()}
              </span>
            </div>
          </form>
        )}
      </Card>
    </div>
  );
}
