import { FormData } from "../../types/EMRFormTypes";

type HistoryOfPresentIllnessProps = {
  formData: FormData["historyOfPresentIllness"];
  onChange: (historyType: string, updatedHistory: string) => void;
};

export default function HistoryOfPresentIllness({
  formData,
  onChange,
}: HistoryOfPresentIllnessProps) {
  return (
    <div className="mb-4 mx-6">
      <textarea
        value={formData}
        onChange={(e) => onChange("historyOfPresentIllness", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Describe the history of the present illness..."
      />
    </div>
  );
}
