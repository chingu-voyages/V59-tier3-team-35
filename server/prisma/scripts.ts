import data from "./dumps/data.json";
import { SeedService } from "./seed";

const seedDB = async () => {
    // Seed everything (same as before)
    await SeedService.seedRolesAndQuestions(data);

    // Seed just one role
    // await SeedService.seedRole("Scrum Master", "Servant leadership");

    // Seed one role with all its questions
    // await SeedService.seedRoleWithQuestions({
    //     role: "Python Developer",
    //     focus: "Python + DSA",
    //     flashcards: [...]
    // });

    // Seed a single question
    // const role = await prisma.role.findUnique({ where: { key: "SCRUM_MASTER" } });
    // await SeedService.seedQuestion(role.id, "SCRUM_MASTER", flashcardData);
}
seedDB()