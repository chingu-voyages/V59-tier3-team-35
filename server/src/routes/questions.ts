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

    server.get(
        "/getNextQuestion",
        { schema: getQuestionSchema },
        async (request, reply) => {

            // this currently only applies to one role, want to double check something first before i fully implement this
            // i'm still getting familair with typscript will read the handbook and double back to fix any issue here
            
            try {
                const currentIndex = request.session.get("currentQuestion") ?  request.session.get("currentQuestion") : 0;
                const data = await QuestionService.getQuestion_v2(currentIndex);

                // update current session index
                request.session.set("currentIndex", currentIndex + 1 );

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
        "/getNextQuestionAnswer",
        { schema: getQuestionSchema },
        async (request, reply) => {
            try {
                const currentIndex = request.session.get("currentQuestion") ?  request.session.get("currentQuestion") : 0; 
                // todo: this should throw an error if currentIndex is undefined (above)

                const data = await QuestionService.getQuestion_v2(currentIndex);
                const answer = data.answer;

                return constructResponse({
                    reply,
                    code: 200,
                    apiObject: API_OBJECTS.Question,
                    message: STRINGS.Success,
                    answer,
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
