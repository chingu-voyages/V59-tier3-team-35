import { API_OBJECTS, ERROR_MESSAGES, STRINGS } from "@/constants";
import {
    getQuestionSchema,
    getQuestionsSchema,
    // createQuestionSchema,
    // updateQuestionSchema,
} from "@/schemas/questions";
import { QuestionService } from "@/services/questions.service";
import { constructResponse } from "@/utilities";
import { FastifyPluginAsync } from "fastify";

export const questionsRoutes: FastifyPluginAsync = async (server) => {
    server.get(
        "/",
        { schema: getQuestionsSchema },
        async (request, reply) => {
            try {
                const data = await QuestionService.getQuestions(request.query as any);

                return constructResponse({
                    reply,
                    code: 200,
                    apiObject: API_OBJECTS.Question,
                    message: STRINGS.Success,
                    data,
                });
            } catch (error) {
                return constructResponse({
                    reply,
                    code: 500,
                    apiObject: API_OBJECTS.Question,
                    message: ERROR_MESSAGES.InternalServerError,
                    data: error,
                });
            }
        }
    );

    server.get(
        "/:id",
        { schema: getQuestionSchema },
        async (request, reply) => {
            try {
                const { id } = request.params as { id: string };
                const data = await QuestionService.getQuestion(id);

                return constructResponse({
                    reply,
                    code: 200,
                    apiObject: API_OBJECTS.Question,
                    message: STRINGS.Success,
                    data,
                });
            } catch (error) {
                return constructResponse({
                    reply,
                    code: 500,
                    apiObject: API_OBJECTS.Question,
                    message: ERROR_MESSAGES.InternalServerError,
                    data: error,
                });
            }
        }
    );

    // server.post(
    //     "/",
    //     { schema: createQuestionSchema },
    //     async (request, reply) => {
    //         try {
    //             const data = await QuestionService.createQuestion(request.body as any);

    //             return constructResponse({
    //                 reply,
    //                 code: 201,
    //                 apiObject: API_OBJECTS.Question,
    //                 message: "Question created successfully",
    //                 data,
    //             });
    //         } catch (error) {
    //             return constructResponse({
    //                 reply,
    //                 code: 500,
    //                 apiObject: API_OBJECTS.Question,
    //                 message: ERROR_MESSAGES.InternalServerError,
    //                 data: error,
    //             });
    //         }
    //     }
    // );

    // server.put(
    //     "/:id",
    //     { schema: updateQuestionSchema },
    //     async (request, reply) => {
    //         try {
    //             const { id } = request.params as { id: string };
    //             const data = await QuestionService.updateQuestion(
    //                 id,
    //                 request.body as any
    //             );

    //             return constructResponse({
    //                 reply,
    //                 code: 200,
    //                 apiObject: API_OBJECTS.Question,
    //                 message: "Question updated successfully",
    //                 data,
    //             });
    //         } catch (error) {
    //             return constructResponse({
    //                 reply,
    //                 code: 500,
    //                 apiObject: API_OBJECTS.Question,
    //                 message: ERROR_MESSAGES.InternalServerError,
    //                 data: error,
    //             });
    //         }
    //     }
    // );
};
