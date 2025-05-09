import { FormData } from "../../types/EMRFormTypes";

type ProvisionalDiagnosisProps = {
  formData: FormData["provisionalDiagnosis"];
  onChange: (historyType: string, updatedHistory: string) => void;
};

export default function ProvisionalDiagnosis({
  formData,
  onChange,
}: ProvisionalDiagnosisProps) {
  return (
    <div className="mb-4 mx-6">
      <textarea
        value={formData}
        onChange={(e) => onChange("provisionalDiagnosis", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Any provisional diagnosis..."
      />
    </div>
  );
}
