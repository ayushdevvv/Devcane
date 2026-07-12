export const DAILY_MESSAGE_LIMIT = 20;
export const DAILY_RESUME_LIMIT = 7;

const resetQuotaIfNeeded = (user) => {
  const now = new Date();
  const lastReset = new Date(user.quotaResetAt);

  const isNewDay =
    now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
    now.getUTCMonth() !== lastReset.getUTCMonth() ||
    now.getUTCDate() !== lastReset.getUTCDate();

  if (isNewDay) {
    user.messageCount = 0;
    user.resumeAnalysisCount = 0;
    user.quotaResetAt = now;
  }

  return now;
};

const getNextReset = (now) =>
  new Date(
    Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate() + 1,
      0,
      0,
      0
    )
  );

/* ---------------- CHAT ---------------- */

export const checkAndConsumeQuota = async (user) => {
  const now = resetQuotaIfNeeded(user);
  const nextReset = getNextReset(now);

  if (user.messageCount >= DAILY_MESSAGE_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: DAILY_MESSAGE_LIMIT,
      resetAt: nextReset,
    };
  }

  user.messageCount += 1;
  await user.save();

  return {
    allowed: true,
    remaining: DAILY_MESSAGE_LIMIT - user.messageCount,
    limit: DAILY_MESSAGE_LIMIT,
    resetAt: nextReset,
  };
};

export const getQuotaStatus = (user) => {
  const now = new Date();
  const lastReset = new Date(user.quotaResetAt);

  const isNewDay =
    now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
    now.getUTCMonth() !== lastReset.getUTCMonth() ||
    now.getUTCDate() !== lastReset.getUTCDate();

  const used = isNewDay ? 0 : user.messageCount;

  return {
    used,
    remaining: Math.max(DAILY_MESSAGE_LIMIT - used, 0),
    limit: DAILY_MESSAGE_LIMIT,
    resetAt: getNextReset(now),
  };
};

/* ---------------- RESUME ---------------- */

export const checkAndConsumeResumeQuota = async (user) => {
  const now = resetQuotaIfNeeded(user);
  const nextReset = getNextReset(now);

  if (user.resumeAnalysisCount >= DAILY_RESUME_LIMIT) {
    return {
      allowed: false,
      remaining: 0,
      limit: DAILY_RESUME_LIMIT,
      resetAt: nextReset,
    };
  }

  user.resumeAnalysisCount += 1;
  await user.save();

  return {
    allowed: true,
    remaining: DAILY_RESUME_LIMIT - user.resumeAnalysisCount,
    limit: DAILY_RESUME_LIMIT,
    resetAt: nextReset,
  };
};

export const getResumeQuotaStatus = (user) => {
  const now = new Date();
  const lastReset = new Date(user.quotaResetAt);

  const isNewDay =
    now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
    now.getUTCMonth() !== lastReset.getUTCMonth() ||
    now.getUTCDate() !== lastReset.getUTCDate();

  const used = isNewDay ? 0 : user.resumeAnalysisCount;

  return {
    used,
    remaining: Math.max(DAILY_RESUME_LIMIT - used, 0),
    limit: DAILY_RESUME_LIMIT,
    resetAt: getNextReset(now),
  };
};