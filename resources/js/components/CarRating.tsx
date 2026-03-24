// CARRating.tsx
import React, { useState } from 'react';

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
    <div
      className="flex-1 flex flex-col items-center px-6 py-5 font-serif"
      style={{ fontFamily: "'Times New Roman', serif", color: 'black' }}
    >
      {/* Header with logos and title */}
      <div className="flex items-center justify-center w-full gap-4 pt-4">
        <img
          src="/path/to/yellow-logo.png"
          alt="Left Logo"
          className="w-16 h-16 object-contain"
          style={{ flexShrink: 0 }}
        />
        <div className="text-center flex-1" style={{ lineHeight: 1.1, fontSize: 13, fontWeight: 'normal' }}>
          <p style={{ fontWeight: 'bold', margin: 0 }}>PALOMPON INSTITUTE OF TECHNOLOGY</p>
          <p style={{ margin: 0 }}>COLLEGE OF GRADUATE STUDIES</p>
          <p style={{ margin: 0 }}>Palompon, Leyte</p>
        </div>
        <img
          src="/path/to/green-logo.png"
          alt="Right Logo"
          className="w-16 h-16 object-contain"
          style={{ flexShrink: 0 }}
        />
      </div>

      {/* Title */}
      <div className="text-center w-full mt-2" style={{ fontSize: 13, fontWeight: 'bold', lineHeight: 1.2 }}>
        <p style={{ margin: 0 }}>COMPREHENSIVE EXAMINATION</p>
        <p style={{ margin: '0 0 8px 0' }}>REPORT OF RATING</p>
        <p style={{ margin: 0 }}>{programLabel}</p>
      </div>

      {/* Examinee Info Box */}
      <div
        style={{
          border: '4px double black',
          borderRadius: 12,
          padding: '12px 16px',
          width: '100%',
          marginTop: 24,
          fontSize: 13,
          lineHeight: 1.3,
          fontWeight: 'normal',
          color: 'black',
        }}
      >
        <p style={{ margin: '4px 0' }}>
          Examinee:{' '}
          <strong style={{ fontWeight: 'bold' }}>
            {fullName}
          </strong>
        </p>
        <p style={{ margin: '4px 0' }}>
          Examinee Number:{' '}
          <strong style={{ fontWeight: 'bold' }}>{data.examineeNumber}</strong>
        </p>
        <p style={{ margin: '4px 0' }}>
          Program & Specialization:{' '}
          <strong style={{ fontWeight: 'bold' }}>{data.programShort}</strong>
        </p>
        <p style={{ margin: '4px 0' }}>
          Date of Examination:{' '}
          <strong style={{ fontWeight: 'bold' }}>{data.examDate}</strong>
        </p>
      </div>

      {/* Rating Box */}
      <p
        style={{
          fontSize: 13,
          fontWeight: 'bold',
          marginTop: 32,
          marginBottom: 8,
          width: '100%',
          textAlign: 'center',
          letterSpacing: 0.5,
        }}
      >
        COMPREHENSIVE RATING OF EXAMINEE
      </p>

      <div
        style={{
          border: '4px double black',
          borderRadius: 12,
          padding: '12px 16px',
          width: '100%',
          fontSize: 13,
          color: 'black',
          fontWeight: 'normal',
          lineHeight: 1.3,
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: 13,
            color: 'black',
          }}
          aria-label="Rating Table"
        >
          <thead>
            <tr>
              <th style={{ textAlign: 'left', paddingBottom: 8, fontWeight: 'bold' }}>Area</th>
              <th style={{ textAlign: 'left', paddingBottom: 8, fontWeight: 'bold' }}>Rating</th>
            </tr>
          </thead>
          <tbody>
            {data.areas.map((row, idx) => (
              <tr key={idx}>
                <td style={{ padding: '2px 0' }}>{row.area}</td>
                <td style={{ padding: '2px 0', fontWeight: 'bold' }}>{row.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note */}
      <p
        style={{
          fontSize: 12,
          fontWeight: 'normal',
          marginTop: 24,
          width: '100%',
          lineHeight: 1.3,
          textAlign: 'left',
        }}
      >
        Note: This is the{' '}
        <span>(<strong>x</strong>)</span> first{' '}
        <span>( )</span> second time the student took the examination in{' '}
        <strong style={{ textDecoration: 'underline' }}>All Areas.</strong>
      </p>

      {/* Signature */}
      <div
        style={{
          marginTop: 48,
          width: '100%',
          textAlign: 'center',
          fontSize: 13,
          fontWeight: 'bold',
          textDecoration: 'underline',
          lineHeight: 1.1,
          userSelect: 'none',
        }}
      >
        JENNIFER A. GORUMBA, EdD
        <p style={{ fontWeight: 'normal', textDecoration: 'none', marginTop: 4 }}>Dean</p>
      </div>

      {/* Footer */}
      <div style={{ width: '100%', marginTop: 48, fontSize: 8, color: 'black', userSelect: 'none' }}>
        <p style={{ margin: 0 }}>NOT VALID WITHOUT SEAL</p>
        <div
          style={{
            border: '1px solid black',
            width: 120,
            padding: '2px 4px',
            marginTop: 4,
            backgroundColor: 'white',
            lineHeight: 1.1,
          }}
        >
          <p style={{ margin: 0, fontWeight: 'normal' }}>DOC STAMP PAID ₱ 30.00</p>
          <p style={{ margin: 0, fontWeight: 'normal' }}>OR NO. _______________</p>
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
    <div className="min-h-screen bg-white">
      {/* Controls - hidden when printing */}
      <div className="p-4 print:hidden">
        <h2 className="text-xl font-bold mb-2">CAR Rating</h2>
        <p className="text-gray-600 text-sm mb-4">
          Generate the Comprehensive Examination Report of Rating for graduate students.
        </p>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={openModal}
            className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-blue-700"
          >
            ✏️ Edit CAR Rating Data
          </button>
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-green-600 text-white rounded-md text-sm flex items-center gap-1 hover:bg-green-700"
          >
            🖨️ Print CAR Rating
          </button>
          <button
            onClick={resetToDefault}
            className="px-4 py-2 bg-gray-500 text-white rounded-md text-sm flex items-center gap-1 hover:bg-gray-600"
          >
            ↩️ Reset to Default
          </button>
        </div>
      </div>

      {/* Certificate Preview - Letter Landscape */}
      <div className="flex justify-center items-start p-5 print:p-0">
        <div
          className="bg-white flex flex-row overflow-hidden print:shadow-none"
          style={{
            width: '11in',
            height: '8.5in',
          }}
        >
          <CertificateHalf data={data} />
          <CertificateHalf data={data} />
        </div>
      </div>

      {/* Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex justify-center items-center print:hidden"
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
              <div className="mb-6">
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