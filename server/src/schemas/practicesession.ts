import {
  constructSuccessResponse,
  constructErrorResponse,
  constructPaginatedData,
  paginationQuerySchema,
} from "./builders";

import {
   roleSchema
} from "@/schemas/roles";

export const practiceSessionId = {
    type: "object",
    properties: {
        id: { type: "string" }
    }
}

export const practiceSessionSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    roleId: { type: "string" },
    accontId: { type: "string" },
    startedAt: { type: "string", format: "date-time" },
    completedAt: { type: "string", format: "date-time" },
  }
} as const;

export const startPracticeSessionSchema = {
    tags: ["Questions"],
    description: "Start a practice session",
    querystring: {
    type: "object",
    properties: {
        roleId: {
        type: "string",
        description: "Filter by role ID"
        }
    }
    },
    response: {
    201: constructSuccessResponse(constructPaginatedData(practiceSessionId)),
    500: constructErrorResponse()
    }
}
