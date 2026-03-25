import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a high-fidelity "Obsidian Lab" branded PDF optimization report.
 */
export const exportRoadmapToPDF = (analysisResult, generatedRoadmap, userName = "Elite Pilot") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Colors (Obsidian Lab Palette)
  const mint = [16, 185, 129];      // #10B981
  const indigo = [99, 102, 241];    // #6366F1
  const dark = [15, 23, 42];        // #0F172A
  const white = [255, 255, 255];
  
  // 1. HEADER (Branding)
  // ... (Header logic)
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(...mint);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("SKILLGAP RADAR", 15, 20);
  
  doc.setTextColor(100, 100, 100);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  doc.text("OPERATIONAL ANALYSIS MATRIX // PROTOCOL 4.2.0", 15, 28);
  
  doc.setTextColor(150, 150, 150);
  doc.text(`PILOT: ${userName.toUpperCase()}`, pageWidth - 15, 20, { align: "right" });
  doc.text(`DATE: ${new Date().toLocaleDateString()}`, pageWidth - 15, 28, { align: "right" });

  // 2. SCORE & SUMMARY
  let yPos = 55;
  
  doc.setDrawColor(...mint);
  doc.setLineWidth(1);
  doc.circle(35, yPos + 10, 15, 'D');
  doc.setFontSize(18);
  doc.setTextColor(...mint);
  doc.text(`${analysisResult.score}%`, 35, yPos + 12, { align: "center" });
  doc.setFontSize(8);
  doc.text("SYNC SCORE", 35, yPos - 2, { align: "center" });
  
  doc.setFillColor(245, 245, 245);
  doc.roundedRect(60, yPos - 10, pageWidth - 75, 40, 3, 3, 'F');
  doc.setTextColor(50, 50, 50);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("RADAR AI INSIGHTS", 65, yPos - 2);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  const splitInsight = doc.splitTextToSize(analysisResult.summary, pageWidth - 85);
  doc.text(splitInsight, 65, yPos + 5);

  yPos += 50;

  // 3. SKILLS MATRIX
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.setTextColor(...dark);
  doc.text("TECHNICAL VECTOR ANALYSIS", 15, yPos);
  
  const skillsData = [
    ["MATCHED VECTORS", analysisResult.matched.join(", ") || "None"],
    ["CRITICAL GAPS", analysisResult.missing.join(", ") || "No gaps detected"]
  ];

  autoTable(doc, {
    startY: yPos + 5,
    head: [["Node Type", "Identified Parameters"]],
    body: skillsData,
    theme: 'grid',
    headStyles: { fillColor: indigo, textColor: white, fontStyle: 'bold' },
    styles: { fontSize: 9, cellPadding: 5 },
    columnStyles: { 0: { fontStyle: 'bold', width: 50 } }
  });

  yPos = doc.lastAutoTable.finalY + 20;

  // 4. OPTIMIZATION ROADMAP
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("OPTIMIZATION ROADMAP", 15, yPos);
  
  generatedRoadmap.prioritySections.forEach((section, index) => {
    yPos += 12;
    
    // Section Header
    doc.setFillColor(index === 0 ? mint[0] : indigo[0], index === 0 ? mint[1] : indigo[1], index === 0 ? mint[2] : indigo[2]);
    doc.rect(15, yPos - 5, pageWidth - 30, 8, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(9);
    doc.text(section.title.toUpperCase(), 20, yPos);
    
    yPos += 10;
    
    // Roadmap Items
    section.items.forEach(item => {
      // Logic for multi-line actions
      const splitAction = doc.splitTextToSize(item.action, pageWidth - 40);
      const itemHeight = (splitAction.length * 5) + 15;
      
      // Check for page break
      if (yPos + itemHeight > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setTextColor(...dark);
      doc.setFont("helvetica", "bold");
      doc.text(item.label || "Action Item", 20, yPos);
      
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(`IMPACT: ${item.impact || 'N/A'}`, pageWidth - 20, yPos, { align: "right" });
      
      yPos += 5;
      doc.setTextColor(80, 80, 80);
      doc.text(splitAction, 20, yPos);
      
      yPos += (splitAction.length * 5) + 8;
      doc.setDrawColor(230, 230, 230);
      doc.line(15, yPos - 2, pageWidth - 15, yPos - 2);
      yPos += 5;
    });
  });

  // 5. FOOTER
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth / 2, 285, { align: "center" });
    doc.text("CONFIDENTIAL // RADAR-X SECURITY PROTOCOL // SKILLGAP RADAR", 15, 285);
  }

  // Save the PDF
  doc.save(`Radar_Optimization_Map_${analysisResult.jdMeta?.role || 'Report'}.pdf`);
};
