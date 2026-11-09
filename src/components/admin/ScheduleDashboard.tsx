"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";

type ScheduleEvent = {
  id: string;
  title: string;
  trail: string;
  guide: string;
  eventDate: string;
  startTime: string;
  endTime: string;
  indianPrice: number;
  foreignPrice: number;
  description: string | null;
  isPublished: boolean;
};

type Draft = Omit<ScheduleEvent, "id">;

const emptyDraft = (): Draft => ({
  title: "",
  trail: "",
  guide: "",
  eventDate: "",
  startTime: "08:00",
  endTime: "10:00",
  indianPrice: 0,
  foreignPrice: 0,
  description: "",
  isPublished: true,
});

function toLocalDateTime(value: string) {
  const date = new Date(value);
  const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
  return offsetDate.toISOString().slice(0, 16);
}

function displayDate(value: string) {
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeZone: "Asia/Kolkata",
  }).format(new Date(value));
}

function EventFields({
  draft,
  setDraft,
}: {
  draft: Draft;
  setDraft: (update: (current: Draft) => Draft) => void;
}) {
  const update = <K extends keyof Draft>(key: K, value: Draft[K]) => {
    setDraft((current) => ({ ...current, [key]: value }));
  };
  const fieldClass = "w-full border border-[var(--color-border-strong)] bg-white px-3 py-2.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]";

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
        <span>Event title</span>
        <input className={fieldClass} required maxLength={120} value={draft.title} onChange={(event) => update("title", event.target.value)} />
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        <span>Trail</span>
        <input className={fieldClass} required maxLength={120} value={draft.trail} onChange={(event) => update("trail", event.target.value)} />
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        <span>Guide</span>
        <input className={fieldClass} required maxLength={120} value={draft.guide} onChange={(event) => update("guide", event.target.value)} />
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        <span>Date</span>
        <input className={fieldClass} type="datetime-local" required value={draft.eventDate} onChange={(event) => update("eventDate", event.target.value)} />
      </label>
      <div className="grid grid-cols-2 gap-3">
        <label className="space-y-1.5 text-sm font-medium">
          <span>Start time</span>
          <input className={fieldClass} type="time" required value={draft.startTime} onChange={(event) => update("startTime", event.target.value)} />
        </label>
        <label className="space-y-1.5 text-sm font-medium">
          <span>End time</span>
          <input className={fieldClass} type="time" required value={draft.endTime} onChange={(event) => update("endTime", event.target.value)} />
        </label>
      </div>
      <label className="space-y-1.5 text-sm font-medium">
        <span>Indian price (INR)</span>
        <input className={fieldClass} type="number" min="0" step="1" required value={draft.indianPrice} onChange={(event) => update("indianPrice", Number(event.target.value))} />
      </label>
      <label className="space-y-1.5 text-sm font-medium">
        <span>Foreign traveller price (INR)</span>
        <input className={fieldClass} type="number" min="0" step="1" required value={draft.foreignPrice} onChange={(event) => update("foreignPrice", Number(event.target.value))} />
      </label>
      <label className="space-y-1.5 text-sm font-medium sm:col-span-2">
        <span>Description <span className="font-normal text-[var(--color-text-muted)]">(optional)</span></span>
        <textarea className={fieldClass} rows={3} maxLength={2000} value={draft.description ?? ""} onChange={(event) => update("description", event.target.value)} />
      </label>
      <label className="flex items-center gap-2 text-sm font-medium sm:col-span-2">
        <input type="checkbox" checked={draft.isPublished} onChange={(event) => update("isPublished", event.target.checked)} className="h-4 w-4 accent-[var(--color-brand-primary)]" />
        Published on the public schedule
      </label>
    </div>
  );
}

