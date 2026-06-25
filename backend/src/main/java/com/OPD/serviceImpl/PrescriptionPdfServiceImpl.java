package com.OPD.serviceImpl;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.util.List;

import org.openpdf.text.*;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;
import org.springframework.stereotype.Service;

import com.OPD.entities.Prescription;
import com.OPD.entities.Visit;
import com.OPD.repository.PrescriptionRepository;
import com.OPD.repository.VisitRepository;
import com.OPD.services.PrescriptionPdfService;

@Service
public class PrescriptionPdfServiceImpl implements PrescriptionPdfService {

    private final VisitRepository visitRepository;
    private final PrescriptionRepository prescriptionRepository;

    public PrescriptionPdfServiceImpl(
            VisitRepository visitRepository,
            PrescriptionRepository prescriptionRepository) {
        this.visitRepository = visitRepository;
        this.prescriptionRepository = prescriptionRepository;
    }

    @Override
    public byte[] generatePrescriptionPdf(Integer visitId) {

        // 1. Fetch visit + all its prescriptions
        Visit visit = visitRepository.findById(visitId)
                .orElseThrow(() -> new RuntimeException("Visit not found"));

        List<Prescription> prescriptions =
                prescriptionRepository.findByVisit_Id(visitId);

        try {
            // 2. Set up document
            ByteArrayOutputStream out = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4, 40, 40, 40, 60);
            PdfWriter.getInstance(document, out);
            document.open();

            // 3. Fonts 
            Font hospitalFont  = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 20);
            Font subFont       = FontFactory.getFont(FontFactory.HELVETICA, 10);
            Font headingFont   = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 12);
            Font normalFont    = FontFactory.getFont(FontFactory.HELVETICA, 10);
            Font labelFont     = FontFactory.getFont(FontFactory.HELVETICA_BOLD, 10);

            // 4. Hospital header
            Paragraph hospital = new Paragraph("CITY CARE HOSPITAL", hospitalFont);
            hospital.setAlignment(Element.ALIGN_CENTER);
            document.add(hospital);

            Paragraph sub = new Paragraph("OPD Management Portal", subFont);
            sub.setAlignment(Element.ALIGN_CENTER);
            document.add(sub);

            Paragraph title = new Paragraph("MEDICAL PRESCRIPTION", headingFont);
            title.setAlignment(Element.ALIGN_CENTER);
            title.setSpacingBefore(8);
            title.setSpacingAfter(15);
            document.add(title);

            // 5. Patient + Doctor info table
            PdfPTable info = new PdfPTable(2);
            info.setWidthPercentage(100);
            info.setSpacingAfter(15);

            addRow(info, "Patient Name",
                    visit.getPatient().getPatientName(), labelFont, normalFont);
            addRow(info, "Age / Gender",
                    visit.getPatient().getAge() + " / " + visit.getPatient().getGender(),
                    labelFont, normalFont);
            addRow(info, "Mobile",
                    visit.getPatient().getMobileNo(), labelFont, normalFont);
            addRow(info, "Visit Date",
                    visit.getVisitDate().toString(), labelFont, normalFont);
            addRow(info, "Visit ID", "#" + visit.getId(), labelFont, normalFont);
            addRow(info, "Doctor",
                    "Dr. " + visit.getDoctor().getName()
                    + " (" + visit.getDoctor().getSpecialization() + ")",
                    labelFont, normalFont);

            document.add(info);

            // 6. Diagnosis
            if (visit.getDiagnosis() != null && !visit.getDiagnosis().isBlank()) {
                Paragraph dx = new Paragraph();
                dx.setSpacingAfter(10);
                dx.add(new Chunk("Diagnosis: ", labelFont));
                dx.add(new Chunk(visit.getDiagnosis(), normalFont));
                document.add(dx);
            }

            // 7. Rx heading
            Paragraph rx = new Paragraph("Rx", headingFont);
            rx.setSpacingAfter(8);
            document.add(rx);

            // 8. Medicine table
            PdfPTable table = new PdfPTable(new float[]{1, 4, 3, 2, 2});
            table.setWidthPercentage(100);

            addHeader(table, "#",         headingFont);
            addHeader(table, "Medicine",  headingFont);
            addHeader(table, "Dosage",    headingFont);
            addHeader(table, "Duration",  headingFont);
            addHeader(table, "Total Qty", headingFont);

            int i = 1;
            for (Prescription p : prescriptions) {
                table.addCell(new PdfPCell(
                        new Phrase(String.valueOf(i++), normalFont)));
                table.addCell(new PdfPCell(
                        new Phrase(p.getMedicine().getMedicineName(), normalFont)));
                table.addCell(new PdfPCell(
                        new Phrase(p.getDosage(), normalFont)));
                table.addCell(new PdfPCell(
                        new Phrase(p.getDurationDays() + " days", normalFont)));
                table.addCell(new PdfPCell(
                        new Phrase(String.valueOf(p.getTotalQuantity()), normalFont)));
            }
            document.add(table);

            // 9. Advice (from visit)
            if (visit.getAdvice() != null && !visit.getAdvice().isBlank()) {
                Paragraph adv = new Paragraph();
                adv.setSpacingBefore(15);
                adv.add(new Chunk("Advice: ", labelFont));
                adv.add(new Chunk(visit.getAdvice(), normalFont));
                document.add(adv);
            }

            // 10. Instructions (common to all medicines of this visit)
            if (!prescriptions.isEmpty()
                    && prescriptions.get(0).getInstructions() != null
                    && !prescriptions.get(0).getInstructions().isBlank()) {
                Paragraph ins = new Paragraph();
                ins.setSpacingBefore(8);
                ins.add(new Chunk("Instructions: ", labelFont));
                ins.add(new Chunk(
                        prescriptions.get(0).getInstructions(), normalFont));
                document.add(ins);
            }

            // 11. Follow-up
            if (visit.getFollowupDate() != null) {
                Paragraph fu = new Paragraph();
                fu.setSpacingBefore(8);
                fu.add(new Chunk("Follow-up Date: ", labelFont));
                fu.add(new Chunk(
                        visit.getFollowupDate().toString(), normalFont));
                document.add(fu);
            }

            // 12. SIGNATURE BLOCK 
            Paragraph spacer = new Paragraph("\n\n");
            document.add(spacer);

            PdfPTable sigTable = new PdfPTable(2);
            sigTable.setWidthPercentage(100);

            // Left side - empty
            PdfPCell leftCell = new PdfPCell();
            leftCell.setBorder(0);
            leftCell.addElement(new Phrase("Thank you for visiting.", subFont));
            sigTable.addCell(leftCell);

            // Right side - signature line
            PdfPCell rightCell = new PdfPCell();
            rightCell.setBorder(0);
            rightCell.setHorizontalAlignment(Element.ALIGN_RIGHT);

            Paragraph sigLine = new Paragraph(
                    "____________________________", normalFont);
            sigLine.setAlignment(Element.ALIGN_RIGHT);
            rightCell.addElement(sigLine);

            Paragraph sigLabel = new Paragraph("Signature", labelFont);
            sigLabel.setAlignment(Element.ALIGN_RIGHT);
            rightCell.addElement(sigLabel);

            Paragraph docName = new Paragraph(
                    "Dr. " + visit.getDoctor().getName(), labelFont);
            docName.setAlignment(Element.ALIGN_RIGHT);
            rightCell.addElement(docName);

            Paragraph spec = new Paragraph(
                    visit.getDoctor().getSpecialization(), subFont);
            spec.setAlignment(Element.ALIGN_RIGHT);
            rightCell.addElement(spec);

            sigTable.addCell(rightCell);
            document.add(sigTable);

            // 13. Footer
            Paragraph footer = new Paragraph(
                    "\nThis is a computer-generated prescription.",
                    subFont);
            footer.setAlignment(Element.ALIGN_CENTER);
            document.add(footer);

            document.close();
            return out.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate prescription PDF", e);
        }
    }

    private void addRow(PdfPTable t, String label, String value,
                        Font lf, Font vf) {
        t.addCell(new PdfPCell(new Phrase(label, lf)));
        t.addCell(new PdfPCell(new Phrase(value != null ? value : "-", vf)));
    }

    private void addHeader(PdfPTable t, String text, Font f) {
        PdfPCell c = new PdfPCell(new Phrase(text, f));
        c.setBackgroundColor(new Color(230, 230, 230));
        t.addCell(c);
    }
}
