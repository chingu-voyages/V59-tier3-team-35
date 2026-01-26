// src/schemas/common.ts
export const baseResponseSchema = {
    type: "object",
    properties: {
        code: { type: "number" },
        apiObject: { type: "string" },
        message: { type: "string" },
        data: { type: "object" },
    }
} as const;
/**
 * Creates a success response schema wrapping the provided data schema
 */
export const constructSuccessResponse = (dataSchema: any) => ({
    type: "object",
    properties: {
        ...baseResponseSchema.properties,
        data: dataSchema,
    }
} as const);

/**
 * Creates an error response schema
 */
export const constructErrorResponse = () => ({
    type: "object",
    properties: baseResponseSchema.properties,
} as const);

/**
 * Standard pagination metadata schema
 */
export const paginationMetaSchema = {
    type: "object",
    properties: {
        page: { type: "number" },
        pageSize: { type: "number" },
        total: { type: "number" },
        totalPages: { type: "number" }
    }
} as const;

/**
 * Creates a paginated response data schema
 */
export const constructPaginatedData = (itemSchema: any) => ({
    type: "object",
    properties: {
        items: {
            type: "array",
            items: itemSchema
        },
        meta: paginationMetaSchema
    }
} as const);

/**
 * Creates standard query parameters for pagination and search
 */
export const paginationQuerySchema = {
    type: "object",
    properties: {
        page: {
            type: "number",
            minimum: 1,
            default: 1,
            description: "Page number"
        },
        pageSize: {
            type: "number",
            minimum: 1,
            maximum: 100,
            description: "Number of items per page"
        },
        search: {
            type: "string",
            description: "Search term"
        }
    }
} as const;