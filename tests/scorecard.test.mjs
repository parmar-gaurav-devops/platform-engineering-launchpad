import test from 'node:test';
import assert from 'node:assert/strict';
import { assess } from '../cli/platform-scorecard.mjs';

test('a fully evidenced platform scores 100', () => {
  const evidence = { security: {}, reliability: {}, cost: {}, observability: {}, developerExperience: {} };
  for (const [category, key] of [['security','mfaForPrivilegedUsers'],['security','centralizedAuditLogs'],['security','secretsManaged'],['reliability','multiAz'],['reliability','backupsTested'],['reliability','autoscalingConfigured'],['cost','costAllocationTags'],['cost','budgetsConfigured'],['cost','rightsizingReviewed'],['observability','metricsAvailable'],['observability','centralizedLogs'],['observability','tracesAvailable'],['developerExperience','selfServiceTemplates'],['developerExperience','gitopsEnabled'],['developerExperience','runbooksCurrent']]) evidence[category][key] = true;
  assert.equal(assess(evidence).score, 100);
});

test('missing evidence produces prioritized recommendations', () => {
  const result = assess({});
  assert.equal(result.score, 0);
  assert.ok(result.recommendations[0].points >= result.recommendations.at(-1).points);
});
