import React, { useState, useEffect } from "react";

import "./CarCertificate.css";

interface CertificateData {
  title: string;
  firstName: string;
  middleInitial: string;
  lastName: string;
  program: string;
  semesterStart: string;
  semesterEnd: string;
  untilPresent: boolean;
  units: string;
  issueDate: string;
}

const CarCertificate: React.FC = () => {
  const [data, setData] = useState<CertificateData>({
    title: "Ms.",
    firstName: "",
    middleInitial: "",
    lastName: "",
    program: "",
    semesterStart: "",
    semesterEnd: "",
    untilPresent: false,
    units: "",
    issueDate: new Date().toLocaleDateString(),
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddProgramModal, setShowAddProgramModal] = useState(false);
  const [newProgram, setNewProgram] = useState("");

  const programs = [
    "Master of Arts in Education major in Education Management",
    "Master of Arts in Education major in Elementary Education",
    "Master of Arts in Education major in English",
    "Master of Arts in Education major in Filipino",
    "Master of Arts in Education major in Guidance and Counseling",
    "Master of Arts in Education major in Mathematics",
    "Master of Arts in Education major in Marine Engineering and Nautical Science",
    "Master of Arts in Education major in Physical Education",
    "Master of Arts in Education major in Science",
  ];

const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target;

    // Narrow down if it's a checkbox
    if (target instanceof HTMLInputElement && target.type === "checkbox") {
        setData({
            ...data,
            [target.name]: target.checked, // use 'checked' for checkboxes
        });
    } else {
        setData({
            ...data,
            [target.name]: target.value,
        });
    }
};

  // Update certificate info
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowEditModal(false);
  };

  // Add new program
  const handleAddProgram = (e: React.FormEvent) => {
    e.preventDefault();
    if (newProgram.trim() !== "") {
      programs.push(newProgram);
      setData({ ...data, program: newProgram });
      setNewProgram("");
      setShowAddProgramModal(false);
    }
  };

  // Print certificate
  const printCertificate = () => {
    window.print();
  };

  // Reset to default
  const resetToDefault = () => {
    setData({
      title: "Ms.",
      firstName: "",
      middleInitial: "",
      lastName: "",
      program: "",
      semesterStart: "",
      semesterEnd: "",
      untilPresent: false,
      units: "",
      issueDate: new Date().toLocaleDateString(),
    });
  };

  return (
    <section id="certificate" className="section">
     
      {/* Controls */}
      <div className="certificate-controls">
        <button className="btn btn-primary" onClick={() => setShowEditModal(true)}>
          <i className="fas fa-edit"></i> Edit Certificate Data
        </button>
        <button className="btn btn-success" onClick={printCertificate}>
          <i className="fas fa-print"></i> Print Certificate
        </button>
        <button className="btn btn-secondary" onClick={resetToDefault}>
          <i className="fas fa-undo"></i> Reset to Default
        </button>
      </div>

      {/* Certificate Preview */}
      <div className="certificate-container">
        <div className="certificate">
          <div className="watermark">
            <img src="/IMAGE/nobg_cgs.png" alt="Watermark" className="watermark-image" />
          </div>

          <div className="cert-header">
            <img src="/IMAGE/pit_logo.jpg" className="logo-left" alt="" />
            <div className="header-text">
              <p className="republic">Republic of the Philippines</p>
              <p className="institute"><strong>PALOMPON INSTITUTE OF TECHNOLOGY</strong></p>
              <p className="location">Palompon, Leyte</p>
              <p className="college-title"><strong>COLLEGE OF GRADUATE STUDIES</strong></p>
            </div>
            <img src="/IMAGE/nobg_cgs.png" className="logo-right" alt="" />
          </div>

          <div className="cert-title"><h1><strong>CERTIFICATION</strong></h1></div>

          <div className="cert-content">
            <p className="to-whom"><strong>TO WHOM IT MAY CONCERN:</strong></p>
            <p className="cert-para">
              THIS IS TO CERTIFY that <strong><u>{data.title} {data.firstName} {data.middleInitial} {data.lastName}</u></strong> is a graduate student under the <strong><u>{data.program}</u></strong> program since <strong><u>{data.semesterStart}</u></strong>{data.untilPresent ? " until present" : data.semesterEnd ? ` until ${data.semesterEnd}` : ""}.
            </p>
            <p className="cert-para-plain">
              This is to certify further that <span className="pronoun-subject">{data.title === "Ms." ? "she" : "he"}</span> has obtained <strong><u>{data.units}</u></strong> of the said program/degree.
            </p>
            <p className="cert-para-plain">
              This certification is issued to <strong><u>{data.lastName}</u></strong> for whatever legal purpose it may serve <span className="pronoun-possessive">{data.title === "Ms." ? "her" : "his"}</span> best.
            </p>
            <p className="cert-para-plain">
              Issued this <strong>{data.issueDate}</strong> at the Palompon Institute of Technology, Palompon, Leyte.
            </p>
          </div>

          <div className="signature-footer-wrapper">
            <div className="signature-area">
              <p className="sig-name"><strong>JENNIFER A. GORUMBA, EdD</strong></p>
              <p className="sig-title">Dean, CGS</p>
            </div>
            <div className="cert-foot">
              <p className="not-valid">NOT VALID WITHOUT SEAL</p>
              <div className="stamp-box">
                <p>DOC STAMP PAID ₱ 30.00</p>
                <p>OR NO. _______________</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay" onClick={() => setShowEditModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><i className="fas fa-edit"></i> Edit Certificate Information</h2>
              <span className="close" onClick={() => setShowEditModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditSubmit}>
                <div className="form-section">
                  <label>Title</label>
                  <select name="title" value={data.title} onChange={handleChange}>
                    <option value="Ms.">Ms.</option>
                    <option value="Mr.">Mr.</option>
                  </select>

                  <label>First Name</label>
                  <input name="firstName" value={data.firstName} onChange={handleChange} required />

                  <label>Middle Initial</label>
                  <input name="middleInitial" value={data.middleInitial} onChange={handleChange} maxLength={2} />

                  <label>Last Name</label>
                  <input name="lastName" value={data.lastName} onChange={handleChange} required />
                </div>

                <div className="form-section">
                  <label>Program / Degree</label>
                  <div className="program-input-group">
                    <select name="program" value={data.program} onChange={handleChange} required>
                      {programs.map((p, i) => <option key={i} value={p}>{p}</option>)}
                    </select>
                    <button type="button" onClick={() => setShowAddProgramModal(true)}>Add Program</button>
                  </div>
                </div>

                <div className="form-section">
                  <label>Start Semester &amp; School Year</label>
                  <input name="semesterStart" value={data.semesterStart} onChange={handleChange} required />

                  <label>End Semester &amp; School Year</label>
                  <input name="semesterEnd" value={data.semesterEnd} onChange={handleChange} />
                  <label>
                    <input type="checkbox" name="untilPresent" checked={data.untilPresent} onChange={handleChange} /> Until at present
                  </label>

                  <label>Units Completed</label>
                  <input name="units" value={data.units} onChange={handleChange} required />
                </div>

                <div className="modal-footer">
                  <button type="button" onClick={() => setShowEditModal(false)}>Cancel</button>
                  <button type="submit">Update Certificate</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Program Modal */}
      {showAddProgramModal && (
        <div className="modal-overlay" onClick={() => setShowAddProgramModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2><i className="fas fa-plus"></i> Add New Program</h2>
              <span className="close" onClick={() => setShowAddProgramModal(false)}>&times;</span>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddProgram}>
                <label>Program Name</label>
                <input value={newProgram} onChange={(e) => setNewProgram(e.target.value)} required />
                <div className="modal-footer">
                  <button type="button" onClick={() => setShowAddProgramModal(false)}>Cancel</button>
                  <button type="submit">Add Program</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CarCertificate;