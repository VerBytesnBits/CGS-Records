import React from "react";

interface CertificateProps {
    name: string;
    program: string;
    startYear: string;
    endYear: string;
    units: string;
    issueDate: string;
}

export default function Certificate({
    name,
    program,
    startYear,
    endYear,
    units,
    issueDate,
}: CertificateProps) {
    return (
        <div className="certificate-wrapper">
            <div className="certificate">
                {/* Header */}
                <div className="header">
                    <p>Republic of the Philippines</p>
                    <h2>PALOMPON INSTITUTE OF TECHNOLOGY</h2>
                    <p>Palompon, Leyte</p>
                    <p className="college">COLLEGE OF GRADUATE STUDIES</p>
                </div>

                {/* Title */}
                <h1 className="title">CERTIFICATION</h1>

                {/* Body */}
                <div className="content">
                    <p><strong>TO WHOM IT MAY CONCERN:</strong></p>

                    <p>
                        THIS IS TO CERTIFY that <strong>{name}</strong> is a graduate
                        student in this institution under the <strong>{program}</strong>{" "}
                        program since <strong>{startYear}</strong> until{" "}
                        <strong>{endYear}</strong>.
                    </p>

                    <p>
                        This is to certify further, that she has obtained{" "}
                        <strong>{units} units</strong> of the said program/degree.
                    </p>

                    <p>
                        This certification is issued to <strong>{name}</strong> for
                        whatever legal purpose it may serve her best.
                    </p>

                    <p className="issue">
                        Issued this <strong>{issueDate}</strong> at the Palompon
                        Institute of Technology, Palompon, Leyte.
                    </p>
                </div>

                {/* Signature */}
                <div className="signature">
                    <p className="name">JENNIFER A. GORUMBA, EdD</p>
                    <p>Dean, CGS</p>
                </div>

                {/* Footer */}
                <div className="footer">
                    <p>NOT VALID WITHOUT SEAL</p>

                    <div className="doc-box">
                        <p>DOC STAMP PAID ₱30.00</p>
                        <p>OR NO. ____________</p>
                    </div>
                </div>
            </div>

            {/* Styles */}
            <style>{`
    .certificate-wrapper {
        background: #e5e5e5;
        padding: 20px;
        display: flex;
        justify-content: center;
    }

    /* ✅ LETTER SIZE */
    .certificate {
        width: 8.5in;
        height: 11in;
        background: white;
        padding: 1in;
        font-family: "Times New Roman", serif;
        position: relative;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        box-sizing: border-box;
        overflow: hidden;
    }

    .header {
        text-align: center;
        line-height: 1.3;
    }

    .header h2 {
        margin: 5px 0;
        font-size: 20px;
        font-weight: bold;
    }

    .college {
        margin-top: 10px;
        font-weight: bold;
    }

    .title {
        text-align: center;
        margin: 40px 0;
        font-size: 32px;
        letter-spacing: 2px;
    }

    .content {
        font-size: 14px;
        text-align: justify;
        line-height: 1.8;
    }

    .content p {
        margin-bottom: 18px;
    }

    .issue {
        margin-top: 25px;
    }

    .signature {
        position: absolute;
        right: 1in;
        bottom: 2in;
        text-align: center;
    }

    .signature .name {
        font-weight: bold;
        text-decoration: underline;
    }

    .footer {
        position: absolute;
        left: 1in;
        bottom: 1in;
        font-size: 10px;
    }

    .doc-box {
        margin-top: 10px;
        border: 1px solid black;
        padding: 10px;
        width: 200px;
    }

    /* ✅ PRINT PERFECT */
    @page {
        size: letter;
        margin: 0;
    }

    @media print {
        body {
            margin: 0;
        }

        .certificate-wrapper {
            background: white;
            padding: 0;
        }

        .certificate {
            box-shadow: none;
            margin: 0;
            width: 8.5in;
            height: 11in;
        }
    }
`}</style>
        </div>
    );
}