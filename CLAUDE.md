# abapkids – Project Notes

## Stack
- Next.js 14 (App Router) + TypeScript + Tailwind CSS
- Supabase (Postgres) for form storage
- Nodemailer + Gmail SMTP for email delivery
- Deploy target: Vercel → abap.makotechs.com

---

## Lessons Learned

### 1. next.config.ts is not supported in Next.js 14.2
**Problem:** `npm run build` failed with:
> Configuring Next.js via 'next.config.ts' is not supported. Please replace the file with 'next.config.js' or 'next.config.mjs'.

**Fix:** Renamed `next.config.ts` → `next.config.mjs` and replaced TypeScript syntax (`import type { NextConfig }`) with plain JS JSDoc comment.

---

### 2. TypeScript strict comparison: `string | null` vs `boolean`
**Problem:** Build failed with:
> This comparison appears to be unintentional because the types 'string | null | undefined' and 'boolean' have no overlap.

The `row()` helper in `app/api/submit/route.ts` had `value !== false` guarding a `string | null | undefined` parameter — TypeScript (strict mode) correctly flags this as impossible.

**Fix:** Removed the `value !== false` check since the parameter type can never be `false`.
