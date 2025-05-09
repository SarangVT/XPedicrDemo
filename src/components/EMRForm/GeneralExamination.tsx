import React, { useState } from "react";
import { GeneralExaminationType } from "../../types/EMRFormTypes";

interface GeneralExaminationProps {
  formData: GeneralExaminationType;
  onChange: (updatedData: Partial<GeneralExaminationType>) => void;
}

export default function GeneralExamination({ formData, onChange }: GeneralExaminationProps) {
  const [unit, setUnit] = useState<'cm' | 'feet'>('cm');
  const [inputHeight, setInputHeight] = useState(formData.height);

  const convertToCm = (height: number, unit: 'cm' | 'feet') => {
    return unit === 'feet' ? height * 30.48 : height;
  };

  const handleHeightInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawHeight = parseFloat(e.target.value);
    setInputHeight(rawHeight);

    const height = convertToCm(rawHeight, unit);
    const BMI = calculateBMI(height, formData.weight);
    onChange({ height, BMI });
  };

  const handleUnitChange = (selectedUnit: 'cm' | 'feet') => {
    setUnit(selectedUnit);
    const height = convertToCm(inputHeight, selectedUnit);
    const BMI = calculateBMI(height, formData.weight);
    onChange({ height, BMI });
  };

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(e.target.value);
    const BMI = calculateBMI(formData.height, weight);
    onChange({ weight, BMI });
  };

  const handleBuiltChange = (built: 'Thin' | 'Average' | 'Good') => {
    onChange({ built });
  };

  const handlePiccleChange = (index: 0 | 1 | 2 | 3 | 4 | 5) => {
    const piccle = formData.piccle.includes(index)
        ? formData.piccle.filter((i) => i !== index)
        : [...formData.piccle, index];
    onChange({ piccle });
  };

  const calculateBMI = (height: number, weight: number): number => {
    if (!height || !weight) return 0;
    const heightInMeters = height / 100;
    return parseFloat((weight / (heightInMeters * heightInMeters)).toFixed(2));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-xl border border-blue-100">

      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-1">Height</label>
        <div className="flex gap-3 items-center">
          <input
            type="number"
            className="p-2 border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
            value={inputHeight || ''}
            onChange={handleHeightInputChange}
            placeholder={`Enter height in ${unit}`}
          />
          <div className="flex gap-2">
            <button
              className={`px-3 py-2 rounded-full text-sm border ${unit === 'cm' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => handleUnitChange('cm')}
              type="button"
            >
              cm
            </button>
            <button
              className={`px-3 py-2 rounded-full text-sm border ${unit === 'feet' ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              onClick={() => handleUnitChange('feet')}
              type="button"
            >
              feet
            </button>
          </div>
        </div>
      </div>

      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-1">Weight (kg)</label>
        <input
          type="number"
          className="p-2 border rounded-md w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
          value={formData.weight || ''}
          onChange={handleWeightChange}
        />
      </div>

      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-1">BMI</label>
        <input
          type="number"
          className="p-2 border rounded-md w-32 bg-gray-100"
          value={formData.BMI || 0}
          readOnly
        />
      </div>

      <div className="mb-5">
        <label className="block font-medium text-gray-700 mb-1">Built</label>
        <div className="flex gap-3">
          {["Thin", "Average", "Good"].map((type) => (
            <button
              key={type}
              onClick={() => handleBuiltChange(type as any)}
              className={`px-4 py-2 rounded-full text-sm border ${formData.built === type ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              type="button"
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-3">
        <label className="block font-medium text-gray-700 mb-2">PICCLE</label>
        <div className="flex flex-wrap gap-2">
          {["P", "I", "C", "C", "L", "E"].map((char, idx) => (
            <button
              key={idx}
              onClick={() => handlePiccleChange(idx as 0 | 1 | 2 | 3 | 4 | 5)}
              className={`px-4 py-2 rounded-full text-sm border ${formData.piccle.includes(idx) ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'}`}
              type="button"
            >
              {char}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}