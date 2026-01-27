import { API_OBJECTS } from "@/constants";
import { getRoleSchema, getRolesSchema } from "@/schemas/roles";
import { RoleService } from "@/services/roles.service";
import { constructResponse } from "@/utilities";
import { FastifyPluginAsync } from "fastify";


export const rolesRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get(
    "/",
    { schema: getRolesSchema },
    async (request, reply) => {
      try {
        const roles = await RoleService.getRoles( request.query as any);

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
    "/:key",
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