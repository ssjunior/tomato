const OPTIONS = {
  0: { id: "ALL", label: "All" },
  2: { id: "EVENT", label: "Events" },
  3: { id: "FLOW", label: "Automations" },
  4: { id: "KANBAN", label: "Boards" },
  5: { id: "CAMPAIGN", label: "Campaigns" },
  6: { id: "TRANSACTIONAL", label: "Transactional" },
  7: { id: "CMS", label: "CMS" },
  8: { id: "BI", label: "BI" },
  9: { id: "CONVERSATION", label: "Conversations" },
  10: { id: "ECOMMERCE", label: "Ecommerce" },
  11: { id: "BOT", label: "Bots" },
  12: { id: "ATTRIBUTION", label: "Attribution" },
};

export const MODULE = {
  0: "ALL",
  1: "PROFILE",
  2: "EVENT",
  3: "FLOW",
  4: "KANBAN",
  5: "CAMPAIGN",
  6: "TRANSACTIONAL",
  7: "CMS",
  8: "BI",
  9: "CONVERSATION",
  10: "ECOMMERCE",
  11: "BOT",
  12: "ATTRIBUTION",
};

// 10: "CONFIG",
// 9: "AGENCY",

export const MODULES = {
  PROFILE: {
    id: 1,
    label: "Profiles",
    icon: "User",
  },
  EVENT: {
    id: 2,
    label: "Events",
    icon: "Automation",
  },
  FLOW: {
    id: 3,
    label: "Flows",
    icon: "Automation",
  },
  KANBAN: {
    id: 4,
    label: "Kanban",
    icon: "Board",
  },
  CAMPAIGN: {
    id: 5,
    label: "Campaign",
    icon: "Email",
  },
  TRANSACTIONAL: {
    id: 6,
    label: "Transactional",
    icon: "Email",
  },
  CMS: {
    id: 7,
    label: "CMS",
    icon: "Graph",
  },
  BI: {
    id: 8,
    label: "BI",
    icon: "Graph",
  },
  CONVERSATION: {
    id: 9,
    label: "Conversation",
    icon: "MessageCircle",
  },
  ECOMMERCE: {
    id: 10,
    label: "Ecommerce",
    icon: "Cart",
  },
  BOT: {
    id: 11,
    label: "Bots",
    icon: "Email",
  },
  ATTRIBUTION: {
    id: 12,
    label: "Attribution",
    icon: "Email",
  },
};

// AGENCY: 9,
// CONFIG: 10,

const ROUTES = {
  1: {
    id: "contact",
    label: "Contacts",
    linkTo: "/",
    icon: "User",
  },
  2: {
    id: "company",
    label: "Companies",
    linkTo: "/company",
    icon: "Company",
  },
  3: {
    id: "segment",
    label: "Audiences",
    linkTo: "/audience",
    icon: "Filter",
  },

  4: {
    id: "source",
    label: "Sources",
    linkTo: "/source",
    icon: "User",
  },
  5: {
    id: "eventName",
    label: "Event name",
    linkTo: "/eventName",
    icon: "User",
  },
  6: {
    id: "rte",
    label: "Real time events",
    linkTo: "/rte",
    icon: "User",
  },
  7: {
    id: "board",
    label: "Boards",
    linkTo: "/board",
    icon: "Board",
  },
  8: {
    id: "flow",
    label: "Flows",
    linkTo: "/flow",
    icon: "Automation",
  },
  9: {
    id: "dashboard",
    label: "Reports",
    linkTo: "/",
    icon: "Cart",
  },

  10: {
    id: "maildocker",
    label: "Servers",
    linkTo: "/server",
    icon: "Email",
  },
  11: {
    id: "bots",
    label: "Bots",
    linkTo: "/bots",
    icon: "User",
  },
  12: {
    id: "bi",
    label: "BI",
    linkTo: "/bi",
    icon: "Graph",
  },
  13: {
    id: "campaign",
    label: "Campaign",
    linkTo: "/campaign",
    icon: "Email",
  },
  14: {
    id: "alert",
    label: "Alerts",
    linkTo: "/alert",
    icon: "User",
  },
  15: {
    id: "campaign",
    label: "Milestone",
    linkTo: "/milestone",
    icon: "User",
  },
};

export const getModules = (ACTIVE) => {
  const options = [];
  // let routes = {};

  Object.keys(ACTIVE).forEach((optionId) => {
    const option = { ...OPTIONS[optionId] };
    const modules = [];

    ACTIVE[optionId].forEach((module) => {
      Object.keys(module).forEach((moduleId) => {
        const optionModule = { ...MODULES[MODULE[moduleId]] };
        const itemsIds = module[moduleId];
        const childrens = itemsIds.map((id) => ROUTES[id]);
        optionModule.childrens = childrens;
        modules.push(optionModule);
      });
    });
    option.modules = modules;
    options.push(option);
  });

  return options;
};
