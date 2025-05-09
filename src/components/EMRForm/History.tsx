import { FormData } from "../../types/EMRFormTypes";

type HistoryOfPresentIllnessProps = {
  formData: FormData;
  onChange: (historyType: string, updatedHistory: string) => void;
};

export default function History({
  formData,
  onChange,
}: HistoryOfPresentIllnessProps) {
  return (
    <div className="mb-4 mx-8">
      <label className="block text-md font-bold text-gray-700 mb-3 mt-5">
        Past History
      </label>
      <textarea
        value={formData.pastHistory}
        onChange={(e) => onChange("pastHistory", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Describe any relevant past medical history..."
      />

      <label className="block text-md font-bold text-gray-700 mb-3 mt-5">
        Personal History
      </label>
      <textarea
        value={formData.personalHistory}
        onChange={(e) => onChange("personalHistory", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Describe personal habits or lifestyle factors..."
      />

      <label className="block text-md font-bold text-gray-700 mb-3 mt-5">
        Family History
      </label>
      <textarea
        value={formData.familyHistory}
        onChange={(e) => onChange("familyHistory", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Mention any hereditary or familial conditions..."
      />

      <label className="block text-md font-bold text-gray-700 mb-3 mt-5">
        Treatment History
      </label>
      <textarea
        value={formData.treatmentHistory}
        onChange={(e) => onChange("treatmentHistory", e.target.value)}
        rows={10}
        className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-300 text-sm"
        placeholder="Mention any previous treatments, surgeries, or therapies..."
      />
    </div>
  );
}
