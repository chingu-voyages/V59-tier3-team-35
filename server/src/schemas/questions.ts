// src/schemas/questions.schemas.ts
import {
  constructSuccessResponse,
  constructErrorResponse,
  constructPaginatedData,
  paginationQuerySchema,
} from "./builders";

// Choice entity schema
export const choiceSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    questionId: { type: "string" },
    label: { type: "string", enum: ["A", "B", "C", "D"] },
    text: { type: "string" },
    isCorrect: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" }
  }
} as const;

// Question entity schema
export const questionSchema = {
  type: "object",
  properties: {
    id: { type: "string" },
    roleId: { type: "string" },
    prompt: { type: "string" },
    explanation: { type: "string", nullable: true },
    isActive: { type: "boolean" },
    createdAt: { type: "string", format: "date-time" },
    updatedAt: { type: "string", format: "date-time" },
    choices: {
      type: "array",
      items: choiceSchema
    }
  }
} as const;

// GET /questions - List questions
export const getQuestionsSchema = {
  tags: ["Questions"],
  description: "Get a paginated list of questions",
  querystring: {
    type: "object",
    properties: {
      ...paginationQuerySchema.properties,
      roleId: {
        type: "string",
        description: "Filter by role ID"
      },
      isActive: {
        type: "boolean",
        description: "Filter by active status"
      }
    }
  },
  response: {
    200: constructSuccessResponse(constructPaginatedData(questionSchema)),
    500: constructErrorResponse()
  }
} as const;

// GET /questions/:id - Get single question
export const getQuestionSchema = {
  tags: ["Questions"],
  description: "Get a single question by ID",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    }
  },
  response: {
    200: constructSuccessResponse(questionSchema),
    404: constructErrorResponse(),
    500: constructErrorResponse()
  }
} as const;

// POST /questions - Create question
export const createQuestionSchema = {
  tags: ["Questions"],
  description: "Create a new question with choices",
  body: {
    type: "object",
    required: ["roleId", "prompt", "choices"],
    properties: {
      roleId: { type: "string" },
      prompt: { type: "string", minLength: 1 },
      explanation: { type: "string" },
      choices: {
        type: "array",
        minItems: 2,
        maxItems: 4,
        items: {
          type: "object",
          required: ["label", "text", "isCorrect"],
          properties: {
            label: { type: "string", enum: ["A", "B", "C", "D"] },
            text: { type: "string", minLength: 1 },
            isCorrect: { type: "boolean" }
          }
        }
      }
    }
  },
  response: {
    201: constructSuccessResponse(questionSchema),
    400: constructErrorResponse(),
    500: constructErrorResponse()
  }
} as const;

// PATCH /questions/:id - Update question
export const updateQuestionSchema = {
  tags: ["Questions"],
  description: "Update an existing question",
  params: {
    type: "object",
    required: ["id"],
    properties: {
      id: { type: "string" }
    }
  },
  body: {
    type: "object",
    properties: {
      prompt: { type: "string", minLength: 1 },
      explanation: { type: "string" },
      isActive: { type: "boolean" }
    }
  },
  response: {
    200: constructSuccessResponse(questionSchema),
    404: constructErrorResponse(),
    500: constructErrorResponse()
  }
} as const;