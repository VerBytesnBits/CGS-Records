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

  const handlePrint = () => window.print();
  const resetToDefault = () => setData({ ...defaultData });

  return (
    <div>

      {/* Controls */}
      <div className="certificate-controls print-hidden">
        <button onClick={handlePrint} className="btn btn-print">🖨️ Print</button>
        <button onClick={resetToDefault} className="btn btn-reset">↩️ Reset</button>
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

    </div>
  );
};

export default CARRating;