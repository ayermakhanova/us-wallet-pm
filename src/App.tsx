import { Layout } from "./components/layout/Layout";
import { SummaryView } from "./components/views/SummaryView";
import { ListView } from "./components/views/ListView";
import { KanbanView } from "./components/views/KanbanView";
import { TimelineView } from "./components/views/TimelineView";
import { DependencyView } from "./components/views/DependencyView";
import { RiskView } from "./components/views/RiskView";
import { RaciView } from "./components/views/RaciView";
import { DecisionLog } from "./components/views/DecisionLog";
import { ReportsView } from "./components/views/ReportsView";
import { useStore } from "./store/useStore";

function ViewRouter() {
  const currentView = useStore((s) => s.currentView);

  switch (currentView) {
    case "dashboard": return <SummaryView />;
    case "list": return <ListView />;
    case "kanban": return <KanbanView />;
    case "timeline": return <TimelineView />;
    case "dependencies": return <DependencyView />;
    case "risks": return <RiskView />;
    case "raci": return <RaciView />;
    case "decisions": return <DecisionLog />;
    case "reports": return <ReportsView />;
    default: return <SummaryView />;
  }
}

export default function App() {
  return (
    <Layout>
      <ViewRouter />
    </Layout>
  );
}
