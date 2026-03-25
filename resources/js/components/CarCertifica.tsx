import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CarCertifica.css";

interface CertificateData {
    firstName: string;
    middleInitial: string;
    lastName: string;
    program: string;
    examDate: string;
    issueDate: string;
}

const defaultCarCert: CertificateData = {
    firstName: "JIAMIE",
    middleInitial: "B.",
    lastName: "COLON",
    program: "Master of Arts in Education major in Science",
    examDate: "April 2025",
    issueDate: "", // will be auto-generated
};

const CarCertificate: React.FC = () => {
    const [data, setData] = useState<CertificateData>(defaultCarCert);
    const [showModal, setShowModal] = useState(false);

    // Auto-generate issue date on load
    useEffect(() => {
        setData((prev) => ({ ...prev, issueDate: getOrdinalDate() }));
        fetchData();
    }, []);

    // Fetch data from API
    const fetchData = async () => {
        try {
            const res = await axios.get("/api/car-certificate");
            if (res.data) setData(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    // Handle form changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
    };

    // Save changes to API
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post("/api/car-certificate", data);
            setShowModal(false);
        } catch (err) {
            console.error(err);
        }
    };

    // Reset certificate to default
    const resetToDefault = () => setData({ ...defaultCarCert, issueDate: getOrdinalDate() });

    // Generate ordinal date
    const getOrdinalDate = () => {
        const now = new Date();
        const day = now.getDate();
        const month = now.toLocaleString("en-US", { month: "long" });
        const year = now.getFullYear();

        const suffix = (d: number) => {
            if (d >= 11 && d <= 13) return "th";
            switch (d % 10) {
                case 1: return "st";
                case 2: return "nd";
                case 3: return "rd";
                default: return "th";
            }
        };

        return `${day}<sup>${suffix(day)}</sup> day of ${month}, ${year}`;
    }
    document.addEventListener('DOMContentLoaded', function () {
        const dateEl = document.getElementById('autoIssueDate');
        if (dateEl) dateEl.innerHTML = getOrdinalDate();
    });

    // Print certificate
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
        width: 100% !important;
        height: 100% !important;
        overflow: hidden !important;
        margin: 0 !important;
        padding: 0 !important;
    }

    body * { visibility: hidden !important; }

    #carCertificatePreview,
    #carCertificatePreview * { visibility: visible !important; }

    #carCertificatePreview {
        position: fixed !important;
        inset: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        margin: 0 !important;
        padding: 0 !important;
        box-shadow: none !important;
        z-index: 99999 !important;
        overflow: hidden !important;
        page-break-after: avoid !important;
        page-break-before: avoid !important;
        break-after: avoid !important;
        break-before: avoid !important;
    }

    .car-cert-wrapper {
        width: 100% !important;
        height: 100% !important;
        max-width: 100% !important;
        max-height: 100vh !important;
        margin: 0 !important;
        box-shadow: none !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
    }

    .car-certificate {
        width: 100vw !important;
        height: 100vh !important;
        aspect-ratio: unset !important;
        position: relative !important;
        font-family: 'Maiandra GD', Georgia, serif !important;
        overflow: hidden !important;
        page-break-inside: avoid !important;
        break-inside: avoid !important;
    }

    .car-content {
        position: absolute !important;
        top: 3% !important;
        left: 9% !important;
        right: 9% !important;
        bottom: 11% !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: space-between !important;
        overflow: hidden !important;
    }

    .car-body {
        flex: 1 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        padding-bottom: 2% !important;
        width: 100% !important;
        overflow: hidden !important;
    }

    .car-signature {
        flex-shrink: 0 !important;
        text-align: center !important;
        width: 100% !important;
        margin-bottom: 1% !important;
    }

    .car-footer {
        position: static !important;
        flex-shrink: 0 !important;
        width: 100% !important;
        padding-bottom: 0 !important;
        align-self: flex-start !important;
        margin-bottom: 0 !important;
    }

    .car-header-text,
    .car-republic,
    .car-institute,
    .car-location,
    .car-college,
    .car-title-text,
    .car-given-to,
    .car-para1,
    .car-para2,
    .car-issue,
    .car-sig-name,
    .car-sig-title,
    .car-not-valid,
    .car-stamp-box {
        font-family: 'Maiandra GD', Georgia, serif !important;
    }

    .car-name {
        font-family: 'Bookman Old Style', Georgia, serif !important;
        font-weight: bold !important;
    }

    .car-header-text,
    .car-republic,
    .car-institute,
    .car-location,
    .car-college,
    .car-given-to,
    .car-para1,
    .car-para2,
    .car-issue {
        font-size: 14pt !important;
        line-height: 1.5 !important;
    }

    .car-title-text {
        font-size: 22pt !important;
        letter-spacing: 2px !important;
    }

    .car-name {
        font-size: 26pt !important;
    }

    .car-sig-name,
    .car-sig-title {
        font-size: 16pt !important;
    }

    .car-not-valid {
        font-size: 9pt !important;
    }

    .car-stamp-box {
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

    .car-logo-left  { width: 2.86cm !important; height: 2.86cm !important; }
    .car-logo-right { width: 2.99cm !important; height: 2.99cm !important; }

    .car-bg-image {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
    }

    nav, footer, .certificate-controls,
    .section-description, h2,
    section > p {
        display: none !important;
    }
}
    `;
        document.head.appendChild(style);

        window.print();
        document.head.removeChild(style);
    };

    const fullName = `${data.firstName}${data.middleInitial ? " " + data.middleInitial : ""} ${data.lastName}`;

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
            <div id="carCertificatePreview" className="car-cert-wrapper">
                <div className="car-certificate">
                    <div className="car-bg-image"></div>
                    <div className="car-content">
                        {/* HEADER */}
                        <div className="car-header">
                            <img src="/IMAGE/pit_logo.jpg" className="car-logo-left" alt="PIT Logo" />
                            <div className="car-header-text">
                                <p className="car-republic">Republic of the Philippines</p>
                                <p className="car-institute">PALOMPON INSTITUTE OF TECHNOLOGY</p>
                                <p className="car-location">Palompon, Leyte</p>
                                <span className="car-college">COLLEGE OF GRADUATE STUDIES</span>
                            </div>
                            <img src="/IMAGE/nobg_cgs.png" className="car-logo-right" alt="CGS Logo" />
                        </div>

                        {/* TITLE */}
                        <div className="car-title-block">
                            <h1 className="car-title-text">CERTIFICATE</h1>
                            <p className="car-given-to">is given to</p>
                        </div>

                        {/* BODY */}
                        <div className="car-body">
                            <p className="car-name"><u dangerouslySetInnerHTML={{ __html: fullName }} /></p>
                            <p className="car-para1">
                                for having satisfactorily <strong>completed all the academic requirements</strong> of the degree,
                                <strong><u>{data.program}</u></strong>
                            </p>
                            <p className="car-para2">
                                This further certifies that he/she <strong>has taken and passed the Comprehensive Examination</strong> conducted last <strong><u>{data.examDate}</u></strong>.
                            </p>
                            <p className="car-issue" dangerouslySetInnerHTML={{ __html: `Issued this <strong>${data.issueDate}</strong>` }} />
                        </div>

                        {/* SIGNATURE */}
                        <div className="car-signature">
                            <p className="car-sig-name"><strong>JENNIFER A. GORUMBA, EdD</strong></p>
                            <p className="car-sig-title">Dean</p>
                        </div>

                        {/* FOOTER */}
                        <div className="car-footer">
                            <p className="car-not-valid">NOT VALID WITHOUT SEAL</p>
                            <div className="car-stamp-box">
                                <p>DOC STAMP PAID ₱ 30.00</p>
                                <p>OR NO. _______________</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="modal-overlay" onClick={() => setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2>Edit Certificate</h2>
                        <form onSubmit={handleSubmit} className="modal-form">
                            <input name="firstName" value={data.firstName} onChange={handleChange} placeholder="First Name" />
                            <input name="middleInitial" value={data.middleInitial} onChange={handleChange} placeholder="Middle Initial" />
                            <input name="lastName" value={data.lastName} onChange={handleChange} placeholder="Last Name" />
                            <input name="program" value={data.program} onChange={handleChange} placeholder="Program / Degree" />
                            <input name="examDate" value={data.examDate} onChange={handleChange} placeholder="Comprehensive Exam Date" />
                            <input name="issueDate" value={data.issueDate} onChange={handleChange} placeholder="Issue Date" />
                            <div className="modal-buttons">
                                <button type="submit" className="btn btn-save">Save</button>
                                <button type="button" className="btn btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default CarCertificate;