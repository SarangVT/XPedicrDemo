import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Complaint } from "../../types/EMRFormTypes";
import { differenceInDays, subDays } from 'date-fns';

const calculateDateFromDays = (days: number): Date | null => {
  if (days < 0) return null;
  return subDays(new Date(), days);
};

const calculateDaysFromDate = (date: Date | null): string => {
  if (!date) return '';
  const today = new Date();
  const diff = differenceInDays(today, date);
  return diff >= 0 ? String(diff) : '0';
};

type ChiefComplaintProps = {
  formData: Complaint[];
  addComplaint: () => void;
  updateComplaint: (index: number, updated: Complaint) => void;
  deleteComplaint: (index: number) => void;
};

export default function ChiefComplaint({
  formData,
  addComplaint,
  updateComplaint,
  deleteComplaint,
}: ChiefComplaintProps) {
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Chief Complaints</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2 border-b text-left text-sm font-semibold text-gray-600 uppercase">Complaint</th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600 uppercase">Since</th>
              <th className="px-2 py-2 border-b text-left text-sm font-semibold text-gray-600 uppercase">No. of Days</th>
              <th className="px-4 py-2 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {formData.map((complaint, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="px-4 py-3 border-b w-1/2">
                  <input
                    type="text"
                    value={complaint.complaint}
                    onChange={(e) =>
                      updateComplaint(index, { ...complaint, complaint: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter complaint"
                  />
                </td>
                <td className="px-2 py-3 border-b w-1/6">
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={complaint.date ? complaint.date.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const newDate = e.target.value ? new Date(e.target.value) : null;
                      updateComplaint(index, { ...complaint, date: newDate });
                    }}
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                  />
                </td>
                <td className="px-2 py-3 border-b w-1/6">
                  <input
                    type="number"
                    min="0"
                    max="99999"
                    value={calculateDaysFromDate(complaint.date)}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (val === '') {
                        updateComplaint(index, { ...complaint, date: null });
                      } else {
                        const days = parseInt(val, 10);
                        if (!isNaN(days) && days >= 0 && days <= 99999) {
                          updateComplaint(index, { ...complaint, date: calculateDateFromDays(days) });
                        }
                      }
                    }}
                    className="w-full px-2 py-1 border rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </td>
                <td className="px-4 py-3 border-b text-right">
                  <button
                    onClick={() => deleteComplaint(index)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button
        onClick={addComplaint}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center"
      >
        <FontAwesomeIcon icon={faPlus} className="mr-2" />
        Add Complaint
      </button>
    </div>
  );
}