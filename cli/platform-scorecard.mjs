#!/usr/bin/env node
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const checks = [
  ['security', 'mfaForPrivilegedUsers', 6, 'Require MFA for all privileged users.'],
  ['security', 'centralizedAuditLogs', 6, 'Enable centralized, immutable audit logging.'],
  ['security', 'secretsManaged', 5, 'Store and rotate secrets with a managed secret service.'],
  ['reliability', 'multiAz', 6, 'Deploy critical services across at least two Availability Zones.'],
  ['reliability', 'backupsTested', 5, 'Test backup restoration and record the recovery time.'],
  ['reliability', 'autoscalingConfigured', 4, 'Configure and test workload autoscaling.'],
  ['cost', 'costAllocationTags', 5, 'Apply and activate cost allocation tags.'],
  ['cost', 'budgetsConfigured', 5, 'Create budgets with actionable alerts.'],
  ['cost', 'rightsizingReviewed', 4, 'Review resource requests and instance sizing regularly.'],
  ['observability', 'metricsAvailable', 5, 'Publish golden-signal metrics with service ownership.'],
  ['observability', 'centralizedLogs', 4, 'Centralize structured logs with retention policies.'],
  ['observability', 'tracesAvailable', 4, 'Instrument service boundaries with distributed tracing.'],
  ['developerExperience', 'selfServiceTemplates', 5, 'Provide documented self-service deployment templates.'],
  ['developerExperience', 'gitopsEnabled', 4, 'Use GitOps reconciliation for environment changes.'],
  ['developerExperience', 'runbooksCurrent', 3, 'Keep owner-tagged runbooks current and test them.']
];
const categoryNames = { security: 'Security', reliability: 'Reliability', cost: 'Cost', observability: 'Observability', developerExperience: 'Developer Experience' };

export function assess(evidence) {
  const categories = {};
  const recommendations = [];
  for (const [category, key, points, recommendation] of checks) {
    categories[category] ??= { earned: 0, possible: 0 };
    categories[category].possible += points;
    if (evidence?.[category]?.[key] === true) categories[category].earned += points;
    else recommendations.push({ category, check: key, points, recommendation });
  }
  const earned = Object.values(categories).reduce((sum, c) => sum + c.earned, 0);
  const possible = Object.values(categories).reduce((sum, c) => sum + c.possible, 0);
  return { score: Math.round((earned / possible) * 100), earned, possible, categories, recommendations: recommendations.sort((a, b) => b.points - a.points) };
}

function markdown(result) {
  const rows = Object.entries(result.categories).map(([key, value]) => `| ${categoryNames[key]} | ${value.earned}/${value.possible} |`).join('\n');
  const actions = result.recommendations.length ? result.recommendations.map((item, i) => `${i + 1}. **${categoryNames[item.category]}** (+${item.points}): ${item.recommendation}`).join('\n') : 'No gaps found in the supplied evidence.';
  return `# Platform Scorecard: ${result.score}/100\n\n| Category | Score |\n| --- | ---: |\n${rows}\n\n## Prioritized actions\n\n${actions}\n`;
}

async function main(args) {
  const [command, ...rest] = args;
  const inputIndex = rest.indexOf('--input');
  if (command !== 'assess' || inputIndex === -1 || !rest[inputIndex + 1]) throw new Error('Usage: platform-scorecard assess --input <evidence.json> [--format markdown|json]');
  const formatIndex = rest.indexOf('--format');
  const format = formatIndex === -1 ? 'markdown' : rest[formatIndex + 1];
  if (!['markdown', 'json'].includes(format)) throw new Error('--format must be markdown or json');
  const evidence = JSON.parse(await readFile(rest[inputIndex + 1], 'utf8'));
  const result = assess(evidence);
  process.stdout.write(format === 'json' ? `${JSON.stringify(result, null, 2)}\n` : markdown(result));
}
if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main(process.argv.slice(2)).catch(error => { console.error(`Error: ${error.message}`); process.exitCode = 1; });
}
