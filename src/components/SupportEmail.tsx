import { site } from '@/config/site';
import type { Dictionary } from '@/i18n/get-dictionary';
import { Missing } from './Missing';

export function SupportEmail({ t }: { t: Dictionary }) {
  return site.supportEmail ? (
    <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>
  ) : (
    <Missing label={t.common.missing}>SUPPORT_EMAIL</Missing>
  );
}
