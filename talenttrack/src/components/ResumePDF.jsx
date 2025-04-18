import React, { useRef } from "react";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import "../css/resume.css"; // Import the CSS file for styling
import { useSelector } from "react-redux";

const ResumePDF = () => {
    const { user } = useSelector((store) => store.auth);
    const resumeRef = useRef(); // Reference for capturing the resume section

    const downloadPDF = () => {
        const input = resumeRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('Resume.pdf'); // Download the PDF file
        });
    };

    return (
        <div className="resume-container">
            <div className="resume" ref={resumeRef}>
                <header className="resume-header">
                    <h1>{user?.fullname}</h1>
                    <p>{user?.email} | {user?.phonenumber}</p>
                </header>
                <div className="sectiondiv">
                    <section className="resume-section">
                        <h2>Bio</h2>
                        <p>{user?.profile?.bio}</p>
                    </section>
                    <section className="resume-section">
                        <h2>Skills</h2>
                        <ul>
                            {user?.profile?.skills?.map((skill, index) => (
                                <li key={index}>{skill}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="resume-section">
                        <h2>Experience</h2>
                        <ul>
                            {user?.profile?.experience?.map((exp, index) => (
                                <li key={index}>{exp}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="resume-section">
                        <h2>Education</h2>
                        <ul>
                            {user?.profile?.education?.map((edu, index) => (
                                <li key={index}>{edu}</li>
                            ))}
                        </ul>
                    </section>
                    <section className="resume-section">
                        <h2>Projects</h2>
                        <ul>
                            {user?.profile?.project?.map((proj, index) => (
                                <li key={index}>{proj}</li>
                            ))}
                        </ul>
                    </section>
                </div>
            </div>
            <button className="save-pdf-btn" onClick={downloadPDF}>Download as PDF</button>
        </div>
    );
}

export default ResumePDF