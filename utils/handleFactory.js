const catchAsync = require('./catchAsync');
const APIFeatures = require('./apiFeatures');

exports.createOne = (Invoice, InvoiceDetail) =>
  catchAsync(async (req, res) => {
    const { products, customerName, totalAmount } = req.body;
    const document = await Invoice.create({ customerName, totalAmount });
    if (document) {
      const detailsPromises = products.map(async (detail) => {
        const newDetail = new InvoiceDetail({
          invoiceId: document._id,
          ...detail,
        });
        return newDetail.save();
      });
      if (detailsPromises) {
        res.status(201).json({
          status: 'success',
          data: { document, invoicedetails: detailsPromises },
        });
      }
    }
  });

exports.getAll = (Model) =>
  catchAsync(async (req, res) => {
    const features = new APIFeatures(Model.find(), req.query)
      .filter()
      .sort()
      .limitFields()
      .paginate();
    const documents = await features.query;

    res.status(200).json({
      status: 'success',
      results: documents.length,
      data: documents,
    });
  });
