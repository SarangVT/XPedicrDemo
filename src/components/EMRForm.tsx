import { useState } from "react";
import PatientDemoGForm from "./EMRForm/PatientDemoG";
import { useEMRForm } from "../context/FormContext";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import ChiefComplaint from "./EMRForm/ChiefComplaint";
import HistoryOfPresentIllness from "./EMRForm/HistoryOfPresentIllness";
import History from "./EMRForm/History";
import GeneralExamination from "./EMRForm/GeneralExamination";
import ProvisionalDiagnosis from "./EMRForm/ProvisionalDiagnosis";

export default function EMRForm () {
    const Headings: string[] = ["Patient Demographics" , "Chief Complaint Note" , "History of Present Illness" , "History" , 'General Examination' , "Provisional Diagnosis"];
    const [ section, setSection ] = useState(0);
    const {formData, handleDemoGData, addComplaint, updateComplaint, deleteComplaint, updateHistory, updateGeneralExamination} = useEMRForm();

    return (
        <div className="flex flex-col">
        <h1 className="text-4xl font-bold text-blue pt-4 justify-center flex">Telemedicine EMR Form</h1>
        <div className="flex flex-col max-w-full m-10 px-4 py-2 gap-6 shadow-2xl rounded-2xl bg-white">
            <h2 className="text-3xl font-bold text-blue px-8 pt-8">{Headings[section]}</h2>

            <div className="w-full justify-center items-center">
                {section === 0 && <PatientDemoGForm formData={formData.demoGData} onChange={handleDemoGData} />}
                {section === 1 && <ChiefComplaint formData={formData.chiefComplaint} addComplaint={addComplaint} deleteComplaint={deleteComplaint} updateComplaint={updateComplaint}/>}
                {section === 2 && <HistoryOfPresentIllness formData={formData.historyOfPresentIllness} onChange={updateHistory}/>}
                {section === 3 && <History formData={formData} onChange={updateHistory}/>}
                {section === 4 && <GeneralExamination formData={formData.generalExamination} onChange={updateGeneralExamination}/>}
                {section === 5 && <ProvisionalDiagnosis formData={formData.provisionalDiagnosis} onChange={updateHistory}/>}
            </div>
            
            <div className="flex justify-between items-end w-full mt-4">
            {section !== 0 ? (
                <button
                onClick={() => setSection(section - 1)}
                className="font-semibold px-8 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 transition duration-200 flex items-center space-x-2"
                >
                <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
                <span>Back</span>
                </button>
            ) : <div></div>}

            {section !== 5 && (
                <button
                onClick={() => setSection(section + 1)}
                className="font-semibold px-8 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                >
                <span>Next</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                </button>
            )}
            </div>

        </div>
        </div>
    );
}
