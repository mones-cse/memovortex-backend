import { eq, and, isNull } from 'drizzle-orm'
import { DocumentTable } from '@src/schemas/schemas'
import { db } from '../config/database'

const documentSerializer = {
    id: DocumentTable.id,
    isDirectory: DocumentTable.isDirectory,
    fileName: DocumentTable.fileName,
    fileType: DocumentTable.fileType,
    mimeType: DocumentTable.mimeType,
    fileSize: DocumentTable.fileSize,
    fileS3key: DocumentTable.fileS3key,
    updatedAt: DocumentTable.updatedAt,
    parentId: DocumentTable.parentId,
}
export const createDocument = async (document: any) => {
    return await db.insert(DocumentTable).values(document).returning(documentSerializer)
}

// todo - add pagination
// todo - change folder name getDocumentsAtRoot
export const getDocuments = async (userId: string) => {
    return await db
        .select(documentSerializer)
        .from(DocumentTable)
        .where(and(eq(DocumentTable.createdBy, userId), isNull(DocumentTable.parentId)))
}

export const getDocumentsWithParentID = async (parentId: string) => {
    return await db.select(documentSerializer).from(DocumentTable).where(eq(DocumentTable.parentId, parentId))
}

// todo remove file from s3 bucket
export const deleteDocument = async (documentId: string) => {
    try {
        const result = await db.transaction(async (tx) => {
            // The cascade will handle deleting child documents automatically
            await tx.delete(DocumentTable).where(eq(DocumentTable.id, documentId))
        })
        console.log(`Document ${documentId} and its children deleted successfully`)
        return result
    } catch (error) {
        console.error(`Error deleting document ${documentId}:`, error)
        throw error
    }
}

export const patchDocument = async (documentId: string, data: any) => {
    return await db
        .update(DocumentTable)
        .set(data)
        .where(eq(DocumentTable.id, documentId))
        .returning(documentSerializer)
}
