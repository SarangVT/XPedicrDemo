import { createContext, useContext, useState, ReactNode } from 'react';
import { Complaint, FormContextType, FormData, PatientDemoGraphicsData } from '../types/EMRFormTypes';


const FormContext = createContext<FormContextType | undefined>(undefined);

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider = ({ children }: FormProviderProps) => {
  const [formData, setFormData] = useState<FormData>({
    demoGData: {
      name: '',
      dateOfBirth: null,
      gender: '',
      occupation: '',
      workLocation: '',
      residence: '',
    },
    chiefComplaint: [{ complaint: '', date: null }],
    historyOfPresentIllness: "",
    pastHistory: "",
    personalHistory: "",
    familyHistory: "",
    treatmentHistory: "",
    generalExamination: {
      height: 1,
      weight: 0,
      built: '',
      BMI: 0,
      piccle: [],
    },
    provisionalDiagnosis: "",
  });

  const handleDemoGData = (key: keyof PatientDemoGraphicsData, value: string | Date) => {
    setFormData((prevData) => ({
      ...prevData,
      demoGData: {
        ...prevData.demoGData,
        [key]: value,
      },
    }));
  };

  const addComplaint = () => {
    setFormData((prevData) => ({
      ...prevData,
      chiefComplaint: [...prevData.chiefComplaint, { complaint: '', date: null }],
    }));
  };

  const updateComplaint = (index: number, updatedComplaint: Complaint) => {
    setFormData((prevData) => {
      const updated = [...prevData.chiefComplaint];
      updated[index] = updatedComplaint;
      return {
        ...prevData,
        chiefComplaint: updated,
      };
    });
  };

  const deleteComplaint = (index: number) => {
    setFormData((prevData) => {
      const updated = prevData.chiefComplaint.filter((_, i) => i !== index);
      return {
        ...prevData,
        chiefComplaint: updated,
      };
    });
  };

  const updateHistory = (historyType: string, updatedHistory: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [historyType]: updatedHistory,
      };
    });
  };

  const updateGeneralExamination = (updatedData: Partial<FormData["generalExamination"]>) => {
    setFormData((prevData) => ({
      ...prevData,
      generalExamination: {
        ...prevData.generalExamination,
        ...updatedData,
      },
    }));
  };

  return (
    <FormContext.Provider
      value={{ formData, handleDemoGData, addComplaint, updateComplaint, deleteComplaint, updateHistory, updateGeneralExamination}}
    >
      {children}
    </FormContext.Provider>
  );
};

export const useEMRForm = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useForm must be used within a FormProvider');
  }
  const { formData, handleDemoGData, addComplaint, updateComplaint, deleteComplaint, updateHistory, updateGeneralExamination} = context;
  return { formData, handleDemoGData, addComplaint, updateComplaint, deleteComplaint, updateHistory, updateGeneralExamination};
};