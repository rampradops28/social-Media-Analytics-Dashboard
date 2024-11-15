import React from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import '../css/Report.css';

const Report = () => {
  const downloadPDF = () => {
    const reportContent = document.getElementById('report-content');
    html2canvas(reportContent).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save('Report.pdf');
    });
  };

  return (
    <div>
      <header>
        <nav>
          <div className="logo">Social Media Analytics Dashboard</div>
          <div className="menu">
            <a href="/home">Home</a>
            <a href="/dashboard">Dashboard</a>
            <a href="/report">Reports</a>
            <a href="/profile">Profile</a>
            <a href="/logout">Logout</a>
          </div>
        </nav>
      </header>
      
      <main id="report-content">
        <section className="report-header">
          <h2>Generate Reports</h2>
          <p>Download in PDF or Excel format for detailed analysis</p>
        </section>

        <section className="report-options">
          <button onClick={downloadPDF}>Download PDF</button>
          <button>Download Excel</button>
        </section>

        <section className="sample-charts">
           
        </section>

        <section className="comparison-view">
          <h3>Comparison Overview</h3>
          <table>
            <thead>
              <tr>
                <th>Metric</th>
                <th>YouTube</th>
                <th>Instagram</th>
                <th>Growth (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Followers</td>
                <td>10,000</td>
                <td>15,000</td>
                <td>+50%</td>
              </tr>
              <tr>
                <td>Engagement Rate</td>
                <td>8.5%</td>
                <td>12.3%</td>
                <td>+3.8%</td>
              </tr>
              <tr>
                <td>Views (Monthly)</td>
                <td>200,000</td>
                <td>180,000</td>
                <td>-10%</td>
              </tr>
              <tr>
                <td>Posts (Monthly)</td>
                <td>20</td>
                <td>30</td>
                <td>+50%</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
      <footer>
                <p>&copy; 2024 Social Media Analytics Dashboard | Contact Us: support@example.com</p>
            </footer>
    </div>
  );
};

export default Report;
