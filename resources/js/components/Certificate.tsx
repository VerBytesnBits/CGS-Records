import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Certificate.css";


interface OrdinalDate {
    day: number;
    suffix: string;
    month: string;
    year: number;
}

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



const formatOrdinalDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const day = date.getDate();

    const suffix =
        day % 10 === 1 && day !== 11
            ? "st"
            : day % 10 === 2 && day !== 12
                ? "nd"
                : day % 10 === 3 && day !== 13
                    ? "rd"
                    : "th";

    const month = date.toLocaleString("default", { month: "long" });
    const year = date.getFullYear();

    return { day, suffix, month, year };
};



const defaultData: CertificateData = {
    title: "Ms.",
    firstName: "Ana Marie",
    middleInitial: "M.",
    lastName: "Ardeño",
    program: "Master of Arts in Education major in English",
    semesterStart: "1st Semester, S.Y. 2025-2026",
    semesterEnd: "",
    untilPresent: false,
    units: "6",
    issueDate: new Date().toISOString().split("T")[0],
};

const Certificate: React.FC = () => {
   const [data, setData] = useState<CertificateData>(() => ({
        ...defaultData,
        issueDate: new Date().toISOString().split("T")[0],
    }));

    const formattedDate = formatOrdinalDate(data.issueDate);
    const [showModal, setShowModal] = useState(false);
    const [showAddProgramModal, setShowAddProgramModal] = useState(false);
    const [customPrograms, setCustomPrograms] = useState<string[]>([]);
    const [newProgram, setNewProgram] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const res = await axios.get("/api/car-certificate");
            if (res.data) setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value, type } = e.target;
        if (type === "checkbox") {
            const checked = (e.target as HTMLInputElement).checked;
            setData({ ...data, [name]: checked });
        } else {
            setData({ ...data, [name]: value });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/car-certificate", data);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    const handleAddProgram = () => {
        if (newProgram.trim()) {
            setCustomPrograms([...customPrograms, newProgram.trim()]);
            setData({ ...data, program: newProgram.trim() });
            setNewProgram("");
            setShowAddProgramModal(false);
        }
    };



    const resetToDefault = () =>
    setData({
        ...defaultData,
        issueDate: new Date().toISOString().split("T")[0],
    });

    const printCertificate = () => {
        const target = document.getElementById("CertificatePreview");
        if (!target) return;

        const style = document.createElement("style");
        style.innerHTML = `
@media print {

    * {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    @page {
        size: letter portrait;
        margin: 0;
    }

    html, body {
        margin: 0 !important;
        padding: 0 !important;
        height: 100% !important;
        overflow: hidden !important;
    }

    body * { visibility: hidden !important; }

    #CertificatePreview,
    #CertificatePreview * {
        visibility: visible !important;
    }

    #CertificatePreview {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        overflow: hidden !important;
        page-break-after: avoid !important;
        page-break-inside: avoid !important;
    }

    .cert-wrapper {
        max-width: 760px !important;
        height: 100vh !important;
        margin: auto !important;
        box-shadow: none !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
    }

    .certificate {
        position: relative !important;
        width: 100% !important;
        height: 100vh !important;        /* ← fills exactly one page */
        background: #fff !important;
        overflow: hidden !important;     /* ← clips anything that bleeds */
        page-break-inside: avoid !important;
        page-break-after: avoid !important;
    }

    /* scale down content to fit if needed */
    .cert-content {
        position: absolute !important;
        top: 1in !important;
        left: 1in !important;
        right: 1in !important;
        bottom: 1.1in !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        overflow: visible !important;
        transform-origin: top center !important;
    }

    .watermark {
        position: absolute !important;
        inset: 0 !important;
        width: 120% !important;
        height: 70% !important;
        background-size: 70% 70% !important;
        background-repeat: no-repeat !important;
        background-position: center !important;
        opacity: 0.15 !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
    }

    .cert-header {
        display: grid !important;
        grid-template-columns: 90px 1fr 90px !important;
        align-items: center !important;
        width: 100% !important;
    }

    .cert-logo-left {
        width: 75px !important;
        justify-self: start !important;
    }

    .cert-logo-right {
        width: 75px !important;
        justify-self: end !important;
    }

    .cert-header-text {
        text-align: center !important;
        font-family: 'Bookman Old Style' !important;
        font-size: 12pt !important;
    }

    .cert-title-text {
        font-size: 26pt !important;
        letter-spacing: 2px !important;
        padding: 10% 0 !important;
    }

    .cert-body {
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        justify-content: flex-start !important;
        width: 100% !important;
        overflow: hidden !important;    /* ← stops body from pushing past page */
    }

    .cert-name {
        font-weight: bold !important;
        font-size: 22pt !important;
    }

    .cert-para1,
    .cert-para2 {
        font-size: 12pt !important;
        text-align: justify !important;
        line-height: 1.2 !important;
    }

    .cert-para2 {
        text-indent: 50px !important;
    }

    .cert-issue {
        font-size: 12pt !important;
        text-indent: 50px !important;
    }

    .cert-signature {
        width: 100% !important;
        display: flex !important;
        justify-content: flex-end !important;
        margin-top: 40px !important;
    }

    .cert-footer {
        width: 100% !important;
        margin-top: 10px !important;
    }

    .cert-stamp-box {
      border: 1.5px solid #000 !important;
        padding: 8px 12px !important;
        width: 180px !important;
        font-size: 8pt !important;
        line-height: 1.55 !important;
        background: rgba(255,255,255,0.80) !important;
        margin: 0 !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
    }
        
    nav, footer, .certificate-controls {
        display: none !important;
    }
}
`;
        document.head.appendChild(style);
        window.print();
        document.head.removeChild(style);
    };
    const fullName = `${data.title} ${data.firstName} ${data.middleInitial} ${data.lastName}`;

    return (
        <>
            {/* Controls */}
            <div className="certificate-controls">
                <button className="btn btn-edit" onClick={() => setShowModal(true)}>
                    <i className="fas fa-edit"></i> Edit
                </button>
                <button className="btn btn-print" onClick={printCertificate}>
                    <i className="fas fa-print"></i> Print
                </button>
                <button className="btn btn-reset" onClick={resetToDefault}>
                    <i className="fas fa-undo"></i> Reset
                </button>
            </div>

            {/* Certificate Preview */}
            <div id="CertificatePreview" className="cert-wrapper">
                <div className="certificate">
                    <div className="watermark"></div>
                    <div className="cert-content">
                        <div className="cert-header">
                            <img src="/IMAGE/pit_logo.jpg" className="logo-left" alt="PIT Logo" />
                            <div className="cert-header-text">
                                <p className="cert-republic">Republic of the Philippines</p>
                                <p className="cert-institute">PALOMPON INSTITUTE OF TECHNOLOGY</p>
                                <p className="cert-location">Palompon, Leyte</p>
                                <p className="cert-college">COLLEGE OF GRADUATE STUDIES</p>
                            </div>
                            <img src="/IMAGE/nobg_cgs.png" className="logo-right" alt="CGS Logo" />
                        </div>

                        <div className="cert-head"><strong>CERTIFICATION</strong></div>

                        {/* BODY */}
                        <div className="cert-body">
                            <p className="cert-para1">
                                <strong>TO WHOM IT MAY CONCERN:</strong>
                            </p>

                            <p className="cert-para2">
                                THIS IS TO CERTIFY that,{" "}
                                <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                    {fullName}
                                </strong>{" "}
                                is a graduate student in this institution under the{" "}
                                <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                    {data.program}
                                </strong>{" "}
                                program since{" "}
                                <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                    {data.semesterStart}
                                </strong>
                                {data.untilPresent ? (
                                    <strong style={{ fontFamily: "BookmanOldStyleBold" }}> up to present</strong>
                                ) : data.semesterEnd ? (
                                    <>
                                        {" "}to{" "}
                                        <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                            {data.semesterEnd}
                                        </strong>
                                    </>
                                ) : null}.
                            </p>

                            <p className="cert-para2">
                                This is to certify further, that{" "}

                                {data.title === "Mr." ? "he" : "she"}
                                {" "}
                                has obtained{" "}
                                <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                    {data.units} units
                                </strong>{" "}
                                of the said program/degree.
                            </p>

                            <p className="cert-para2">
                                This certification is issued to{" "}
                                <strong style={{ fontFamily: "BookmanOldStyleBold" }}>
                                    {data.title} {data.lastName}
                                </strong>{" "}
                                for whatever legal purpose it may serve{" "}
                                {data.title === "Mr." ? "him" : "her"} best.
                            </p>
                            <p className="cert-issue">
                                Issued this{" "}
                               <strong style={{ fontFamily: "Bookman Old Style" }}>
                                    {formattedDate.day}
                                    <sup>{formattedDate.suffix}</sup>
                                    {" "}day of {formattedDate.month}, {formattedDate.year}
                                </strong>{" "}
                                at the Palompon Institute of Technology, Palompon, Leyte.
                            </p>
                           
                        </div>

                        {/* SIGNATURE */}
                        <div className="cert-signature">
                            <div className="sig-block">
                                <p className="cert-sig-name">JENNIFER A. GORUMBA, EdD</p>
                                <p className="cert-sig-title">Dean, CGS</p>
                            </div>
                        </div>

                        {/* FOOTER */}
                        <div className="cert-footer">
                            <p className="cert-not-valid">NOT VALID WITHOUT SEAL</p>
                            <div className="cert-stamp-box">
                                <p>DOC STAMP PAID ₱ 30.00</p>
                                <p>OR NO. _______________</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* EDIT MODAL */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2><i className="fas fa-edit"></i> Edit Certificate Information</h2>
                            <span className="modal-close" onClick={() => setShowModal(false)}>&times;</span>
                        </div>

                        <div className="modal-body">
                            <form onSubmit={handleSubmit} className="modal-form">

                                {/* FULL NAME */}
                                <div className="form-section">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="title">
                                                <i className="fas fa-venus-mars"></i> Title
                                            </label>
                                            <select
                                                id="title"
                                                name="title"
                                                value={data.title}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="Ms.">Ms.</option>
                                                <option value="Mr.">Mr.</option>
                                            </select>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="firstName">
                                                <i className="fas fa-user"></i> First Name
                                            </label>
                                            <input
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                value={data.firstName}
                                                onChange={handleChange}
                                                placeholder="Ana Marie"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="middleInitial">
                                                <i className="fas fa-user"></i> Middle Initial
                                            </label>
                                            <input
                                                type="text"
                                                id="middleInitial"
                                                name="middleInitial"
                                                value={data.middleInitial}
                                                onChange={handleChange}
                                                placeholder="M."
                                                maxLength={2}
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="lastName">
                                                <i className="fas fa-user"></i> Last Name
                                            </label>
                                            <input
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                value={data.lastName}
                                                onChange={handleChange}
                                                placeholder="Ardeño"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* PROGRAM */}
                                <div className="form-section">
                                    <div className="form-group">
                                        <label htmlFor="program">
                                            <i className="fas fa-book"></i> Program / Degree
                                        </label>
                                        <div className="program-input-group">
                                            <select
                                                id="program"
                                                name="program"
                                                value={data.program}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select a program...</option>
                                                <option value="Master of Arts in Education major in English">Master of Arts in Education major in English</option>
                                                <option value="Master of Arts in Education major in Mathematics">Master of Arts in Education major in Mathematics</option>
                                                <option value="Master of Arts in Education major in Filipino">Master of Arts in Education major in Filipino</option>
                                                <option value="Master of Arts in Education major in Social Studies">Master of Arts in Education major in Social Studies</option>
                                                <option value="Master in Public Administration">Master in Public Administration</option>
                                                <option value="Master of Business Administration">Master of Business Administration</option>
                                                {customPrograms.map((p, i) => (
                                                    <option key={i} value={p}>{p}</option>
                                                ))}
                                            </select>
                                            <button
                                                type="button"
                                                className="btn-add-program"
                                                onClick={() => setShowAddProgramModal(true)}
                                            >
                                                <i className="fas fa-plus"></i> Add
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* ACADEMIC DETAILS */}
                                <div className="form-section">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="semesterStart">
                                                <i className="fas fa-calendar"></i> Start Semester & School Year
                                            </label>
                                            <input
                                                type="text"
                                                id="semesterStart"
                                                name="semesterStart"
                                                value={data.semesterStart}
                                                onChange={handleChange}
                                                placeholder="1st Semester, S.Y. 2025–2026"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="semesterEnd">
                                                <i className="fas fa-calendar"></i> End Semester & School Year
                                            </label>
                                            <input
                                                type="text"
                                                id="semesterEnd"
                                                name="semesterEnd"
                                                value={data.semesterEnd}
                                                onChange={handleChange}
                                                placeholder="Summer, S.Y. 2026-2027"
                                                disabled={data.untilPresent}
                                            />
                                            <div className="checkbox-group">
                                                <input
                                                    type="checkbox"
                                                    id="untilPresent"
                                                    name="untilPresent"
                                                    checked={data.untilPresent}
                                                    onChange={handleChange}
                                                />
                                                <label htmlFor="untilPresent">Until at present</label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-row">
                                        <div className="form-group">
                                            <label htmlFor="units">
                                                <i className="fas fa-graduation-cap"></i> Units Completed
                                            </label>
                                            <input
                                                type="text"
                                                id="units"
                                                name="units"
                                                value={data.units}
                                                onChange={handleChange}
                                                placeholder="6"
                                                required
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="issueDate">
                                                <i className="fas fa-calendar-alt"></i> Issue Date
                                            </label>
                                            <input
                                                type="date"
                                                id="issueDate"
                                                name="issueDate"
                                                value={data.issueDate}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* FOOTER BUTTONS */}
                                <div className="modal-footer">
                                    <button
                                        type="button"
                                        className="btn btn-secondary"
                                        onClick={() => setShowModal(false)}
                                    >
                                        Cancel
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        <i className="fas fa-save"></i> Update Certificate
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* ADD PROGRAM MODAL */}
            {showAddProgramModal && (
                <div className="modal-overlay" onClick={() => setShowAddProgramModal(false)}>
                    <div className="modal-content modal-sm" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h2><i className="fas fa-plus"></i> Add New Program</h2>
                            <span className="modal-close" onClick={() => setShowAddProgramModal(false)}>&times;</span>
                        </div>
                        <div className="modal-body">
                            <div className="form-group">
                                <label htmlFor="newProgram">
                                    <i className="fas fa-book"></i> Program Name
                                </label>
                                <input
                                    type="text"
                                    id="newProgram"
                                    value={newProgram}
                                    onChange={(e) => setNewProgram(e.target.value)}
                                    placeholder="e.g. Master of Science in Information Technology"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowAddProgramModal(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={handleAddProgram}
                            >
                                <i className="fas fa-plus"></i> Add Program
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Certificate;