const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const executeQueryService = require("./executeQueryService");

exports.getDocuments = async (userId) => {
  const result = await executeQueryService.execute(async () => {
    const documents = await prisma.document.findMany({
      where: {
        userId: parseInt(userId),
      },
    });
    console.log("documents", documents);
    return documents;
  });
  return result;
};

exports.createDocument = async (userId) => {
  const result = await executeQueryService.execute(async () => {
    const newDocument = await prisma.document.create({
      data: {
        userId: parseInt(userId),
        sentence: "",
        translation: "",
      },
    });

    const allDocuments = await prisma.document.findMany();
    console.log("allDocuments", allDocuments);

    return newDocument;
  });
  return result;
};

exports.updateDocument = async (documentScheme) => {
  const result = await executeQueryService.execute(async () => {
    await prisma.document.update({
      where: {
        id: parseInt(documentScheme.id),
      },
      data: {
        sentence: documentScheme.sentence,
        translation: documentScheme.translation,
      },
    });

    // delete all marks of login user
    await prisma.marks.deleteMany({
      where: {
        documentId: parseInt(documentScheme.id),
      },
    });

    documentScheme.marks.forEach(async (mark) => {
      const { index, type } = JSON.parse(mark);
      await prisma.marks.create({
        data: {
          documentId: parseInt(documentScheme.id),
          index: index,
          typeId: type,
        },
      });
    });

    const allDocuments = await prisma.document.findMany();
    console.log("allDocuments", allDocuments);
    const allMarks = await prisma.marks.findMany();
    console.log("allMarks", allMarks);

    return true;
  });
  return result;
};
