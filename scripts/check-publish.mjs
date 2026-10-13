// Lists what must be filled in before publishing (see src/config/site.ts).
// `npm run build` only warns; `npm run check:publish` exits 1 on any required gap.
import { existsSync } from 'node:fs';

for (const f of ['.env', '.env.production', '.env.local', '.env.production.local']) {
  if (existsSync(f)) process.loadEnvFile(f);
}
const { site, missingItems, optionalItems } = await import('../src/config/site.ts');

const items = missingItems();
if (site.stores.appStore) {
  for (const l of ['vi', 'en', 'zh']) {
    const f = `public/badges/app-store-${l}.svg`;
    if (!existsSync(f)) items.push(`${f} (official "Download on the App Store" badge from Apple Marketing Tools)`);
  }
}
const required = items.filter((i) => !optionalItems.some((o) => i.startsWith(o)));
const optional = items.filter((i) => !required.includes(i));
const strict = process.argv.includes('--strict');

if (required.length) {
  console.warn(`\n⚠  ${required.length} item(s) must be filled in before publishing:`);
  for (const i of required) console.warn(`   - ${i}`);
}
if (optional.length) {
  console.warn(`\nℹ  Optional, with a fallback on the site:`);
  for (const i of optional) console.warn(`   - ${i}`);
}
if (!items.length) console.log('✓ Publish checklist complete.');
console.warn('');
if (strict && required.length) process.exit(1);