export function ScheduleDashboard() {
  const [events, setEvents] = useState<ScheduleEvent[]>([]);
  const [draft, setDraft] = useState<Draft>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/admin/events", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not load events.");
      setEvents(result.events);
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void loadEvents(); }, [loadEvents]);

  function startEditing(event: ScheduleEvent) {
    setEditingId(event.id);
    setDraft({
      ...event,
      eventDate: toLocalDateTime(event.eventDate),
      description: event.description ?? "",
    });
    setNotice("");
    setError("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function resetForm() {
    setEditingId(null);
    setDraft(emptyDraft());
  }

  async function saveEvent(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const response = await fetch(editingId ? `/api/admin/events/${editingId}` : "/api/admin/events", {
        method: editingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, eventDate: new Date(draft.eventDate).toISOString() }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not save event.");
      setNotice(editingId ? "Event updated." : "Event created.");
      resetForm();
      await loadEvents();
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not save event.");
    } finally {
      setSaving(false);
    }
  }

  async function updateEvent(event: ScheduleEvent, patch: Partial<Draft>) {
    setBusyId(event.id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/events/${event.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...event,
          ...patch,
          eventDate: new Date(event.eventDate).toISOString(),
        }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Could not update event.");
      setEvents((current) => current.map((item) => item.id === event.id ? result.event : item));
      setNotice(patch.isPublished === undefined ? "Event updated." : patch.isPublished ? "Event published." : "Event unpublished.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not update event.");
    } finally {
      setBusyId(null);
    }
  }

  async function deleteEvent(event: ScheduleEvent) {
    if (!window.confirm(`Delete “${event.title}”? This cannot be undone.`)) return;
    setBusyId(event.id);
    setError("");
    setNotice("");
    try {
      const response = await fetch(`/api/admin/events/${event.id}`, { method: "DELETE" });
      if (!response.ok) {
        const result = await response.json();
        throw new Error(result.error || "Could not delete event.");
      }
      setEvents((current) => current.filter((item) => item.id !== event.id));
      if (editingId === event.id) resetForm();
      setNotice("Event deleted.");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Could not delete event.");
    } finally {
      setBusyId(null);
    }
  }

  async function signOut() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    window.location.assign("/admin");
  }

  const buttonClass = "border border-[var(--color-border-strong)] px-3 py-2 text-xs font-semibold transition-colors hover:bg-[var(--color-bg-subtle)] disabled:cursor-wait disabled:opacity-50";

  return (
    <div className="mx-auto w-full max-w-7xl px-4 pb-20 pt-36 sm:px-6 sm:pt-44 lg:px-8">
      <div className="flex flex-wrap items-end justify-between gap-4 border-b border-[var(--color-border-strong)] pb-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-text-muted)]">Admin</p>
          <h1 className="mt-2 font-serif font-medium">Event schedule</h1>
          <p className="mt-2 text-sm text-[var(--color-text-muted)]">Create and manage the events shown on the public schedule.</p>
        </div>
        <button type="button" onClick={signOut} className={buttonClass}>Sign out</button>
      </div>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <section className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5 sm:p-7" aria-labelledby="event-form-heading">
          <h2 id="event-form-heading" className="font-serif text-2xl font-medium">{editingId ? "Edit event" : "Create event"}</h2>
          <form onSubmit={saveEvent} className="mt-6 space-y-5">
            <EventFields draft={draft} setDraft={setDraft} />
            {error ? <p role="alert" className="text-sm text-red-800">{error}</p> : null}
            {notice ? <p role="status" className="text-sm text-[var(--color-brand-primary)]">{notice}</p> : null}
            <div className="flex flex-wrap gap-3">
              <button disabled={saving} className="bg-[var(--color-brand-primary)] px-4 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60">
                {saving ? "Saving…" : editingId ? "Save changes" : "Create event"}
              </button>
              {editingId ? <button type="button" disabled={saving} onClick={resetForm} className={buttonClass}>Cancel edit</button> : null}
            </div>
          </form>
        </section>

        <section aria-labelledby="events-list-heading">
          <div className="flex items-center justify-between gap-4">
            <h2 id="events-list-heading" className="font-serif text-2xl font-medium">All events <span className="font-sans text-sm font-normal text-[var(--color-text-muted)]">({events.length})</span></h2>
            <button type="button" onClick={() => void loadEvents()} disabled={loading} className={buttonClass}>{loading ? "Loading…" : "Refresh"}</button>
          </div>
          {loading ? <p className="mt-5 text-sm text-[var(--color-text-muted)]" role="status">Loading events…</p> : null}
          {!loading && !events.length ? <p className="mt-5 border border-dashed border-[var(--color-border-strong)] p-6 text-sm text-[var(--color-text-muted)]">No events yet. Create one using the form.</p> : null}
          <ul className="mt-5 space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border border-[var(--color-border-subtle)] bg-[var(--color-bg-surface)] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-serif text-xl font-medium">{event.title}</h3>
                    <p className="mt-1 text-sm text-[var(--color-text-muted)]">{event.trail} · {displayDate(event.eventDate)}</p>
                    <p className="mt-1 text-xs text-[var(--color-text-muted)]">{event.startTime}–{event.endTime} · ₹{event.indianPrice.toLocaleString("en-IN")} / ₹{event.foreignPrice.toLocaleString("en-IN")}</p>
                  </div>
                  <span className={`shrink-0 border px-2.5 py-1 text-xs font-semibold ${event.isPublished ? "border-green-800/30 bg-green-50 text-green-900" : "border-[var(--color-border-strong)] text-[var(--color-text-muted)]"}`}>
                    {event.isPublished ? "Published" : "Draft"}
                  </span>
                </div>
                {event.description ? <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[var(--color-text-muted)]">{event.description}</p> : null}
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" disabled={busyId === event.id} onClick={() => startEditing(event)} className={buttonClass}>Edit</button>
                  <button type="button" disabled={busyId === event.id} onClick={() => void updateEvent(event, { isPublished: !event.isPublished })} className={buttonClass}>
                    {busyId === event.id ? "Saving…" : event.isPublished ? "Unpublish" : "Publish"}
                  </button>
                  <button type="button" disabled={busyId === event.id} onClick={() => void deleteEvent(event)} className="border border-red-800/40 px-3 py-2 text-xs font-semibold text-red-900 transition-colors hover:bg-red-50 disabled:cursor-wait disabled:opacity-50">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
