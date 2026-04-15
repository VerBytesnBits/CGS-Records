// CARRating.tsx
import React, { useState } from 'react';
import "./CarRating.css";

interface RatingArea {
  area: string;
  rating: string;
}

interface CARData {
  lastName: string;
  firstName: string;
  middleInitial: string;
  programFull: string;
  programShort: string;
  examDate: string;
  overallRating: string;
  attempt: 'first' | 'second';
  programLevel: 'masters' | 'doctors';
  examineeNumber: string;
  areas: RatingArea[];
}

const defaultData: CARData = {
  lastName: 'COLON',
  firstName: 'JIAMIE',
  middleInitial: 'B.',
  programFull: 'Master of Arts in Education major in Science',
  programShort: 'MAED – Science',
  examDate: 'April 13 & 17, 2025',
  overallRating: 'PASSED',
  attempt: 'first',
  programLevel: 'masters',
  examineeNumber: '003-AP25',
  areas: [
    { area: 'Specialization', rating: 'High Passed' },
    { area: 'Statistics', rating: 'High Passed' },
    { area: 'Research', rating: 'Low Passed' },
    { area: 'Philo-Socio-Psycho', rating: 'Passed' },
  ],
};
const programOptions = [
  { value: 'Master of Arts in Education major in English|MAED – English', label: 'MAEd – English' },
  { value: 'Master of Arts in Education major in Mathematics|MAED – Mathematics', label: 'MAEd – Mathematics' },
  { value: 'Master of Arts in Education major in Filipino|MAED – Filipino', label: 'MAEd – Filipino' },
  { value: 'Master of Arts in Education major in Social Studies|MAED – Social Studies', label: 'MAEd – Social Studies' },
  { value: 'Master of Arts in Education major in Science|MAED – Science', label: 'MAEd – Science' },
  { value: 'Master in Public Administration|MPA', label: 'Master in Public Administration' },
  { value: 'Master of Business Administration|MBA', label: 'Master of Business Administration' },
];

const ratingOptions = ['High Passed', 'Passed', 'Low Passed', 'Failed', ''];

