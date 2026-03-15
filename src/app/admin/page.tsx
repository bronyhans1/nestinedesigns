'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { PROGRAMME_LABELS } from '@/lib/applicationConstants';

type Contact = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  createdAt: string;
};

type Training = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'rejected';
  createdAt: string;
};

type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

const STATUS_OPTIONS: Training['status'][] = [
  'new',
  'contacted',
  'enrolled',
  'rejected',
];

type Application = {
  _id: string;
  applicantId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  programmeDuration: string;
  paymentStatus: 'pending' | 'paid';
  createdAt: string;
};

export default function AdminPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [trainings, setTrainings] = useState<Training[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [applicationSearch, setApplicationSearch] = useState('');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const [contactsRes, trainingsRes, applicationsRes] = await Promise.all([
          fetch('/api/admin/contacts'),
          fetch('/api/admin/trainings'),
          fetch('/api/admin/applications'),
        ]);

        const contactsJson = (await contactsRes.json()) as ApiResponse<Contact[]>;
        const trainingsJson = (await trainingsRes.json()) as ApiResponse<
          Training[]
        >;
        const applicationsJson =
          (await applicationsRes.json()) as ApiResponse<Application[]>;

        if (!contactsRes.ok || !contactsJson.success) {
          throw new Error(
            contactsJson.error || 'Failed to load contact messages.'
          );
        }
        if (!trainingsRes.ok || !trainingsJson.success) {
          throw new Error(
            trainingsJson.error || 'Failed to load training applications.'
          );
        }
        if (!applicationsRes.ok || !applicationsJson.success) {
          throw new Error(
            applicationsJson.error || 'Failed to load applications.'
          );
        }

        setContacts(contactsJson.data ?? []);
        setTrainings(trainingsJson.data ?? []);
        setApplications(applicationsJson.data ?? []);
      } catch (err: any) {
        setError(err?.message || 'Failed to load admin data.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const totalMessages = contacts.length;
  const totalTrainings = trainings.length;
  const newApplications = trainings.filter((t) => t.status === 'new').length;

  const filteredApplications = applications.filter((app) => {
    if (!applicationSearch.trim()) return true;
    const q = applicationSearch.toLowerCase();
    const fullName = `${app.firstName} ${app.lastName}`.toLowerCase();
    return (
      fullName.includes(q) ||
      app.phone.toLowerCase().includes(q) ||
      app.email.toLowerCase().includes(q) ||
      app.applicantId.toLowerCase().includes(q)
    );
  });

  const formatDate = (value: string) =>
    new Date(value).toLocaleString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const handleStatusChange = async (id: string, status: Training['status']) => {
    setUpdatingId(id);
    try {
      const res = await fetch(`/api/admin/trainings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      const json = (await res.json()) as ApiResponse<Training>;
      if (!res.ok || !json.success || !json.data) {
        throw new Error(json.error || 'Failed to update status.');
      }

      setTrainings((prev) =>
        prev.map((t) => (t._id === id ? { ...t, status: json.data!.status } : t))
      );
    } catch (err) {
      if (process.env.NODE_ENV !== 'production') console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <main>
      <section className="pb-16 bg-black border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold mb-4">
            Admin <span className="text-[#D4AF37]">Dashboard</span>
          </h1>
          <p className="text-white/70 max-w-2xl">
            Monitor contact messages and training applications submitted through
            the Nestine Designs website.
          </p>
        </div>
      </section>

      <section className="py-10 bg-[#0A0A0A]">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-10">
          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#111111] border border-[#333333] px-6 py-5">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2">
                Total Messages
              </p>
              <p className="font-serif text-3xl font-bold text-[#D4AF37]">
                {loading ? '—' : totalMessages}
              </p>
            </div>
            <div className="bg-[#111111] border border-[#333333] px-6 py-5">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2">
                Training Applications
              </p>
              <p className="font-serif text-3xl font-bold text-[#D4AF37]">
                {loading ? '—' : totalTrainings}
              </p>
            </div>
            <div className="bg-[#111111] border border-[#333333] px-6 py-5">
              <p className="text-xs tracking-[0.25em] uppercase text-gray-400 mb-2">
                Pending review
              </p>
              <p className="text-[0.6rem] text-gray-500 mb-1">Training status (new)</p>
              <p className="font-serif text-3xl font-bold text-[#D4AF37]">
                {loading ? '—' : newApplications}
              </p>
            </div>
          </div>

          {error && (
            <div className="bg-red-900/40 border border-red-500/60 text-red-100 px-4 py-3 text-sm">
              {error}
            </div>
          )}

          {/* Contacts Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold">
                Contact Messages
              </h2>
              <span className="text-xs tracking-[0.25em] uppercase text-gray-400">
                {loading
                  ? 'Loading...'
                  : `${totalMessages} message${totalMessages === 1 ? '' : 's'}`}
              </span>
            </div>
            <div className="bg-[#111111] border border-[#333333] rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-black/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Subject
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Message
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Date
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          Loading messages...
                        </td>
                      </tr>
                    ) : contacts.length === 0 ? (
                      <tr>
                        <td
                          colSpan={6}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          No messages yet.
                        </td>
                      </tr>
                    ) : (
                      contacts.map((c) => (
                        <tr
                          key={c._id}
                          className="border-t border-[#222222] hover:bg-white/5"
                        >
                          <td className="px-4 py-3 align-top">{c.name}</td>
                          <td className="px-4 py-3 align-top">{c.email}</td>
                          <td className="px-4 py-3 align-top">{c.phone}</td>
                          <td className="px-4 py-3 align-top">{c.subject}</td>
                          <td className="px-4 py-3 align-top max-w-xs">
                            <p className="line-clamp-3 text-gray-300">
                              {c.message}
                            </p>
                          </td>
                          <td className="px-4 py-3 align-top text-gray-400">
                            {formatDate(c.createdAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Trainings Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold">
                Training Applications
              </h2>
              <span className="text-xs tracking-[0.25em] uppercase text-gray-400">
                {loading
                  ? 'Loading...'
                  : `${totalTrainings} application${
                      totalTrainings === 1 ? '' : 's'
                    }`}
              </span>
            </div>
            <div className="bg-[#111111] border border-[#333333] rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-black/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Full Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Status
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Date Submitted
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          Loading applications...
                        </td>
                      </tr>
                    ) : trainings.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          No training applications yet.
                        </td>
                      </tr>
                    ) : (
                      trainings.map((t) => (
                        <tr
                          key={t._id}
                          className="border-t border-[#222222] hover:bg-white/5"
                        >
                          <td className="px-4 py-3 align-top">
                            {t.firstName} {t.lastName}
                          </td>
                          <td className="px-4 py-3 align-top">{t.email}</td>
                          <td className="px-4 py-3 align-top">{t.phone}</td>
                          <td className="px-4 py-3 align-top">
                            <select
                              className="bg-black border border-[#333333] text-xs uppercase tracking-[0.15em] px-3 py-1 outline-none"
                              value={t.status}
                              onChange={(e) =>
                                handleStatusChange(
                                  t._id,
                                  e.target.value as Training['status']
                                )
                              }
                              disabled={updatingId === t._id}
                            >
                              {STATUS_OPTIONS.map((status) => (
                                <option key={status} value={status}>
                                  {status}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td className="px-4 py-3 align-top text-gray-400">
                            {formatDate(t.createdAt)}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Applications Section */}
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <h2 className="font-serif text-2xl font-bold">Applications</h2>
              <div className="flex items-center gap-3">
                <span className="text-xs tracking-[0.25em] uppercase text-gray-400">
                  {loading
                    ? 'Loading...'
                    : `${applications.length} application${
                        applications.length === 1 ? '' : 's'
                      }`}
                </span>
                <input
                  type="text"
                  value={applicationSearch}
                  onChange={(e) => setApplicationSearch(e.target.value)}
                  placeholder="Search by name, phone, email, ID"
                  className="bg-black border border-[#333333] text-xs text-white px-3 py-2 outline-none focus:border-[#D4AF37] w-full sm:w-72"
                />
              </div>
            </div>
            <div className="bg-[#111111] border border-[#333333] rounded-none overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead className="bg-black/60">
                    <tr>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Applicant ID
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Name
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Email
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Phone
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Programme
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Payment
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        Date Submitted
                      </th>
                      <th className="px-4 py-3 text-left font-medium text-gray-300">
                        PDF
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          Loading applications...
                        </td>
                      </tr>
                    ) : filteredApplications.length === 0 ? (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-6 text-center text-gray-400"
                        >
                          No applications found.
                        </td>
                      </tr>
                    ) : (
                      filteredApplications.map((app) => (
                        <tr
                          key={app._id}
                          className="border-t border-[#222222] hover:bg-white/5"
                        >
                          <td className="px-4 py-3 align-top">
                            {app.applicantId}
                          </td>
                          <td className="px-4 py-3 align-top">
                            {app.firstName} {app.lastName}
                          </td>
                          <td className="px-4 py-3 align-top">{app.email}</td>
                          <td className="px-4 py-3 align-top">{app.phone}</td>
                          <td className="px-4 py-3 align-top">
                            {PROGRAMME_LABELS[app.programmeDuration] ?? app.programmeDuration}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <span
                              className={
                                app.paymentStatus === 'paid'
                                  ? 'text-xs uppercase tracking-[0.15em] text-[#D4AF37]'
                                  : 'text-xs uppercase tracking-[0.15em] text-gray-400'
                              }
                            >
                              {app.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                            </span>
                          </td>
                          <td className="px-4 py-3 align-top text-gray-400">
                            {formatDate(app.createdAt)}
                          </td>
                          <td className="px-4 py-3 align-top">
                            <a
                              href={`/api/application/pdf/${app._id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs uppercase tracking-[0.15em] text-[#D4AF37] hover:text-white"
                            >
                              Download
                            </a>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-[#222222] flex justify-end">
            <Button
              variant="outline"
              className="border-[#333333] text-xs tracking-[0.25em] uppercase rounded-none"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              Back to Top
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
