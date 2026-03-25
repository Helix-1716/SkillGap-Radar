import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

/**
 * Generates a high-fidelity "Obsidian Lab" branded PDF optimization report.
 */
export const exportRoadmapToPDF = (analysisResult, generatedRoadmap, userName = "Elite Pilot") => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  
  // Colors (Obsidian Lab Palette)
  const mint = [16, 185, 129];      // #10B981
  const indigo = [99, 102, 241];    // #6366F1
  const dark = [15, 23, 42];        // #0F172A
  const slate = [51, 65, 85];       // #334155
  const white = [255, 255, 255];
  
  // --- HELPER: DRAW RADAR OVERLAY ---
  const drawRadarOverlay = (cx, cy, radius, opacity = 0.05) => {
    doc.setDrawColor(mint[0], mint[1], mint[2]);
    doc.setGState(new doc.GState({ opacity }));
    for (let r = 5; r <= radius; r += 10) {
      doc.circle(cx, cy, r, 'D');
    }
    // Crosshairs
    doc.line(cx - radius, cy, cx + radius, cy);
    doc.line(cx, cy - radius, cx, cy + radius);
    doc.setGState(new doc.GState({ opacity: 1 }));
  };

// --- HELPER: DRAW WATERMARK ---
  const drawWatermark = (text = "SKILLGAP RADAR // OFFICIAL REPORT") => {
    doc.saveGraphicsState();
    doc.setGState(new doc.GState({ opacity: 0.05 }));
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(40);
    doc.setFont("helvetica", "bold");
    // Center it better by accounting for rotation
    doc.text(text, pageWidth / 2, pageHeight / 2, {
      align: "center",
      angle: 45
    });
    doc.restoreGraphicsState();
  };

  // --- 1. HEADER (Branding) ---
  doc.setFillColor(...dark);
  doc.rect(0, 0, pageWidth, 45, 'F');
  
  // Decorative Radar in Header (Moved further right)
  drawRadarOverlay(pageWidth - 30, 22, 12, 0.15);

  doc.setTextColor(...mint);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(24);
  doc.text("SKILLGAP RADAR", 15, 22);
  
  doc.setTextColor(110, 110, 130);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text("OPERATIONAL ANALYSIS MATRIX // PROTOCOL 5.2.1 // WATERMARKED", 15, 32);
  
  doc.setTextColor(200, 200, 200);
  doc.setFontSize(8);
  doc.text(`PILOT: ${userName.toUpperCase()}`, pageWidth - 55, 22, { align: "right" });
  doc.text(`STAMP: ${new Date().toLocaleString()}`, pageWidth - 55, 30, { align: "right" });

  // Add Watermark to first page
  drawWatermark();

  // --- 2. VECTOR SYNC SCORE (Visual) ---
  let yPos = 65;
  
  // Branding Circle
  doc.setDrawColor(...mint);
  doc.setLineWidth(1.5);
  doc.circle(35, yPos + 15, 18, 'D');
  doc.setFontSize(22);
  doc.setTextColor(...mint);
  doc.text(`${analysisResult.score}%`, 35, yPos + 18, { align: "center" });
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  doc.text("SYNC SCORE", 35, yPos - 5, { align: "center" }); // Moved up
  
  // Progress Bar for Score
  doc.setFillColor(240, 240, 240);
  doc.roundedRect(65, yPos + 22, pageWidth - 80, 4, 2, 2, 'F');
  doc.setFillColor(...mint);
  doc.roundedRect(65, yPos + 22, (pageWidth - 80) * (analysisResult.score / 100), 4, 2, 2, 'F');

  // AI Summary Box (Improved Contrast: Dark Box with Light Text)
  doc.setFillColor(...dark);
  doc.roundedRect(65, yPos - 12, pageWidth - 80, 32, 4, 4, 'F');
  doc.setTextColor(...mint);
  doc.setFontSize(10);
  doc.setFont("helvetica", "bold");
  doc.text("RADAR AI TRAJECTORY INSIGHT", 70, yPos - 4);
  doc.setFont("helvetica", "italic");
  doc.setFontSize(9);
  doc.setTextColor(200, 200, 210);
  const splitInsight = doc.splitTextToSize(analysisResult.summary, pageWidth - 95);
  doc.text(splitInsight, 70, yPos + 5);

  yPos += 55;

  // --- 3. ANALYSIS MATRIX (Tables) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...dark);
  doc.text("TECHNICAL VECTOR ANALYSIS", 15, yPos);
  
  const skillsData = [
    ["MATCHED VECTORS", analysisResult.matched.join(", ") || "None"],
    ["CRITICAL GAPS", analysisResult.missing.join(", ") || "No gaps detected"],
    ["MARKET SYNC", analysisResult.marketInsights || "Active Synchronization"]
  ];

  autoTable(doc, {
    startY: yPos + 6,
    head: [["Node Descriptor", "Vector Parameters"]],
    body: skillsData,
    theme: 'grid',
    headStyles: { fillColor: indigo, textColor: white, fontStyle: 'bold', fontSize: 10 },
    styles: { fontSize: 9, cellPadding: 6, textColor: 50 },
    columnStyles: { 0: { fontStyle: 'bold', fillColor: [250, 250, 255], width: 50 } }
  });

  yPos = doc.lastAutoTable.finalY + 15;

  // --- 4. PORTFOLIO AUDIT (Visual Block) ---
  if (analysisResult.portfolioFeedback) {
    doc.setFillColor(...dark);
    doc.roundedRect(15, yPos, pageWidth - 30, 25, 3, 3, 'F');
    doc.setTextColor(...mint);
    doc.setFontSize(9);
    doc.setFont("helvetica", "bold");
    doc.text("PORTFOLIO AUDIT STATUS: IDENTIFIED", 22, yPos + 10);
    doc.setTextColor(200, 200, 200);
    doc.setFont("helvetica", "italic");
    const portFeedback = doc.splitTextToSize(analysisResult.portfolioFeedback, pageWidth - 45);
    doc.text(portFeedback, 22, yPos + 17);
    yPos += 35;
  }

  // --- 5. OPTIMIZATION ROADMAP (Visual Cards) ---
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.setTextColor(...dark);
  doc.text("DEPLOYMENT ROADMAP", 15, yPos);
  
  yPos += 8;

  generatedRoadmap.prioritySections.forEach((section, index) => {
    // Section Header with Gradient Look
    doc.setFillColor(index === 0 ? mint[0] : indigo[0], index === 0 ? mint[1] : indigo[1], index === 0 ? mint[2] : indigo[2]);
    doc.rect(15, yPos, pageWidth - 30, 10, 'F');
    doc.setTextColor(...white);
    doc.setFontSize(10);
    doc.text(section.title.toUpperCase(), 20, yPos + 7);
    
    yPos += 18;
    
    section.items.forEach(item => {
      const splitAction = doc.splitTextToSize(item.action, pageWidth - 45);
      const itemHeight = (splitAction.length * 5) + 20;
      
      if (yPos + itemHeight > 275) {
        doc.addPage();
        drawWatermark(); // Watermark on new page
        yPos = 20;
      }
      
      // Side indicator line
      doc.setDrawColor(index === 0 ? mint[0] : indigo[0], index === 0 ? mint[1] : indigo[1], index === 0 ? mint[2] : indigo[2]);
      doc.setLineWidth(1);
      doc.line(16, yPos - 5, 16, yPos + itemHeight - 10);

      doc.setTextColor(...dark);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(item.label || "Action Protocol", 22, yPos);
      
      doc.setFontSize(8);
      doc.setTextColor(...mint);
      doc.text(`IMPACT: ${item.impact || 'MAX'}`, pageWidth - 20, yPos, { align: "right" });
      
      yPos += 6;
      doc.setFont("helvetica", "normal");
      doc.setTextColor(70, 70, 80);
      doc.text(splitAction, 22, yPos);
      
      yPos += (splitAction.length * 5) + 12;
    });
  });

  // --- 6. GLOBAL FINISH (Footer + Watermark All) ---
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Watermark (Moved here to ensure it is on EVERY page)
    drawWatermark();

    // Visual Line at bottom
    doc.setDrawColor(240, 240, 240);
    doc.line(15, 278, pageWidth - 15, 278);

    doc.setFontSize(8);
    doc.setTextColor(180, 180, 180);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 15, 285, { align: "right" });
    doc.text("CONFIDENTIAL // RADAR-X SECURITY PROTOCOL // SKILLGAP RADAR SYSTEM", 15, 285);
  }

  // Save the PDF
  doc.save(`Radar_Trajectory_Report_${analysisResult.jdMeta?.role || 'Unit'}.pdf`);
};
