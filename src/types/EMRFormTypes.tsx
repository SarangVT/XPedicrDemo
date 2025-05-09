export type PatientDemoGraphicsData = {
  name: string;
  dateOfBirth: Date | null;
  gender: 'M' | 'F' | 'O' | '';
  occupation: string;
  workLocation: string;
  residence: string;
};

export type Complaint = {
  complaint: string;
  date: Date | null;
};

export type GeneralExaminationType = {
  height: number,
  weight: number,
  built: 'Thin' | 'Average' | 'Good' | '',
  BMI: number,
  piccle: (0 | 1 | 2 | 3 | 4 | 5)[],
}

export interface FormData {
  demoGData: PatientDemoGraphicsData;
  chiefComplaint: Complaint[];
  historyOfPresentIllness: "",
  pastHistory: "",
  personalHistory: "",
  familyHistory: "",
  treatmentHistory: "",
  generalExamination: GeneralExaminationType,
  provisionalDiagnosis: "",
}

export interface FormContextType {
  formData: FormData;
  handleDemoGData: (key: keyof PatientDemoGraphicsData, value: string | Date) => void;
  addComplaint: () => void;
  updateComplaint: (index: number, complaint: Complaint) => void;
  deleteComplaint: (index: number) => void;
  updateHistory: (historyType: string, updatedHistory: string) => void;
  updateGeneralExamination: (updatedData: Partial<FormData["generalExamination"]>) => void;
}