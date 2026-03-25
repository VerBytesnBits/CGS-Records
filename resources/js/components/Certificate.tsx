import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Certificate.css";

interface CertificateData {
    title: string;
    firstName: string;
    middleInitial: string;
    lastName: string;
    program: string;
    major: string;
    semester: string;
    schoolYear: string;
    units: string;
    issueDate: string;
}

const getOrdinalDate = () => {
    const date = new Date();
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

    return `${day}${suffix} day of ${month}, ${year}`;
};

const defaultData: CertificateData = {
    title: "Ms.",
    firstName: "Ana Marie",
    middleInitial: "M.",
    lastName: "Ardeño",
    program: "Master of Arts in Education",
    major: "English",
    semester: "1st Semester",
    schoolYear: "S.Y. 2025-2026",
    units: "6",
    issueDate: getOrdinalDate(),
};

const Certificate: React.FC = () => {
    const [data, setData] = useState<CertificateData>(defaultData);
    const [showModal, setShowModal] = useState(false);

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
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
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

    const resetToDefault = () => setData(defaultData);

    const printCertificate = () => {
        const target = document.getElementById("carCertificatePreview");
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
        bottom: 1in !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        overflow: hidden !important;
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
        opacity: 0.08 !important;
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
        text-indent: 40px !important;
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
        width: 160px !important;
        font-size: 8pt !important;
        background: rgba(255,255,255,0.80) !important;
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
                    Edit
                </button>
                <button className="btn btn-print" onClick={printCertificate}>
                    Print
                </button>
                <button className="btn btn-reset" onClick={resetToDefault}>
                    Reset
                </button>
            </div>

            {/* Certificate Preview */}
            <div id="CertificatePreview" className="cert-wrapper">
                <div className="certificate">
                    <div className="watermark"></div>
                    <div className="cert-content">
                        <div className="cert-header">
                            <img src="/IMAGE/pit_logo.jpg" className="logo-left" />

                            <div className="cert-header-text">
                                <p className="cert-republic">Republic of the Philippines</p>
                                <p className="cert-institute">PALOMPON INSTITUTE OF TECHNOLOGY</p>
                                <p className="cert-location">Palompon, Leyte</p>
                                <p className="cert-college">COLLEGE OF GRADUATE STUDIES</p>
                            </div>

                            <img src="/IMAGE/nobg_cgs.png" className="logo-right" />
                        </div>
                        <div className="cert-head"><strong>CERTIFICATION</strong></div>
                        {/* BODY */}
                        <div className="cert-body">
                            <p className="cert-para1">
                                <strong>TO WHOM IT MAY CONCERN:</strong>
                            </p>

                            <p className="cert-para2">
                                THIS IS TO CERTIFY that, <strong>{fullName}</strong> is a
                                graduate student in this institution under the{" "}
                                <strong>{data.program}</strong> major in{" "}
                                <strong>{data.major}</strong> program since{" "}
                                <strong>
                                    {data.semester}, {data.schoolYear}
                                </strong>.
                            </p>

                            <p className="cert-para2">
                                This is to certify further, that she has obtained{" "}
                                <strong>{data.units} units</strong> of the said program/degree.
                            </p>

                            <p className="cert-para2">
                                This certification is issued to{" "}
                                <strong>
                                    {data.title} {data.lastName}
                                </strong>{" "}
                                for whatever legal purpose it may serve her best.
                            </p>

                            <p className="cert-issue">
                                Issued this <strong>{data.issueDate}</strong> at the Palompon
                                Institute of Technology, Palompon, Leyte.
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

            {/* MODAL */}
            {showModal && (
                <div
                    className="modal-overlay"
                    onClick={() => setShowModal(false)}
                >
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2>Edit Certificate</h2>

                        <form onSubmit={handleSubmit} className="modal-form">
                            <input
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                placeholder="First Name"
                            />
                            <input
                                name="middleInitial"
                                value={data.middleInitial}
                                onChange={handleChange}
                                placeholder="Middle Initial"
                            />
                            <input
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                placeholder="Last Name"
                            />
                            <input
                                name="program"
                                value={data.program}
                                onChange={handleChange}
                                placeholder="Program"
                            />
                            <input
                                name="major"
                                value={data.major}
                                onChange={handleChange}
                                placeholder="Major"
                            />
                            <input
                                name="semester"
                                value={data.semester}
                                onChange={handleChange}
                                placeholder="Semester"
                            />
                            <input
                                name="schoolYear"
                                value={data.schoolYear}
                                onChange={handleChange}
                                placeholder="School Year"
                            />
                            <input
                                name="units"
                                value={data.units}
                                onChange={handleChange}
                                placeholder="Units"
                            />
                            <input
                                name="issueDate"
                                value={data.issueDate}
                                onChange={handleChange}
                                placeholder="Issue Date"
                            />

                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-save">
                                    Save
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-cancel"
                                    onClick={() => setShowModal(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default Certificate;