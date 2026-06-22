package com.OPD.serviceImpl;

import java.io.ByteArrayOutputStream;
import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;

import com.OPD.entities.Bill;
import com.OPD.repository.*;
import com.OPD.services.BillPdfService;

import org.openpdf.text.*;
import org.openpdf.text.pdf.PdfPCell;
import org.openpdf.text.pdf.PdfPTable;
import org.openpdf.text.pdf.PdfWriter;

@Service
public class BillPdfServiceImpl implements BillPdfService {

private final BillRepository billRepository;

public BillPdfServiceImpl(BillRepository billRepository) {
    this.billRepository = billRepository;
}

@Override
public byte[] generateBillPdf(Integer billId) {

    Bill bill = billRepository.findById(billId)
            .orElseThrow(() -> new RuntimeException("Bill not found"));

    try {
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream();

        Document document = new Document(PageSize.A4, 36, 36, 36, 36);

        PdfWriter.getInstance(document, outputStream);

        document.open();

        Font hospitalFont = FontFactory.getFont(
                FontFactory.HELVETICA_BOLD,
                20
        );

        Font headingFont = FontFactory.getFont(
                FontFactory.HELVETICA_BOLD,
                12
        );

        Font normalFont = FontFactory.getFont(
                FontFactory.HELVETICA,
                10
        );

        Paragraph hospitalName = new Paragraph(
                "CITY CARE HOSPITAL",
                hospitalFont
        );

        hospitalName.setAlignment(Element.ALIGN_CENTER);
        document.add(hospitalName);

        Paragraph subtitle = new Paragraph(
                "OPD Management Portal",
                normalFont
        );

        subtitle.setAlignment(Element.ALIGN_CENTER);
        document.add(subtitle);

        Paragraph receiptTitle = new Paragraph(
                "PATIENT CONSULTATION RECEIPT",
                headingFont
        );

        receiptTitle.setAlignment(Element.ALIGN_CENTER);
        receiptTitle.setSpacingBefore(10);
        receiptTitle.setSpacingAfter(20);

        document.add(receiptTitle);

        DateTimeFormatter formatter =
                DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

        PdfPTable billInfoTable = new PdfPTable(2);
        billInfoTable.setWidthPercentage(100);
        billInfoTable.setSpacingAfter(15);

        addLabelValueRow(
                billInfoTable,
                "Bill ID",
                "#" + bill.getId(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                billInfoTable,
                "Visit ID",
                "#" + bill.getVisit().getId(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                billInfoTable,
                "Bill Date",
                bill.getCreatedAt().format(formatter),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                billInfoTable,
                "Payment Status",
                bill.getPaymentStatus(),
                headingFont,
                normalFont
        );

        document.add(billInfoTable);

        PdfPTable patientTable = new PdfPTable(2);
        patientTable.setWidthPercentage(100);
        patientTable.setSpacingAfter(15);

        PdfPCell patientHeading = new PdfPCell(
                new Phrase("Patient Details", headingFont)
        );

        patientHeading.setColspan(2);
        patientTable.addCell(patientHeading);

        addLabelValueRow(
                patientTable,
                "Patient Name",
                bill.getVisit().getPatient().getPatientName(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                patientTable,
                "Mobile Number",
                bill.getVisit().getPatient().getMobileNo(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                patientTable,
                "Age",
                String.valueOf(bill.getVisit().getPatient().getAge()),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                patientTable,
                "Gender",
                String.valueOf(bill.getVisit().getPatient().getGender()),
                headingFont,
                normalFont
        );

        document.add(patientTable);

        PdfPTable visitTable = new PdfPTable(2);
        visitTable.setWidthPercentage(100);
        visitTable.setSpacingAfter(20);

        PdfPCell visitHeading = new PdfPCell(
                new Phrase("Visit Details", headingFont)
        );

        visitHeading.setColspan(2);
        visitTable.addCell(visitHeading);

        addLabelValueRow(
                visitTable,
                "Doctor Name",
                bill.getVisit().getDoctor().getName(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                visitTable,
                "Specialization",
                bill.getVisit().getDoctor().getSpecialization(),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                visitTable,
                "Visit Date",
                String.valueOf(bill.getVisit().getVisitDate()),
                headingFont,
                normalFont
        );

        addLabelValueRow(
                visitTable,
                "Payment Mode",
                bill.getPaymentMode(),
                headingFont,
                normalFont
        );

        document.add(visitTable);

        PdfPTable amountTable = new PdfPTable(2);
        amountTable.setWidthPercentage(100);
        amountTable.setWidths(new float[]{70, 30});

        PdfPCell itemHeader = new PdfPCell(
                new Phrase("Particular", headingFont)
        );

        PdfPCell amountHeader = new PdfPCell(
                new Phrase("Amount", headingFont)
        );

        amountHeader.setHorizontalAlignment(Element.ALIGN_RIGHT);

        amountTable.addCell(itemHeader);
        amountTable.addCell(amountHeader);

        addAmountRow(
                amountTable,
                "Consultation Fee",
                bill.getConsultationFee(),
                normalFont
        );

        addAmountRow(
                amountTable,
                "Concession",
                bill.getConcession(),
                normalFont
        );

        addAmountRow(
                amountTable,
                "Total Amount",
                bill.getTotalAmount(),
                headingFont
        );

        addAmountRow(
                amountTable,
                "Paid Amount",
                bill.getPaidAmount(),
                normalFont
        );

        addAmountRow(
                amountTable,
                "Pending Amount",
                bill.getPendingAmount(),
                headingFont
        );

        document.add(amountTable);

        Paragraph footer = new Paragraph(
                "\nThis is a computer-generated bill and does not require a signature.",
                normalFont
        );

        footer.setAlignment(Element.ALIGN_CENTER);
        document.add(footer);

        document.close();

        return outputStream.toByteArray();

    } catch (Exception exception) {
        throw new RuntimeException(
                "Failed to generate bill PDF",
                exception
        );
    }
}

private void addLabelValueRow(
        PdfPTable table,
        String label,
        String value,
        Font labelFont,
        Font valueFont
) {
    table.addCell(new PdfPCell(new Phrase(label, labelFont)));
    table.addCell(new PdfPCell(new Phrase(value != null ? value : "-", valueFont)));
}

private void addAmountRow(
        PdfPTable table,
        String label,
        BigDecimal amount,
        Font font
) {
    table.addCell(new PdfPCell(new Phrase(label, font)));

    PdfPCell amountCell = new PdfPCell(
            new Phrase("Rs. " + amount.setScale(2), font)
    );

    amountCell.setHorizontalAlignment(Element.ALIGN_RIGHT);

    table.addCell(amountCell);
}

}
