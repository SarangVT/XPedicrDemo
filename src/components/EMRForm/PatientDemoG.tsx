import { FormData, PatientDemoGraphicsData } from "../../types/EMRFormTypes";
import { differenceInYears } from "date-fns";
import DatePicker from "../DatePicker";

type PatientDemoGFormProps = {
  formData: FormData["demoGData"],
  onChange: (key: keyof PatientDemoGraphicsData, value: string | Date) => void;
}

export default function PatientDemoGForm({ formData, onChange }: PatientDemoGFormProps) {
  const age = formData.dateOfBirth ? differenceInYears(new Date(), formData.dateOfBirth) : '';

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col lg:flex-row gap-24">
        <div className="flex-1 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-12">Patient Profile</h2>

          <div className="flex flex-col">
            <label htmlFor="name" className="text-lg font-medium text-gray-700">Name</label>
            <input
              id="name"
              className="mt-2 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
              placeholder="Enter patient's name"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="dateOfBirth" className="text-lg font-medium text-gray-700 mb-2">Date of Birth</label>
            <DatePicker
              id="dateOfBirth"
              selected={formData.dateOfBirth}
              onChange={(date: Date | null) => {
                if (date) onChange("dateOfBirth", date);
              }}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select Date of Birth"
              maxDate={new Date()}
            />
            <span className="mt-3 text-md text-gray-600">
              {age !== '' ? `Age: ${age} years` : 'Age will appear here'}
            </span>
          </div>

          <div className="flex flex-col">
            <label className="text-lg font-medium text-gray-700 mb-2">Gender</label>
            <div className="flex gap-4">
              {[
                { key: 'm', label: 'Male' },
                { key: 'f', label: 'Female' },
                { key: 'o', label: 'Other' },
              ].map(({ key, label }) => (
                <button
                  key={key}
                  onClick={() => onChange('gender', key)}
                  className={`px-5 py-2 rounded-full font-medium transition-colors duration-300 ease-in-out ${
                    formData.gender === key ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                  } hover:bg-blue-600 hover:text-white`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex-1 space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-12">Other Demographics</h3>

          <div className="flex flex-col gap-6">
            <div className="flex-1">
              <label className="text-lg font-medium text-gray-700">Occupation</label>
              <input
                className="mt-2 p-3 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.occupation}
                onChange={e => onChange('occupation', e.target.value)}
                placeholder="Enter occupation"
              />
            </div>
            <div className="flex-1">
              <label className="text-lg font-medium text-gray-700">Work Location</label>
              <input
                className="mt-2 p-3 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={formData.workLocation}
                onChange={e => onChange('workLocation', e.target.value)}
                placeholder="Enter work location"
              />
            </div>
          </div>

          <div>
            <label className="text-lg font-medium text-gray-700">Residence</label>
            <input
              className="mt-2 p-3 w-full border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={formData.residence}
              onChange={e => onChange('residence', e.target.value)}
              placeholder="Enter residence"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
