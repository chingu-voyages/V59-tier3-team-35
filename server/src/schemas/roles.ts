// src/schemas/roles.schemas.ts
import {
  constructSuccessResponse,
  constructErrorResponse,
  constructPaginatedData,
  paginationQuerySchema,
} from "./builders";

// Role entity schema
export const roleSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    focus: { type: "string", nullable: true },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    _count: {
      type: "object",
      properties: {
        questions: { type: "number" }
      }
    }
  }
} as const;

// GET /roles - List roles with pagination
export const getRolesSchema = {
  tags: ["Roles"],
  description: "Get a paginated list of roles",
  querystring: paginationQuerySchema,
  response: {
    200: constructSuccessResponse(constructPaginatedData(roleSchema)),
    500: constructErrorResponse()
  }
} as const;

// GET /roles/:key - Get single role
export const getRoleSchema = {
  tags: ["Roles"],
  description: "Get a single role by key",
  params: {
    type: "object",
    required: ["key"],
    properties: {
      key: {
        type: "string",
        description: "The unique key of the role (e.g., SCRUM_MASTER)"
      }
    }
  },
  response: {
    200: constructSuccessResponse(roleSchema),
    404: constructErrorResponse(),
    500: constructErrorResponse()
  }
} as const;

export const setRoleSchema = {
  tags: [ "Roles"],
  description: "Role has been set",
  body: {},
  response: {
    200: constructSuccessResponse(roleSchema)
  }
}

// POST /roles - Create role
export const createRoleSchema = {
  tags: ["Roles"],
  description: "Create a new role",
  body: {
    type: "object",
    required: ["key", "name"],
    properties: {
      key: { type: "string", minLength: 1 },
      name: { type: "string", minLength: 1 },
      focus: { type: "string" }
    }
  },
  response: {
    201: constructSuccessResponse(roleSchema),
    400: constructErrorResponse(),
    409: constructErrorResponse(), // Conflict - role already exists
    500: constructErrorResponse()
  }
} as const;

// PATCH /roles/:key - Update role
export const updateRoleSchema = {
  tags: ["Roles"],
  description: "Update an existing role",
  params: {
    type: "object",
    required: ["key"],
    properties: {
      key: { type: "string" }
    }
  },
  body: {
    type: "object",
    properties: {
      name: { type: "string", minLength: 1 },
      focus: { type: "string" },
      isActive: { type: "boolean" }
    }
  },
  response: {
    200: constructSuccessResponse(roleSchema),
    404: constructErrorResponse(),
    500: constructErrorResponse()
  }
} as const;