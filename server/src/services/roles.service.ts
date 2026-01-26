import { DEFAULT_PAGE_SIZE } from "@/constants/app";
import { PaginationParams } from "@/interfaces/common";
import { paginateItems } from "@/utilities/common";
import { prisma } from "./prisma.service";


export class RoleService {
  static getRoles = async (params: Partial<PaginationParams>) => {
    const page = Number(params.page ?? 1);
    const pageSize = Number(params.pageSize ?? DEFAULT_PAGE_SIZE);
    const search = params.search?.trim();

    const where = {
      ...(search
        ? {
          OR: [
            { name: { contains: search, mode: "insensitive" as const } },
            { key: { contains: search, mode: "insensitive" as const } },
            { focus: { contains: search, mode: "insensitive" as const } },
          ],
        }
        : {}),
    };

    const [total, roles] = await prisma.$transaction([
      prisma.role.count({ where }),
      prisma.role.findMany({
        where,
        orderBy: { name: "asc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
        include: { _count: { select: { questions: true } } },
      }),
    ]);

    return paginateItems({
      items: roles,
      total,
      page,
      pageSize
    });
  };

  static getRole = async (roleKey: string) => {
    if (!roleKey?.trim()) {
      return null
    }

    const role = await prisma.role.findUnique({
      where: { key: roleKey.trim() },
      include: { _count: { select: { questions: true } } },
    });

    if (!role) {
      return null
    }

    return role;
  };

  static createRole = async (params: { key: string; name: string; focus?: string }) => {
    const key = params.key?.trim();
    const name = params.name?.trim();

    if (!key || !name) {
      return null
    }

    const existing = await prisma.role.findUnique({ where: { key } });
    if (existing) {
      return null
    }

    return prisma.role.create({
      data: {
        key,
        name,
        focus: params.focus?.trim() || null,
      },
    });
  };

  static updateRole = async (
    roleKey: string,
    params: { name?: string; focus?: string; isActive?: boolean }
  ) => {
    const key = roleKey?.trim();
    if (!key) {
      return null
    }

    const role = await prisma.role.findUnique({ where: { key } });
    if (!role) {
      return null
    }

    return prisma.role.update({
      where: { key },
      data: {
        ...(params.name !== undefined ? { name: params.name?.trim() } : {}),
        ...(params.focus !== undefined ? { focus: params.focus?.trim() } : {}),
        ...(params.isActive !== undefined ? { isActive: params.isActive } : {}),
      },
    });
  };
}
