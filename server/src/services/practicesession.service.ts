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
}