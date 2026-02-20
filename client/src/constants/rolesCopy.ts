import type { Role } from "../types/Role";

export const rolesCopy: { role: Role; label: string; description: string }[] = [
  {
    role: "SCRUM_PRODUCT_OWNER",
    label:
      "Scrum Product Owner - Backlog management, maximizing value, stakeholder management",
    description:
      "Acts as the bridge between business stakeholders and the development team, ensuring the product vision is clearly defined and the backlog is prioritized for maximum impact.",
  },
  {
    role: "SCRUM_MASTER",
    label: "Scrum Master - Servant leadership, coaching, removing impediments",
    description:
      "A dedicated facilitator who fosters an agile environment by coaching the team, removing daily blockers, and ensuring smooth, sustainable delivery cycles.",
  },
  {
    role: "UIUX_DESIGNER",
    label: "UI/UX Designer - Accessibility, responsiveness, design thinking",
    description:
      "Crafts intuitive and inclusive digital experiences by merging user-centered research with aesthetic design principles to ensure products are both beautiful and functional.",
  },
  {
    role: "WEB_DEVELOPER",
    label: "Web Developer - Web fundamentals, data structures and algorithms",
    description:
      "Engineers the backbone of the modern web, combining core technologies like HTML, CSS, and JavaScript with efficient logic to build high-performance applications.",
  },
  {
    role: "PYTHON_DEVELOPER",
    label: "Python Developer - Python syntax, data structures and algorithms",
    description:
      "Develops robust backend systems and data-driven solutions using clean, scalable Python code to solve complex architectural challenges and automate workflows.",
  },
];
