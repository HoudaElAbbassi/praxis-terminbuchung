"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string | null;
  imageUrl: string | null;
  order: number;
  isActive: boolean;
};

const EMPTY = { name: "", role: "", description: "", imageUrl: "", order: 0 };

export default function AdminTeamPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== "ADMIN") { router.push("/"); return; }
      fetchMembers();
    }
  }, [status, session]);

  const fetchMembers = async () => {
    setIsLoading(true);
    const res = await fetch("/api/admin/team");
    setMembers(await res.json());
    setIsLoading(false);
  };

  const showMsg = (type: "success" | "error", text: string) => {
    setMsg({ type, text });
    setTimeout(() => setMsg(null), 3000);
  };

  const handleSave = async () => {
    if (!form.name || !form.role) return showMsg("error", "Name und Funktion sind Pflichtfelder.");
    setSaving(true);
    try {
      if (editingId) {
        await fetch(`/api/admin/team/${editingId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showMsg("success", "Teammitglied aktualisiert.");
      } else {
        await fetch("/api/admin/team", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
        showMsg("success", "Teammitglied hinzugefügt.");
      }
      setEditingId(null);
      setIsAdding(false);
      setForm(EMPTY);
      fetchMembers();
    } catch {
      showMsg("error", "Fehler beim Speichern.");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (m: TeamMember) => {
    setEditingId(m.id);
    setIsAdding(false);
    setForm({ name: m.name, role: m.role, description: m.description ?? "", imageUrl: m.imageUrl ?? "", order: m.order });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Teammitglied wirklich löschen?")) return;
    await fetch(`/api/admin/team/${id}`, { method: "DELETE" });
    showMsg("success", "Gelöscht.");
    fetchMembers();
  };

  const handleToggle = async (m: TeamMember) => {
    await fetch(`/api/admin/team/${m.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !m.isActive }),
    });
    fetchMembers();
  };

  const cancelEdit = () => { setEditingId(null); setIsAdding(false); setForm(EMPTY); };

  if (status === "loading" || isLoading) return <div className="min-h-screen flex items-center justify-center">Lädt...</div>;
  if (status === "unauthenticated" || session?.user?.role !== "ADMIN") { router.push("/auth/login"); return null; }

  const showForm = isAdding || editingId !== null;

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-white bg-gray-700 hover:bg-gray-800 px-5 py-2.5 rounded-lg font-medium shadow-md mb-6">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Zurück zum Dashboard
        </Link>

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Team verwalten</h1>
          {!showForm && (
            <button onClick={() => { setIsAdding(true); setEditingId(null); setForm(EMPTY); }}
              className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg font-semibold shadow">
              + Mitglied hinzufügen
            </button>
          )}
        </div>

        {msg && (
          <div className={`px-4 py-3 rounded-lg mb-6 ${msg.type === "success" ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-700"}`}>
            {msg.type === "success" ? "✓ " : "✗ "}{msg.text}
          </div>
        )}

        {/* Formular */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              {editingId ? "Teammitglied bearbeiten" : "Neues Teammitglied"}
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="z.B. Dr. med. Max Mustermann"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Funktion / Titel *</label>
                  <input type="text" value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                    placeholder="z.B. Facharzt für Gefäßchirurgie"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Kurzbeschreibung</label>
                <textarea rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                  placeholder="Optionaler Beschreibungstext..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900 resize-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Foto-URL</label>
                <input type="url" value={form.imageUrl} onChange={e => setForm(f => ({ ...f, imageUrl: e.target.value }))}
                  placeholder="https://... (Link zu einem Foto)"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900" />
                <p className="text-xs text-gray-400 mt-1">Laden Sie das Foto z.B. auf Google Drive hoch und fügen Sie den öffentlichen Link ein.</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reihenfolge</label>
                <input type="number" value={form.order} onChange={e => setForm(f => ({ ...f, order: parseInt(e.target.value) || 0 }))}
                  className="w-32 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 text-gray-900" />
                <p className="text-xs text-gray-400 mt-1">Niedrigere Zahl = wird zuerst angezeigt</p>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={handleSave} disabled={saving}
                className="bg-primary-600 hover:bg-primary-700 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-semibold transition-colors">
                {saving ? "Speichert..." : "Speichern"}
              </button>
              <button onClick={cancelEdit} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2.5 rounded-lg font-semibold transition-colors">
                Abbrechen
              </button>
            </div>
          </div>
        )}

        {/* Mitgliederliste */}
        <div className="space-y-4">
          {members.length === 0 && !showForm && (
            <div className="bg-white rounded-xl shadow-sm p-8 text-center text-gray-500">
              Noch keine Teammitglieder eingetragen. Fügen Sie das erste Mitglied hinzu.
            </div>
          )}
          {members.map(m => (
            <div key={m.id} className={`bg-white rounded-xl shadow-sm p-4 flex gap-4 items-start ${!m.isActive ? "opacity-60" : ""}`}>
              {/* Foto */}
              <div className="w-14 h-14 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden flex items-center justify-center text-gray-400">
                {m.imageUrl ? (
                  <Image src={m.imageUrl} alt={m.name} width={56} height={56} className="object-cover w-full h-full" />
                ) : (
                  <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-900">{m.name}</div>
                <div className="text-sm text-primary-600">{m.role}</div>
                {m.description && <p className="text-sm text-gray-500 mt-1 truncate">{m.description}</p>}
              </div>
              {/* Aktionen */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button onClick={() => handleToggle(m)}
                  className={`text-xs px-3 py-1 rounded-full font-medium ${m.isActive ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                  {m.isActive ? "Aktiv" : "Inaktiv"}
                </button>
                <button onClick={() => handleEdit(m)} className="text-gray-400 hover:text-primary-600 transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
                <button onClick={() => handleDelete(m.id)} className="text-gray-400 hover:text-red-600 transition-colors p-1">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
