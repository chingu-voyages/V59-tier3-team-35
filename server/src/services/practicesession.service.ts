import { DEFAULT_PAGE_SIZE } from "@/constants/app";
import { PaginationParams } from "@/interfaces/common";
import { paginateItems } from "@/utilities/common";
import { prisma } from "./prisma.service";
import { PracticeSession } from "../../generated/prisma/client";

export class PracticeSessionService {

    static startSession =  async (params: {roleId: string}) => {

        const roleId = params.roleId.trim();

        return prisma.practiceSession.create({
            data: {
                roleId: roleId
            }
        });
    }

    static recordQuestionAttempt = async (params: {
        sessionId: string,
        questionId: string,
        selectedChoidId?: string,
        attemptNumber: number,
        isCorrect: boolean
    }) => {

        return prisma.questionAttempt.upsert({
            where: {
                id: params.sessionId
            },
            update: {
                attemptNumber: params.attemptNumber
            },
            create: {
                sessionId: params.sessionId,
                questionId: params.questionId,
                // selectedChoiceId: params.selectedChoidId,
                attemptNumber: params.attemptNumber,
                isCorrect: params.isCorrect
            }
        });
    }

    static retriveSessionData = async (params: { sessionId: string }) => {
        
        const sessionData = await prisma.practiceSession.findUnique({where: { id: params.sessionId }});
        return sessionData;
    }
}