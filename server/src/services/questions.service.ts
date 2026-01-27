// src/services/questions.service.ts
import { DEFAULT_PAGE_SIZE } from "@/constants/app";
import { PaginationParams } from "@/interfaces/common";
import { paginateItems } from "@/utilities/common";
import { prisma } from "./prisma.service";
import { Question } from "../../generated/prisma/client";

type GetQuestionsParams = Partial<PaginationParams & Question> & {
    roleKey?: string
};

export class QuestionService {
    static getQuestions = async (params: GetQuestionsParams) => {
        const page = Number(params.page ?? 1);
        const pageSize = Number(params.pageSize ?? DEFAULT_PAGE_SIZE);
        const search = params.search?.trim();
        const roleKey = params.roleKey?.trim();
        const roleId = params.roleId?.trim();

        const where = {
            isActive: true,
            ...(search ? {
                OR: [
                    { prompt: { contains: search, mode: "insensitive" as const } },
                    { explanation: { contains: search, mode: "insensitive" as const } },
                ]
            } : {}),
            ...(roleKey ? { role: { key: roleKey } } : {}),
            ...(roleId ? { role: { id: roleId } } : {}),
        };

        const [total, questions] = await prisma.$transaction([
            prisma.question.count({ where }),
            prisma.question.findMany({
                where,
                orderBy: { createdAt: "desc" },
                skip: (page - 1) * pageSize,
                take: pageSize,
                include: {
                    role: { select: { id: true, key: true, name: true } },
                    choices: true,
                },
            }),
        ]);

        return paginateItems({ items: questions, total, page, pageSize });
    };

    static getQuestion = async (questionId: string) => {
        if (!questionId?.trim()) {
            return null
        }

        const question = await prisma.question.findUnique({
            where: { id: questionId },
            include: {
                role: { select: { id: true, key: true, name: true } },
                choices: true,
            },
        });

        if (!question) {
            return null;
        }

        return question;
    };

    static getQuestionsByRole = async (
        roleKey: string,
        params: PaginationParams
    ) => {
        if (!roleKey?.trim()) {
            return null
        }

        return this.getQuestions({
            ...params,
            roleKey,
        });
    };

    static createQuestion = async (params: {
        roleKey: string;
        prompt: string;
        explanation?: string;
        choices: {
            label: string;
            text: string;
            isCorrect: boolean;
        }[];
    }) => {
        const { roleKey, prompt, explanation, choices } = params;

        if (!roleKey || !prompt || !choices?.length) {
            return null
        }

        const correctCount = choices.filter((c) => c.isCorrect).length;
        if (correctCount !== 1) {
            return null
        }

        const role = await prisma.role.findUnique({
            where: { key: roleKey },
        });

        if (!role) {
            return null
        }

        return prisma.question.create({
            data: {
                roleId: role.id,
                prompt: prompt.trim(),
                explanation: explanation?.trim() || "",
                choices: {
                    create: choices.map((c) => ({
                        label: c.label,
                        text: c.text,
                        isCorrect: c.isCorrect,
                    })),
                },
            },
            include: {
                choices: true,
                role: { select: { id: true, key: true, name: true } },
            },
        });
    };

    static updateQuestion = async (
        questionId: string,
        params: {
            prompt?: string;
            explanation?: string;
            isActive?: boolean;
        }
    ) => {
        if (!questionId?.trim()) {
            return null;
        }

        const existing = await prisma.question.findUnique({
            where: { id: questionId },
        });

        if (!existing) {
            return null;
        }

        return prisma.question.update({
            where: { id: questionId },
            data: {
                ...(params.prompt !== undefined ? { prompt: params.prompt.trim() } : {}),
                ...(params.explanation !== undefined
                    ? { explanation: params.explanation.trim() }
                    : {}),
                ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
            },
        });
    };
}
