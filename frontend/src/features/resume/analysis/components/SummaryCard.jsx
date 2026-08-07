import { FileText } from "lucide-react";
import Card from "../../shared/components/Card";
import CardHeader from "../../shared/components/CardHeader";

const SummaryCard = ({ summary }) => (
  <Card>
    <CardHeader icon={FileText} tone="blue" title="Professional Summary" />
    <p className="text-slate-300 leading-7 text-sm sm:text-base">{summary}</p>
  </Card>
);

export default SummaryCard;