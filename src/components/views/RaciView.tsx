import { useState } from "react";
import { Search, Mail, ChevronDown, ChevronRight } from "lucide-react";
import { useStore } from "../../store/useStore";
import { teamOrder } from "../../data/initialData";

const raciColors: Record<string, string> = {
  R: "bg-blue-600 text-white",
  A: "bg-red-500 text-white",
  C: "bg-yellow-400 text-yellow-900",
  I: "bg-slate-200 text-slate-600",
  "": "bg-slate-50 text-slate-300",
};

const raciLabels: Record<string, string> = {
  R: "Responsible",
  A: "Accountable",
  C: "Consulted",
  I: "Informed",
};

const cycleValues = ["", "R", "A", "C", "I"] as const;

export function RaciView() {
  const { teamMembers, updateTeamMemberRaci } = useStore();
  const [search, setSearch] = useState("");
  const [collapsedTeams, setCollapsedTeams] = useState<Set<string>>(new Set());

  const toggleTeam = (team: string) => {
    setCollapsedTeams((prev) => {
      const next = new Set(prev);
      if (next.has(team)) next.delete(team);
      else next.add(team);
      return next;
    });
  };

  // Group members by org (team), preserving teamOrder
  const grouped = teamOrder
    .map((team) => {
      const members = teamMembers.filter((m) => m.org === team);
      if (members.length === 0) return null;
      // Apply search filter
      if (search) {
        const q = search.toLowerCase();
        const filtered = members.filter(
          (m) =>
            m.name.toLowerCase().includes(q) ||
            m.role.toLowerCase().includes(q) ||
            m.org.toLowerCase().includes(q) ||
            (m.email || "").toLowerCase().includes(q)
        );
        if (filtered.length === 0) return null;
        return { team, members: filtered };
      }
      return { team, members };
    })
    .filter(Boolean) as { team: string; members: typeof teamMembers }[];

  const totalMembers = teamMembers.length;
  const raciCounts = {
    R: teamMembers.filter((m) => m.raci === "R").length,
    A: teamMembers.filter((m) => m.raci === "A").length,
    C: teamMembers.filter((m) => m.raci === "C").length,
    I: teamMembers.filter((m) => m.raci === "I").length,
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-sm font-semibold">Project Team</h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {totalMembers} members across {teamOrder.length} teams
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          {Object.entries(raciLabels).map(([key, label]) => (
            <span key={key} className="flex items-center gap-1.5">
              <span
                className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${raciColors[key]}`}
              >
                {key}
              </span>
              {label}
              <span className="text-slate-400">({raciCounts[key as keyof typeof raciCounts]})</span>
            </span>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, role, team, or email..."
          className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-200"
        />
      </div>

      {/* Team Roster Table */}
      <div className="bg-white rounded-xl border overflow-hidden">
        {grouped.map(({ team, members }) => {
          const isCollapsed = collapsedTeams.has(team);
          const teamRaciCounts = {
            R: members.filter((m) => m.raci === "R").length,
            A: members.filter((m) => m.raci === "A").length,
            C: members.filter((m) => m.raci === "C").length,
            I: members.filter((m) => m.raci === "I").length,
          };

          return (
            <div key={team}>
              {/* Team Header */}
              <button
                onClick={() => toggleTeam(team)}
                className="w-full flex items-center gap-2 px-4 py-2.5 bg-slate-50 hover:bg-slate-100 transition-colors text-left border-b"
              >
                {isCollapsed ? (
                  <ChevronRight size={14} className="text-slate-400 shrink-0" />
                ) : (
                  <ChevronDown size={14} className="text-slate-400 shrink-0" />
                )}
                <span className="text-sm font-semibold text-slate-700 flex-1">{team}</span>
                <span className="text-xs text-slate-400">{members.length} member{members.length !== 1 ? "s" : ""}</span>
                <div className="flex items-center gap-1 ml-2">
                  {(["R", "A", "C", "I"] as const).map((r) =>
                    teamRaciCounts[r] > 0 ? (
                      <span
                        key={r}
                        className={`w-5 h-5 rounded flex items-center justify-center text-[9px] font-bold ${raciColors[r]}`}
                      >
                        {teamRaciCounts[r]}
                      </span>
                    ) : null
                  )}
                </div>
              </button>

              {/* Members */}
              {!isCollapsed && (
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-slate-100">
                    {members.map((member) => (
                      <tr key={member.id} className="hover:bg-blue-50/50 transition-colors">
                        <td className="px-4 py-2.5 pl-10 w-[250px]">
                          <span className="font-medium text-slate-800">{member.name}</span>
                        </td>
                        <td className="px-2 py-2.5 text-center w-[60px]">
                          <button
                            onClick={() => {
                              const current = member.raci || "";
                              const idx = cycleValues.indexOf(current as typeof cycleValues[number]);
                              const next = cycleValues[(idx + 1) % cycleValues.length];
                              updateTeamMemberRaci(member.id, next);
                            }}
                            className={`w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold transition-all hover:scale-110 mx-auto ${
                              member.raci ? raciColors[member.raci] : raciColors[""]
                            }`}
                            title={member.raci ? raciLabels[member.raci] : "Click to assign RACI"}
                          >
                            {member.raci || "–"}
                          </button>
                        </td>
                        <td className="px-2 py-2.5 text-slate-500 text-xs">{member.role}</td>
                        <td className="px-4 py-2.5 text-right">
                          {member.email ? (
                            <a
                              href={`mailto:${member.email}`}
                              className="inline-flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 transition-colors"
                              title={member.email}
                            >
                              <Mail size={12} />
                              <span className="hidden xl:inline truncate max-w-[200px]">{member.email}</span>
                            </a>
                          ) : (
                            <span className="text-xs text-slate-300">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })}

        {grouped.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-slate-400">
            No team members match your search.
          </div>
        )}
      </div>
    </div>
  );
}
