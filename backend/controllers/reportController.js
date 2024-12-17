const ActivityLogger = require('../models/ActivityLogger');
const PDFDocument = require('pdfkit');
const ActivityLog = require('../models/ActivityLogger');
const Product = require('../models/Product');
const StockIn = require('../models/StockIn');
const StockOut = require('../models/StockOut');
const Category = require('../models/Category');

// Helper function to format dates
const formatDate = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(date).toLocaleDateString(undefined, options);
};

// Helper function to draw a table row with borders
const drawRow = (doc, x, y, row, columnWidths) => {
    let currentX = x;
    row.forEach((cell, i) => {
        doc.rect(currentX, y, columnWidths[i], 20).stroke(); // Draw cell border
        doc.text(cell, currentX + 5, y + 5, { width: columnWidths[i] - 10 }); // Add text
        currentX += columnWidths[i];
    });
};

// Helper function to generate a styled PDF report
const generateStyledPDF = (res, title, columns, data) => {
    const doc = new PDFDocument({ margin: 30 });
    const pageHeight = doc.page.height;
    const pageWidth = doc.page.width;
    const columnWidths = columns.map(() => pageWidth / columns.length - 10);

    res.setHeader('Content-Type', 'application/pdf');
    doc.pipe(res);

    let y = 50;

    // Add title
    doc.fontSize(18).font('Helvetica-Bold').text(title, { align: 'center', underline: true }).moveDown(1);

    // Function to add a header with pagination
    const addHeaderAndFooter = (pageNumber) => {
        doc.fontSize(10).text(`Page ${pageNumber}`, pageWidth - 50, 20, { align: 'right' });
        doc.moveTo(30, 40).lineTo(pageWidth - 30, 40).stroke(); // Header line
    };

    let pageNumber = 1;
    addHeaderAndFooter(pageNumber);

    // Draw table header
    drawRow(doc, 30, y, columns, columnWidths);
    y += 20;

    // Draw table rows
    data.forEach((row, index) => {
        if (y > pageHeight - 70) {
            doc.addPage();
            pageNumber++;
            addHeaderAndFooter(pageNumber);
            drawRow(doc, 30, 50, columns, columnWidths);
            y = 70;
        }
        drawRow(doc, 30, y, row, columnWidths);
        y += 20;
    });

    doc.end();
};

// Generate Activity Log Report
const generateActivityLogReport = async (req, res) => {
    try {
        const logs = await ActivityLog.find().populate('user', 'name');
        const data = logs.map((log) => [
            log.user.name || 'N/A',
            log.action,
            log.details || 'N/A',
            formatDate(log.timestamp)
        ]);
        generateStyledPDF(res, 'Activity Log Report', ['User', 'Action', 'Details', 'Timestamp'], data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate activity log report.', error });
    }
};

// Generate Product Report
const generateProductReport = async (req, res) => {
    try {
        const products = await Product.find().populate('category', 'name');
        const data = products.map((product) => [
            product.name,
            product.sku,
            product.category.name || 'N/A',
            `$${product.price.toFixed(2)}`,
            product.stockQuantity,
            formatDate(product.createdAt)
        ]);
        generateStyledPDF(res, 'Product Report', ['Name', 'SKU', 'Category', 'Price', 'Stock Quantity', 'Created At'], data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate product report.', error });
    }
};

// Generate Stock In Report
const generateStockInReport = async (req, res) => {
    try {
        const stockInRecords = await StockIn.find().populate('product', 'name').populate('addedBy', 'name');
        const data = stockInRecords.map((record) => [
            record.product.name || 'N/A',
            record.quantity,
            record.addedBy.name || 'N/A',
            formatDate(record.date)
        ]);
        generateStyledPDF(res, 'Stock In Report', ['Product', 'Quantity', 'Added By', 'Date'], data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate stock in report.', error });
    }
};

// Generate Stock Out Report
const generateStockOutReport = async (req, res) => {
    try {
        const stockOutRecords = await StockOut.find().populate('product', 'name').populate('removedBy', 'name');
        const data = stockOutRecords.map((record) => [
            record.product.name || 'N/A',
            record.quantity,
            record.removedBy.name || 'N/A',
            formatDate(record.date)
        ]);
        generateStyledPDF(res, 'Stock Out Report', ['Product', 'Quantity', 'Removed By', 'Date'], data);
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate stock out report.', error });
    }
};

// Generate Combined Report for All Models
const generateCombinedReport = async (req, res) => {
    try {
        const logs = await ActivityLog.find().populate('user', 'name');
        const products = await Product.find().populate('category', 'name');
        const stockInRecords = await StockIn.find().populate('product', 'name').populate('addedBy', 'name');
        const stockOutRecords = await StockOut.find().populate('product', 'name').populate('removedBy', 'name');

        const doc = new PDFDocument({ margin: 30 });
        res.setHeader('Content-Type', 'application/pdf');
        doc.pipe(res);

        let pageNumber = 1;

        // Activity Logs Section
        doc.fontSize(18).text('Activity Logs', { underline: true }).moveDown();
        logs.forEach((log) => {
            if (doc.y > doc.page.height - 50) {
                doc.addPage();
                pageNumber++;
            }
            doc.text(`User: ${log.user.name || 'N/A'} | Action: ${log.action} | Timestamp: ${formatDate(log.timestamp)}`);
        });

        // Add more sections similarly...

        doc.end();
    } catch (error) {
        res.status(500).json({ message: 'Failed to generate combined report.', error });
    }
};

// Other log functions
const getAllLogs = async (req, res) => {
    try {
        const logs = await ActivityLogger.find({user: req.user.id});
        res.json(logs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ user: req.user.id });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllLogs,
    getAllNotifications,
    generateActivityLogReport,
    generateProductReport,
    generateStockInReport,
    generateStockOutReport,
    generateCombinedReport,
};
