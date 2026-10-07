/**
 * Country code mapping for nationalities commonly appearing in F1 constructors.
 * Returns ISO 3166-1 alpha-2 lower-case country codes for FlagCDN SVGs,
 * plus emoji flag fallback.
 */
const NATIONALITY_FLAG_MAP = {
  british: { code: 'gb', name: 'United Kingdom', emoji: '🇬🇧' },
  italian: { code: 'it', name: 'Italy', emoji: '🇮🇹' },
  german: { code: 'de', name: 'Germany', emoji: '🇩🇪' },
  french: { code: 'fr', name: 'France', emoji: '🇫🇷' },
  austrian: { code: 'at', name: 'Austria', emoji: '🇦🇹' },
  swiss: { code: 'ch', name: 'Switzerland', emoji: '🇨🇭' },
  american: { code: 'us', name: 'United States', emoji: '🇺🇸' },
  japanese: { code: 'jp', name: 'Japan', emoji: '🇯🇵' },
  dutch: { code: 'nl', name: 'Netherlands', emoji: '🇳🇱' },
  spanish: { code: 'es', name: 'Spain', emoji: '🇪🇸' },
  canadian: { code: 'ca', name: 'Canada', emoji: '🇨🇦' },
  australian: { code: 'au', name: 'Australia', emoji: '🇦🇺' },
  brazilian: { code: 'br', name: 'Brazil', emoji: '🇧🇷' },
  mexican: { code: 'mx', name: 'Mexico', emoji: '🇲🇽' },
  monacan: { code: 'mc', name: 'Monaco', emoji: '🇲🇨' },
  finnish: { code: 'fi', name: 'Finland', emoji: '🇫🇮' },
  danish: { code: 'dk', name: 'Denmark', emoji: '🇩🇰' },
  swedish: { code: 'se', name: 'Sweden', emoji: '🇸🇪' },
  irish: { code: 'ie', name: 'Ireland', emoji: '🇮🇪' },
  belgian: { code: 'be', name: 'Belgium', emoji: '🇧🇪' },
  southafrican: { code: 'za', name: 'South Africa', emoji: '🇿🇦' },
  newzealander: { code: 'nz', name: 'New Zealand', emoji: '🇳🇿' },
  russian: { code: 'ru', name: 'Russia', emoji: '🇷🇺' },
  indian: { code: 'in', name: 'India', emoji: '🇮🇳' },
  malaysian: { code: 'my', name: 'Malaysia', emoji: '🇲🇾' },
};

/**
 * Known official constructor brand badges & car livery colors for F1 constructors.
 */
const CONSTRUCTOR_ASSETS = {
  ferrari: {
    color: '#E80020',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/ferrari-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/ferrari.png',
  },
  mclaren: {
    color: '#FF8000',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mclaren-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mclaren.png',
  },
  mercedes: {
    color: '#27F4D2',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/mercedes-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/mercedes.png',
  },
  red_bull: {
    color: '#3671C6',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/red-bull-racing-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/red-bull-racing.png',
  },
  aston_martin: {
    color: '#229971',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/aston-martin-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/aston-martin.png',
  },
  alpine: {
    color: '#FF87BC',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/alpine-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/alpine.png',
  },
  williams: {
    color: '#64C4FF',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/williams-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/williams.png',
  },
  haas: {
    color: '#B6BABD',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/haas-f1-team-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/haas-f1-team.png',
  },
  sauber: {
    color: '#52E252',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/kick-sauber-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/kick-sauber.png',
  },
  rb: {
    color: '#6692FF',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2024/rb-logo.png',
    car: 'https://media.formula1.com/d_team_car_fallback_image.png/content/dam/fom-website/teams/2024/rb.png',
  },
  alfa: {
    color: '#C92D4B',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2023/alfa-romeo-logo.png',
    car: null,
  },
  alphatauri: {
    color: '#5E8FAA',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2023/alphatauri-logo.png',
    car: null,
  },
  renault: {
    color: '#FFF500',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2020/renault-logo.png',
    car: null,
  },
  racing_point: {
    color: '#F596C8',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2020/racing-point-logo.png',
    car: null,
  },
  toro_rosso: {
    color: '#469BFF',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2019/toro-rosso-logo.png',
    car: null,
  },
  force_india: {
    color: '#FF8032',
    badge: 'https://media.formula1.com/content/dam/fom-website/teams/2018/force-india-logo.png',
    car: null,
  },
  lotus_f1: {
    color: '#E5C460',
    badge: null,
    car: null,
  },
  benetton: {
    color: '#00A859',
    badge: null,
    car: null,
  },
  tyrrell: {
    color: '#002B7F',
    badge: null,
    car: null,
  },
  brabham: {
    color: '#004225',
    badge: null,
    car: null,
  },
};

/**
 * Resolves flag URL (FlagCDN SVG) and emoji fallback for any constructor nationality.
 * @param {string} nationality
 * @returns {{ code: string|null, url: string|null, emoji: string, name: string }}
 */
export function getNationalityFlag(nationality = '') {
  const normalized = String(nationality).trim().toLowerCase().replace(/[\s-_]/g, '');
  const entry = NATIONALITY_FLAG_MAP[normalized];

  if (entry) {
    return {
      code: entry.code,
      url: `https://flagcdn.com/w80/${entry.code}.png`,
      emoji: entry.emoji,
      name: entry.name,
    };
  }

  return {
    code: null,
    url: null,
    emoji: '🏁',
    name: nationality || 'International',
  };
}

/**
 * Resolves constructor visual metadata (primary brand color, logo URL, car visual).
 * @param {string} constructorId
 * @returns {{ color: string, badge: string|null, car: string|null }}
 */
export function getConstructorVisuals(constructorId = '') {
  const normalized = String(constructorId).trim().toLowerCase();
  const direct = CONSTRUCTOR_ASSETS[normalized];

  if (direct) {
    return direct;
  }

  // Fallback hash-based color palette to keep consistent team coloring
  const PALETTE = [
    '#e10600', '#00d2ff', '#ffb800', '#10b981', '#8b5cf6',
    '#ec4899', '#f97316', '#06b6d4', '#6366f1', '#14b8a6',
  ];
  let hash = 0;
  for (let i = 0; i < normalized.length; i++) {
    hash = (hash << 5) - hash + normalized.charCodeAt(i);
    hash |= 0;
  }
  const color = PALETTE[Math.abs(hash) % PALETTE.length];

  return {
    color,
    badge: null,
    car: null,
  };
}
