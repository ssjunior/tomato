import { format, isToday as today, parseISO } from "date-fns";
import { differenceInCalendarDays, formatDistanceToNow } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

import { DATE_LOCALES } from "../constants";

export const toDate = (dateVar) => {
  if (!dateVar) return dateVar;

  let date;
  if (typeof dateVar === "string") {
    date = parseISO(dateVar);
  } else {
    date = dateVar;
  }
  return date;
};

export const toTimestamp = (dateVar) => {
  let date;
  if (typeof dateVar === "string") {
    date = parseISO(dateVar);
  } else {
    date = dateVar;
  }
  return date.getTime();
};

export const isToday = (dateVar) => {
  let date;
  if (typeof dateVar === "string") {
    date = parseISO(dateVar);
  } else {
    date = dateVar;
  }
  return today(date);
};

export const daysDifference = (dateVar) => {
  let date;
  let now = new Date();
  if (typeof dateVar === "string") {
    date = parseISO(dateVar);
  } else {
    date = dateVar;
  }
  return differenceInCalendarDays(date, now);
};

export const normalizeDate = (dateVar, locale, tz) => {
  let date;
  let zonedDate;

  if (typeof dateVar === "string") {
    date = parseISO(dateVar);
    zonedDate = utcToZonedTime(date, tz);
  } else {
    zonedDate = dateVar;
  }

  return zonedDate;
};

export const formatDate = (dateVar, locale = "pt-BR", tz = "UTC") => {
  let zonedDate = dateVar;

  if (typeof dateVar === "string") {
    zonedDate = utcToZonedTime(parseISO(dateVar), tz);
  }

  // 04/15/2020
  const date = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "P", {
      locale: DATE_LOCALES[locale]
    });
  };

  // 04/15/2020
  const dateHour = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "P, h:mma", {
      locale: DATE_LOCALES[locale]
    });
  };

  // Apr 15, 2020
  const friendlyDate = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "PP", {
      locale: DATE_LOCALES[locale]
    });
  };

  // Apr 15, 2020, sunday
  const fullFriendlyDate = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "PP, EEEE", {
      locale: DATE_LOCALES[locale]
    });
  };

  // Apr 15, 2020, sunday 22:30pm
  const fullFriendlyDateTime = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "PP, EEEE, H:mm", {
      locale: DATE_LOCALES[locale]
    });
  };

  // 04/15/2020 22:30
  const datetime = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "P H:mm", {
      locale: DATE_LOCALES[locale]
    });
  };

  // 22:32
  const hour = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "H:mm", {
      locale: DATE_LOCALES[locale]
    });
  };

  // 10:32 PM
  const p = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "p", {
      locale: DATE_LOCALES[locale]
    });
  };

  // 10:32:01 PM
  const pp = () => {
    if (!zonedDate) return null;
    return format(zonedDate, "pp", {
      locale: DATE_LOCALES[locale]
    });
  };

  // less than a minute ago
  const distance = () => {
    if (!zonedDate) return null;
    return formatDistanceToNow(zonedDate, {
      locale: DATE_LOCALES[locale],
      addSuffix: true
    });
  };

  // 20200415
  const forOrder = () => {
    if (!zonedDate) return null;
    return format(
      typeof dateVar === "string" ? parseISO(dateVar) : dateVar,
      "yyyyLLdd"
    );
  };

  return {
    date,
    dateHour,
    datetime,
    distance,
    friendlyDate,
    fullFriendlyDate,
    fullFriendlyDateTime,
    hour,
    forOrder,
    p,
    pp
  };
};
