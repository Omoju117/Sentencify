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

exports.getDocument = async (params) => {
  const { document, marks } = await executeQueryService.execute(async () => {
    const document = await prisma.document.findUnique({
      where: {
        id: parseInt(params.id),
      },
    });
    console.log("document", document);

    const marks = await prisma.marks.findMany({
      where: {
        documentId: parseInt(params.id),
      },
    });
    console.log("marks", marks);
    return { document, marks };
  });
  return {
    id: document.id,
    userId: document.userId,
    sentence: document.sentence,
    translation: document.translation,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    marks: marks.map((mark) => ({ index: mark.index, type: mark.typeId })),
  };
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

    // マークが設定されている場合
    if (documentScheme.marks) {
      const createMarks = async (mark) => {
        const { index, type } = JSON.parse(mark);
        return await prisma.marks.create({
          data: {
            documentId: parseInt(documentScheme.id),
            index: index,
            typeId: type,
          },
        });
      };
      // マークが一つか複数かで処理分岐 ※UrlSearchParamの仕様で型が分岐する
      console.log("typeof", typeof documentScheme.marks);
      if (typeof documentScheme.marks === "string") {
        createMarks(documentScheme.marks);
      } else {
        documentScheme.marks.forEach(async (mark) => {
          createMarks(mark);
        });
      }
    }

    const allDocuments = await prisma.document.findMany();
    console.log("allDocuments", allDocuments);
    const allMarks = await prisma.marks.findMany();
    console.log("allMarks", allMarks);

    return true;
  });
  return result;
};
