
export const DAILY_MESSAGE_LIMIT = 20;


export const checkAndConsumeQuota = async (user) => {
  const now = new Date();

  const lastReset = new Date(user.quotaResetAt);
  const isNewDay =
    now.getUTCFullYear() !== lastReset.getUTCFullYear() ||
    now.getUTCMonth() !== lastReset.getUTCMonth() ||
    now.getUTCDate() !== lastReset.getUTCDate();

  if (isNewDay) {
    user.messageCount = 0;
    user.quotaResetAt = now;
  }


  const nextReset = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)
  );

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
  const nextReset = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0)
  );

  return {
    used,
    remaining: Math.max(DAILY_MESSAGE_LIMIT - used, 0),
    limit: DAILY_MESSAGE_LIMIT,
    resetAt: nextReset,
  };
};