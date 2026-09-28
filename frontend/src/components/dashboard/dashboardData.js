/**
 * Utility to process report data into SIF-precursor dashboard metrics.
 */

export function calculateDashboardMetrics(records = []) {
  if (!records || records.length === 0) {
    return {
      totalReports: 0,
      sifPrecursorCount: 0,
      precursorRate: 0,
      siteRankings: [],
      activityRankings: [],
      ruleDistribution: {},
    };
  }

  let totalReports = records.length;
  let sifPrecursorCount = 0;
  const siteMap = {};
  const activityMap = {};
  const ruleDistribution = {};

  records.forEach((row) => {
    // Normalise SIF-potential detection
    const isSif =
      row.is_sif === true ||
      row.is_sif === 'true' ||
      row.is_sif === 1 ||
      row.is_sif === '1' ||
      row.sif_potential === true ||
      row.sif_potential === 'true' ||
      row.sif_potential === 1 ||
      row.sif_potential === '1' ||
      row.severity === 'Fatal' ||
      row.severity === 'High';

    if (isSif) {
      sifPrecursorCount += 1;
    }

    // Site aggregation
    const site = row.site || row.location || 'Unknown Rig/Location';
    if (!siteMap[site]) {
      siteMap[site] = { site, total: 0, sifCount: 0 };
    }
    siteMap[site].total += 1;
    if (isSif) siteMap[site].sifCount += 1;

    // Activity aggregation
    const activity = row.activity || row.operation_type || 'Unspecified Operation';
    if (!activityMap[activity]) {
      activityMap[activity] = { activity, total: 0, sifCount: 0 };
    }
    activityMap[activity].total += 1;
    if (isSif) activityMap[activity].sifCount += 1;

    // IOGP rule aggregation
    const rule = row.iogp_rule || row.iogp_life_saving_rule || 'None';
    ruleDistribution[rule] = (ruleDistribution[rule] || 0) + 1;
  });

  // Calculate density rates & rank
  const siteRankings = Object.values(siteMap)
    .map((s) => ({
      ...s,
      densityRate: Number(((s.sifCount / s.total) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.sifCount - a.sifCount || b.densityRate - a.densityRate);

  const activityRankings = Object.values(activityMap)
    .map((a) => ({
      ...a,
      densityRate: Number(((a.sifCount / a.total) * 100).toFixed(1)),
    }))
    .sort((a, b) => b.sifCount - a.sifCount || b.densityRate - a.densityRate);

  const precursorRate = Number(((sifPrecursorCount / totalReports) * 100).toFixed(1));

  return {
    totalReports,
    sifPrecursorCount,
    precursorRate,
    siteRankings,
    activityRankings,
    ruleDistribution,
  };
}