const PDFDocument = require('pdfkit');
const fs = require('fs');

const getAuthenticityText = () => [
    'This document is generated automatically and verified for authenticity.',
    'Authorized by: Raghvendra Misra, Founder & CEO',
    `Generated on: ${new Date().toLocaleDateString()}`,
    'For internal use only. Do not share without proper authorization.'
];

const DOC_HEADER = {
    logo: './static/logo.png',
    tagline: 'Filog is a dynamic blogging platform designed to empower writers and readers alike. Our mission is to provide a space where users can create engaging articles, share their stories, and connect with a community of like-minded individuals.',
};

const generatePDF = (data, name = 'output.pdf', authenticityText = getAuthenticityText, docHeaders = DOC_HEADER, tableMeta,stream) => {
    const drawRow = (doc, rowData, startX, startY, rowHeight, columnWidths, isHeader) => {
        const baseFontSize = 12;
        const minFontSize = 8;
        const maxColumns = 6;
        const dynamicFontSize = columnWidths.length > maxColumns
            ? Math.max(baseFontSize - (columnWidths.length - maxColumns), minFontSize)
            : baseFontSize;

        doc.fontSize(dynamicFontSize).font(isHeader ? 'Helvetica-Bold' : 'Helvetica');

        let currentX = startX;
        rowData.forEach((cell, i) => {
            const safeCell = cell != null ? cell.toString() : '';
            doc.rect(currentX, startY, columnWidths[i], rowHeight).stroke();
            doc.text(safeCell, currentX + 5, startY + 5, { width: columnWidths[i] - 10, align: 'left' });
            currentX += columnWidths[i];
        });
    };

    const calculateRowHeight = (doc, rowData, columnWidths, initialRowHeight) => {
        return Math.max(initialRowHeight, ...rowData.map((cell, i) => doc.heightOfString(cell.toString(), { width: columnWidths[i] - 10 }) + 10));
    };

    const createPDFTable = (doc, data, headers, startX, startY, initialRowHeight, columnWidths) => {
        let currentY = startY;
        headers.unshift('#');
        drawRow(doc, headers, startX, currentY, initialRowHeight, columnWidths, true);
        currentY += initialRowHeight;

        data.forEach((row, index) => {
            const rowData = [index + 1, ...Object.values(row)];
            const rowHeight = calculateRowHeight(doc, rowData, columnWidths, initialRowHeight);

            if (currentY + rowHeight > doc.page.height - 80) {
                doc.addPage();
                currentY = 50;
                drawRow(doc, headers, startX, currentY, initialRowHeight, columnWidths, true);
                currentY += initialRowHeight;
            }

            drawRow(doc, rowData, startX, currentY, rowHeight, columnWidths, false);
            currentY += rowHeight;
        });
    };

    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ size: 'A4', layout: 'landscape' });
            const writeStream = stream || fs.createWriteStream(name);
            doc.pipe(writeStream);

            const logoPath = docHeaders.logo || './static/logo.png';
            const logoWidth = 120, logoHeight = 50, logoX = 50, logoY = 30;
            doc.image(logoPath, logoX, logoY, { fit: [logoWidth, logoHeight], align: 'left', valign: 'top' });

            const taglineX = logoX, taglineY = logoY + logoHeight + 4;
            doc.fontSize(12).font('Helvetica').fill('#313233').text(docHeaders.tagline, taglineX, taglineY);

            const headingY = doc.page.layout === 'landscape' ? taglineY + 50 : -46;
            doc.fontSize(20).font('Helvetica-Bold').fill('black').text(tableMeta.title, 50, headingY, { align: 'center', lineGap: 10, underline:true });

            const startY = headingY + 30;
            const headers = data[0] ? Object.keys(data[0]) : [];
            const pageWidth = doc.page.width - 100;
            let columnWidths = headers.length > 6
                ? Array(headers.length + 1).fill(pageWidth / (headers.length + 1))
                : Array(headers.length + 1).fill(100);

            const totalTableWidth = columnWidths.reduce((sum, width) => sum + width, 0);
            const startX = (doc.page.width - totalTableWidth) / 2;
            const initialRowHeight = 30;

            createPDFTable(doc, data, headers, startX, startY, initialRowHeight, columnWidths);

            const authenticityX = startX;
            const authenticityY = doc.page.layout === 'landscape' ? doc.page.height - 140 : doc.page.height - 100;
            authenticityText().forEach((line, index) => {
                doc.fontSize(10).font(line.includes("Authorized") ? 'Helvetica-Bold' : 'Helvetica').text(line, authenticityX, authenticityY + (13 * index));
            });

            doc.end();
            writeStream.on('finish', () => {
                console.log('PDF generation completed.');
                resolve('PDF generation completed.');
            });
        } catch (error) {
            reject(error);
        }
    });
};

module.exports = generatePDF;





