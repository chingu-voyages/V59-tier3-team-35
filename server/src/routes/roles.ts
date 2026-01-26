import { FastifyPluginAsync } from "fastify";
import { RoleService } from "@/services/roles.service";
import { getRoleSchema, getRolesSchema } from "@/schemas/roles";
import { constructResponse } from "@/utilities/common";
import { API_OBJECTS } from "@/constants/app";


export const rolesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/roles",
    { schema: getRolesSchema },
    async (request, reply) => {
      try {
        const query = request.query as any;
        const roles = await RoleService.getRoles(query);

        return constructResponse({
          reply,
          message: "Roles retrieved successfully",
          data: roles,
          code: 200,
          apiObject: API_OBJECTS.Role
        });
      } catch (error) {
        console.log(error)
        return constructResponse({
          reply,
          message: "Failed to retrieve roles",
          data: { error: error instanceof Error ? error.message : "Unknown error" },
          code: 500,
          apiObject: API_OBJECTS.Role
        });
      }
    }
  );

  fastify.get(
    "/roles/:key",
    { schema: getRoleSchema },
    async (request, reply) => {
      try {
        const { key } = request.params as any;
        const role = await RoleService.getRole(key);

        if (!role) {
          return constructResponse({
            reply,
            message: `Role with key '${key}' not found`,
            data: {},
            code: 404,
            apiObject: API_OBJECTS.Role
          });
        }

        return constructResponse({
          reply,
          message: "Role retrieved successfully",
          data: role,
          code: 200,
          apiObject: API_OBJECTS.Role
        });
      } catch (error) {
        return constructResponse({
          reply,
          message: "Failed to retrieve role",
          data: { error: error instanceof Error ? error.message : "Unknown error" },
          code: 500,
          apiObject: API_OBJECTS.Role
        });
      }
    }
  );
}