import { API_OBJECTS, ERROR_MESSAGES, STRINGS } from "@/constants";
import {
    getQuestionSchema,
    getQuestionsSchema,
    recordQuestionAttemptSchema,
    // createQuestionSchema,
    // updateQuestionSchema,
} from "@/schemas/questions";

import {
    retriveSessionDataSchema,
    startPracticeSessionSchema 
} from "@/schemas/practicesession"
import { PracticeSessionService } from "@/services/practicesession.service";
import { constructResponse } from "@/utilities";
import { FastifyPluginAsync } from "fastify";

export const practiceSessionRoutes: FastifyPluginAsync =  async (server) => {

    server.post(
        "/",
        { schema: startPracticeSessionSchema },
        async (request, reply) => {

            try {

                const startSession =  await PracticeSessionService.startSession(request.body as any);
                const sessionId = startSession.id;

                return constructResponse({
                    reply,
                    code: 201,
                    apiObject: API_OBJECTS.Session,
                    message: STRINGS.SessionSuccess,
                    data: sessionId
                })

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

    server.post(
        "/recordQuestionAttempt",
        { schema: recordQuestionAttemptSchema},
        async (request, reply) => {

            try {
                const record = await PracticeSessionService.recordQuestionAttempt(request.body as any);

                 return constructResponse({
                    reply,
                    code: 201,
                    apiObject: API_OBJECTS.Session,
                    message: STRINGS.SessionSuccess,
                    data: {}
                })

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
        "/retriveSessionData",
        { schema: retriveSessionDataSchema},
        async (request, reply) => {

            try {
                // const {sessionId} = request.params as {sessionId: string}
                const sessionData = await PracticeSessionService.retriveSessionData(request.params as any);
                
                return constructResponse({
                    reply,
                    code: 201,
                    apiObject: API_OBJECTS.Session,
                    message: STRINGS.SessionSuccess,
                    data: sessionData
                })
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
}