const CertificateHalf: React.FC<{ data: CARData }> = ({ data }) => {
  const fullName = `${data.lastName}, ${data.firstName}${data.middleInitial ? ' ' + data.middleInitial : ''}`;
  const programLabel = data.programLevel === 'doctors' ? '(DOCTORAL PROGRAM)' : "(MASTER'S PROGRAM)";

  return (
    <div className="container">

      {/* Header */}
      <div className="header">
        <img src="/IMAGE/pit_logo.jpg" alt="Left Logo" className="logo" />

        <div className="header-text">
          <p className="bold">PALOMPON INSTITUTE OF TECHNOLOGY</p>
          <p>COLLEGE OF GRADUATE STUDIES</p>
          <p>Palompon, Leyte</p>
        </div>

        <img src="/IMAGE/nobg_cgs.png" alt="Right Logo" className="logo" />
      </div>

      {/* Title */}
      <div className="title">
        <p>COMPREHENSIVE EXAMINATION</p>
        <p className="mb">REPORT OF RATING</p>
        <p>{programLabel}</p>
      </div>

      {/* Examinee Info */}
      <div className="box">
        <p>Examinee: <strong>{fullName}</strong></p>
        <p>Examinee Number: <strong>{data.examineeNumber}</strong></p>
        <p>Program & Specialization: <strong>{data.programShort}</strong></p>
        <p>Date of Examination: <strong>{data.examDate}</strong></p>
      </div>

      {/* Rating Title */}
      <p className="s">COMPREHENSIVE RATING OF EXAMINEE</p>

      {/* Table */}
      <div className="box">
        <table className="table">
          <thead>
            <tr>
              <th>Area</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.areas.map((row, idx) => (
              <tr key={idx}>
                <td>{row.area}</td>
                <td className="bold">{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p className="note">
        Note: This is the (
        <strong>{data.attempt === 'first' ? 'x' : ''}</strong>) first (
        <strong>{data.attempt === 'second' ? 'x' : ''}</strong>) second time the student took the examination in{' '}
        <strong className="underline">All Areas.</strong>
      </p>

      {/* Signature */}
      <div className="car-signature">
        <p className="car-sig-name">JENNIFER A. GORUMBA, EdD</p>
        <p className="car-sig-title">Dean</p>
      </div>

      {/* Footer */}
      <div className="car-footer">
        <p className="car-not-valid">NOT VALID WITHOUT SEAL</p>
        <div className="car-stamp-box">
          <p>DOC STAMP PAID ₱ 30.00</p>
          <p>OR NO. _______________</p>
        </div>
      </div>
    </div>
  );
};


const CARRating: React.FC = () => {
  const [data, setData] = useState<CARData>({ ...defaultData });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editData, setEditData] = useState<CARData>({ ...defaultData });

  const openModal = () => {
    setEditData({ ...data });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setData({
      ...editData,
      lastName: editData.lastName.toUpperCase(),
      firstName: editData.firstName.toUpperCase(),
      middleInitial: editData.middleInitial.toUpperCase(),
    });
    closeModal();
  };

  const handleProgramChange = (value: string) => {
    if (value.includes('|')) {
      const [full, short] = value.split('|');
      setEditData((prev) => ({ ...prev, programFull: full, programShort: short }));
    }
  };

  const addArea = () => {
    setEditData((prev) => ({
      ...prev,
      areas: [...prev.areas, { area: '', rating: '' }],
    }));
  };

  const removeArea = (idx: number) => {
    setEditData((prev) => ({
      ...prev,
      areas: prev.areas.filter((_, i) => i !== idx),
    }));
  };

  const updateArea = (idx: number, field: keyof RatingArea, value: string) => {
    setEditData((prev) => ({
      ...prev,
      areas: prev.areas.map((a, i) => (i === idx ? { ...a, [field]: value } : a)),
    }));
  };

  const resetToDefault = () => setData({ ...defaultData });

  const handlePrint = () => window.print();

  const programLevelLabel =
    editData.programLevel === 'doctors' ? '(DOCTORAL PROGRAM)' : "(MASTER'S PROGRAM)";

  return (
    <div className='flex flex-col gap-4'>

      {/* Controls - hidden when printing */}
      <div className="p-4 print:hidden text-center">
        <h2 className="text-[50px] font-bold text-slate-600">CAR Rating</h2>
        <p className="text-gray-600 text-sm mb-4">
          Generate the Comprehensive Examination Report of Rating for graduate students.
        </p>
            {/* Controls */}
        {/* BOTTOM: Buttons */}
        <div className="flex justify-center gap-3 flex-wrap">
          <div className="certificate-controls">
            <button className="btn btn-edit" onClick={openModal}>
              <i className="fas fa-edit"></i> Edit
            </button>
            <button className="btn btn-print" onClick={handlePrint}>
              <i className="fas fa-print"></i> Print
            </button>
            <button className="btn btn-reset" onClick={resetToDefault}>
              <i className="fas fa-undo"></i> Reset
            </button>
          </div>
        </div>
      </div>




      {/* LANDSCAPE PAPER */}
      <div className="car-landscape-wrapper">
        <div className="car-page">
          <div className="car-half">
            <CertificateHalf data={data} />
          </div>
          <div className="car-half">
            <CertificateHalf data={data} />
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-99999 flex justify-center items-center print:hidden"
          onClick={(e) => e.target === e.currentTarget && closeModal()}
        >
          <div className="bg-white rounded-lg w-[95%] max-w-[700px] max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b sticky top-0 bg-white z-10">
              <h2 className="text-lg font-bold">✏️ Edit CAR Rating Information</h2>
              <button onClick={closeModal} className="text-2xl text-gray-500 hover:text-gray-800">
                ×
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-4">
              {/* Student Info */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">Student Information</h3>
                <div className="flex gap-3 flex-wrap">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Last Name</label>
                    <input
                      type="text"
                      value={editData.lastName}
                      onChange={(e) => setEditData((p) => ({ ...p, lastName: e.target.value }))}
                      className="w-full p-2 border rounded text-sm"
                      required
                    />
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-gray-500 mb-1">First Name</label>
                    <input
                      type="text"
                      value={editData.firstName}
                      onChange={(e) => setEditData((p) => ({ ...p, firstName: e.target.value }))}
                      className="w-full p-2 border rounded text-sm"
                      required
                    />
                  </div>
                  <div className="w-20">
                    <label className="block text-xs font-bold text-gray-500 mb-1">M.I.</label>
                    <input
                      type="text"
                      value={editData.middleInitial}
                      onChange={(e) => setEditData((p) => ({ ...p, middleInitial: e.target.value }))}
                      className="w-full p-2 border rounded text-sm"
                      maxLength={3}
                    />
                  </div>
                </div>
                <div className="flex gap-3 flex-wrap mt-2">
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Program / Degree</label>
                    <select
                      onChange={(e) => handleProgramChange(e.target.value)}
                      className="w-full p-2 border rounded text-sm"
                      defaultValue={`${editData.programFull}|${editData.programShort}`}
                    >
                      <option value="">Select a program…</option>
                      {programOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex-1 min-w-[140px]">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Date of Examination</label>
                    <input
                      type="text"
                      value={editData.examDate}
                      onChange={(e) => setEditData((p) => ({ ...p, examDate: e.target.value }))}
                      className="w-full p-2 border rounded text-sm"
                      placeholder="e.g. April 13 & 17, 2025"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Program Level */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Program Level{' '}
                  <span className="text-xs font-normal text-gray-400">
                    (affects the highlighted label on the certificate)
                  </span>
                </h3>
                <div className="flex gap-3 items-end flex-wrap">
                  <div className="w-60">
                    <label className="block text-xs font-bold text-gray-500 mb-1">Program Type</label>
                    <select
                      value={editData.programLevel}
                      onChange={(e) =>
                        setEditData((p) => ({
                          ...p,
                          programLevel: e.target.value as 'masters' | 'doctors',
                        }))
                      }
                      className="w-full p-2 border rounded text-sm"
                    >
                      <option value="masters">Master's Program</option>
                      <option value="doctors">Doctor's Program</option>
                    </select>
                  </div>
                  <div className="border rounded px-3 py-2 text-sm font-bold font-serif bg-gray-50 tracking-wide">
                    {programLevelLabel}
                  </div>
                </div>
              </div>

              {/* Rating Areas */}
              <div className="mb-4">
                <h3 className="text-sm font-semibold text-gray-600 mb-2">
                  Rating Areas (show all areas and their rating)
                </h3>
                <div className="flex flex-col gap-2">
                  {editData.areas.map((area, idx) => (
                    <div key={idx} className="flex gap-2 flex-wrap items-end">
                      <input
                        type="text"
                        placeholder="Area (e.g., Specialization)"
                        value={area.area}
                        onChange={(e) => updateArea(idx, 'area', e.target.value)}
                        className="flex-1 p-2 border rounded text-sm"
                        required
                      />
                      <select
                        value={area.rating}
                        onChange={(e) => updateArea(idx, 'rating', e.target.value)}
                        className="w-48 p-2 border rounded text-sm"
                        required
                      >
                        <option value="">Select rating…</option>
                        {ratingOptions.map((rating) => (
                          <option key={rating} value={rating}>
                            {rating}
                          </option>
                        ))}
                      </select>
                      {editData.areas.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeArea(idx)}
                          className="text-red-500 hover:text-red-700 text-xl"
                          title="Remove this area"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addArea}
                    className="mt-2 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                  >
                    + Add Area
                  </button>
                </div>
              </div>
              <div className='flex flex-row justify-between'>
                {/* Overall Rating */}
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">Overall Rating</h3>
                  <select
                    value={editData.overallRating}
                    onChange={(e) => setEditData((p) => ({ ...p, overallRating: e.target.value }))}
                    className="w-60 p-2 border rounded text-sm"
                  >
                    <option value="PASSED">PASSED</option>
                    <option value="FAILED">FAILED</option>
                  </select>
                </div>

                {/* Attempt */}
                <div className="">
                  <h3 className="text-sm font-semibold text-gray-600 mb-2">
                    Attempt (how many times took the exam)
                  </h3>
                  <select
                    value={editData.attempt}
                    onChange={(e) => setEditData((p) => ({ ...p, attempt: e.target.value as 'first' | 'second' }))}
                    className="w-60 p-2 border rounded text-sm"
                  >
                    <option value="first">First</option>
                    <option value="second">Second</option>
                  </select>
                </div>
              </div>
              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CARRating;