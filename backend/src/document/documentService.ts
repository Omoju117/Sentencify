import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Document } from 'schemas';
import { ExecuteQueryService } from 'src/services/executeQuery.service';
import { TranslationsService } from 'src/translations/translations.service';
const prisma = new PrismaClient();

@Injectable()
export class DocumentService {
  constructor(
    private readonly executeQueryService: ExecuteQueryService,
    private readonly translationsService: TranslationsService,
  ) {}

  async getDocuments(userEmail: string): Promise<Document[]> {
    const result = await this.executeQueryService.execute(async () => {
      const targetUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const documents = await prisma.document.findMany({
        where: {
          userId: targetUser.id,
        },
      });
      return documents;
    });
    return result;
  }

  async getDocument(documentId: string): Promise<Document> {
    const { document, marks } = await this.executeQueryService.execute(
      async () => {
        const document = await prisma.document.findUnique({
          where: {
            id: parseInt(documentId),
          },
        });
        console.log('document', document);

        const marks = await prisma.marks.findMany({
          where: {
            documentId: parseInt(documentId),
          },
        });
        console.log('marks', marks);
        return { document, marks };
      },
    );
    return {
      id: document.id,
      userId: document.userId,
      sentence: document.sentence,
      translation: document.translation,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      marks: marks.map((mark: any) => ({
        index: mark.index,
        type: mark.typeId,
      })),
    };
  }

  async createDocument(
    userEmail: string,
    sentence = '',
    translation = '',
  ): Promise<Document> {
    if (sentence) {
      // TODO: fix here
      translation = await this.translationsService.translate(sentence, 'ja');
    }
    const result = await this.executeQueryService.execute(async () => {
      const targetUser = await prisma.user.findUnique({
        where: {
          email: userEmail,
        },
      });

      const newDocument = await prisma.document.create({
        data: {
          userId: targetUser.id,
          sentence,
          translation,
        },
      });

      return newDocument;
    });
    return result;
  }

  async updateDocument(documentScheme: Document): Promise<boolean> {
    const result = await this.executeQueryService.execute(async () => {
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
        const createMarks = async (mark: any) => {
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
        console.log('typeof', typeof documentScheme.marks);
        if (typeof documentScheme.marks === 'string') {
          createMarks(documentScheme.marks);
        } else {
          documentScheme.marks.forEach(async (mark: any) => {
            createMarks(mark);
          });
        }
      }

      return true;
    });
    return result;
  }
}
