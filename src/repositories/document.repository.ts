import { eq, and, isNull } from 'drizzle-orm'
import { sql } from 'drizzle-orm/sql'
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

export const getDocumentById = async (documentId: string) => {
    return await db.select(documentSerializer).from(DocumentTable).where(eq(DocumentTable.id, documentId))
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

export const getParentsById = async (documentId: string) => {
    const query = sql`
    WITH RECURSIVE ParentHierarchy AS (
        SELECT
            id,
            parent_id,
            file_name,
            1 AS level
        FROM
            document
        WHERE
            id = ${documentId}
        UNION ALL
        SELECT
            d.id,
            d.parent_id,
            d.file_name,
            ph.level + 1
        FROM
            document d
        INNER JOIN
            ParentHierarchy ph ON d.id = ph.parent_id
        WHERE
            ph.level < 4
    )
    SELECT
        id,
        parent_id,
        file_name,
        level
    FROM
        ParentHierarchy
    ORDER BY
        level DESC;
    `
    const result = await db.execute(query)

    // Transform the result to match the desired format
    const transformedData = result.rows.map((row) => ({
        id: row.id,
        fileName: row.file_name,
        parentId: row.parent_id,
        level: row.level,
    }))

    return transformedData
}
