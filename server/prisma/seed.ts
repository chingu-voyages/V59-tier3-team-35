import { prisma } from "@/services/prisma.service";

interface FlashcardOption {
    A: string;
    B: string;
    C: string;
    D: string;
}

type FlashcardAnswer = "A" | "B" | "C" | "D"

interface Flashcard {
    id: number;
    question: string;
    options: FlashcardOption;
    answer: FlashcardAnswer | string;
    rationale: string;
}

interface RoleSeedData {
    role: string;
    focus: string;
    flashcards: Flashcard[];
}

export class SeedService {
    /**
     * Generate a role key from role name (e.g., "Scrum Master" -> "SCRUM_MASTER")
     */
    private static generateRoleKey(roleName: string): string {
        return roleName
            .toUpperCase()
            .replace(/\s+/g, "_")
            .replace(/[^A-Z0-9_]/g, "");
    }

    /**
     * Seed a single role
     */
    static async seedRole(roleName: string, focus: string) {
        const roleKey = this.generateRoleKey(roleName);

        const existingRole = await prisma.role.findUnique({
            where: { key: roleKey },
        });

        if (existingRole) {
            console.log(`  ↻ Role already exists, updating...`);
            return prisma.role.update({
                where: { key: roleKey },
                data: {
                    name: roleName,
                    focus: focus,
                },
            });
        } else {
            console.log(`  ✓ Creating new role...`);
            return prisma.role.create({
                data: {
                    key: roleKey,
                    name: roleName,
                    focus: focus,
                },
            });
        }
    }

    /**
     * Seed choices for a question
     */
    static async seedChoices(
        questionId: string,
        options: FlashcardOption,
        correctAnswer: "A" | "B" | "C" | "D"
    ) {
        const choiceLabels: Array<"A" | "B" | "C" | "D"> = ["A", "B", "C", "D"];
        let choicesCreated = 0;

        for (const label of choiceLabels) {
            const choiceText = options[label];
            const isCorrect = correctAnswer === label;

            await prisma.choice.upsert({
                where: {
                    questionId_label: {
                        questionId: questionId,
                        label: label,
                    },
                },
                create: {
                    questionId: questionId,
                    label: label,
                    text: choiceText,
                    isCorrect: isCorrect,
                },
                update: {
                    text: choiceText,
                    isCorrect: isCorrect,
                },
            });

            choicesCreated++;
        }

        return choicesCreated;
    }

    /**
     * Seed a single question with its choices
     */
    static async seedQuestion(roleId: string, roleKey: string, flashcard: Flashcard) {
        const questionId = `${roleKey}_Q${flashcard.id}`;

        const question = await prisma.question.upsert({
            where: {
                id: questionId,
            },
            create: {
                id: questionId,
                roleId: roleId,
                prompt: flashcard.question,
                explanation: flashcard.rationale,
                isActive: true,
            },
            update: {
                prompt: flashcard.question,
                explanation: flashcard.rationale,
                isActive: true,
            },
        });

        // Seed the choices for this question
        const choicesCreated = await this.seedChoices(
            question.id,
            flashcard.options,
            flashcard.answer as FlashcardAnswer
        );

        console.log(`  ✓ Question ${flashcard.id}: ${flashcard.question.substring(0, 50)}...`);

        return { question, choicesCreated };
    }

    /**
     * Seed all questions for a specific role
     */
    static async seedQuestionsForRole(
        roleId: string,
        roleKey: string,
        flashcards: Flashcard[]
    ) {
        let questionsCreated = 0;
        let choicesCreated = 0;
        const errors: string[] = [];

        for (const flashcard of flashcards) {
            try {
                const result = await this.seedQuestion(roleId, roleKey, flashcard);
                questionsCreated++;
                choicesCreated += result.choicesCreated;
            } catch (error) {
                const errorMsg = `Failed to seed question ${flashcard.id}`;
                console.error(`  ✗ ${errorMsg}:`, error);
                errors.push(errorMsg);
            }
        }

        return { questionsCreated, choicesCreated, errors };
    }

    /**
     * Seed a single role with all its questions
     */
    static async seedRoleWithQuestions(roleData: RoleSeedData) {
        const roleKey = this.generateRoleKey(roleData.role);
        console.log(`\n📋 Processing role: ${roleData.role} (${roleKey})`);

        // Seed the role
        const role = await this.seedRole(roleData.role, roleData.focus);

        // Seed all questions for this role
        const result = await this.seedQuestionsForRole(
            role.id,
            roleKey,
            roleData.flashcards
        );

        return {
            role,
            roleCreated: !await prisma.role.findUnique({ where: { key: roleKey } }) ? 0 : 1,
            ...result,
        };
    }

    /**
     * Seeds roles and their associated questions from JSON data
     */
    static async seedRolesAndQuestions(seedData: RoleSeedData[]) {
        console.log("🌱 Starting seed process...");

        const results = {
            roles: 0,
            questions: 0,
            choices: 0,
            errors: [] as string[],
        };

        for (const roleData of seedData) {
            try {
                const roleResult = await this.seedRoleWithQuestions(roleData);

                results.roles += roleResult.roleCreated;
                results.questions += roleResult.questionsCreated;
                results.choices += roleResult.choicesCreated;
                results.errors.push(...roleResult.errors);
            } catch (error) {
                const errorMsg = `Failed to seed role: ${roleData.role}`;
                console.error(`\n✗ ${errorMsg}:`, error);
                results.errors.push(errorMsg);
            }
        }

        console.log("\n" + "=".repeat(50));
        console.log("🌱 Seed Summary:");
        console.log(`  Roles created: ${results.roles}`);
        console.log(`  Questions created/updated: ${results.questions}`);
        console.log(`  Choices created/updated: ${results.choices}`);

        if (results.errors.length > 0) {
            console.log(`\n⚠️  Errors encountered: ${results.errors.length}`);
            results.errors.forEach((err) => console.log(`  - ${err}`));
        } else {
            console.log("\n✅ Seed completed successfully!");
        }
        console.log("=".repeat(50));

        return results;
    }

    /**
     * Clear all seeded data (useful for testing)
     */
    static async clearAllData() {
        console.log("🗑️  Clearing all data...");

        await prisma.questionAttempt.deleteMany({});
        await prisma.practiceSession.deleteMany({});
        await prisma.choice.deleteMany({});
        await prisma.question.deleteMany({});
        await prisma.role.deleteMany({});

        console.log("✅ All data cleared!");
    }

    /**
     * Get statistics about seeded data
     */
    static async getStats() {
        const [roles, questions, choices] = await Promise.all([
            prisma.role.count(),
            prisma.question.count(),
            prisma.choice.count(),
        ]);

        const roleDetails = await prisma.role.findMany({
            include: {
                _count: {
                    select: { questions: true },
                },
            },
        });

        return {
            total: {
                roles,
                questions,
                choices,
            },
            roleDetails: roleDetails.map((role) => ({
                key: role.key,
                name: role.name,
                questionsCount: role._count.questions,
            })),
        };
    }
}