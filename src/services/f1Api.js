/**
 * Jolpica F1 API Service Layer
 * Ergast-compatible open API for Formula 1 Constructors, Drivers, and Standings.
 * Documentation: https://api.jolpi.ca/
 */

const BASE_URL = 'https://api.jolpi.ca/ergast/f1';

/**
 * Fetches a list of F1 constructors.
 * @param {number} limit Number of constructors to retrieve (default: 45)
 * @returns {Promise<Array<{constructorId: string, name: string, nationality: string, url: string}>>}
 */
export async function fetchConstructors(limit = 45) {
  const url = `${BASE_URL}/constructors.json?limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch constructors (Status: ${response.status})`);
    }

    const data = await response.json();
    const constructors = data?.MRData?.ConstructorTable?.Constructors;

    if (!Array.isArray(constructors)) {
      throw new Error('Invalid constructor data received from API');
    }

    return constructors;
  } catch (error) {
    console.error('Error fetching constructors:', error);
    throw error;
  }
}

/**
 * Fetches notable drivers associated with a specific constructor.
 * @param {string} constructorId F1 constructor unique identifier (e.g. 'ferrari', 'mclaren')
 * @param {number} limit Maximum drivers to return (default: 8)
 * @returns {Promise<{drivers: Array, total: number}>}
 */
export async function fetchConstructorDrivers(constructorId, limit = 8) {
  if (!constructorId) {
    return { drivers: [], total: 0 };
  }

  const url = `${BASE_URL}/constructors/${encodeURIComponent(constructorId)}/drivers.json?limit=${limit}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch drivers for ${constructorId} (Status: ${response.status})`);
    }

    const data = await response.json();
    const drivers = data?.MRData?.DriverTable?.Drivers || [];
    const total = parseInt(data?.MRData?.total, 10) || drivers.length;

    return { drivers, total };
  } catch (error) {
    console.error(`Error fetching drivers for ${constructorId}:`, error);
    return { drivers: [], total: 0 };
  }
}

/**
 * Fetches the current season standings for a specific constructor.
 * Returns null if the constructor is not competing in the active season (historic team).
 * @param {string} constructorId
 * @returns {Promise<{position: string, points: string, wins: string, season: string} | null>}
 */
export async function fetchConstructorStandings(constructorId) {
  if (!constructorId) return null;

  const url = `${BASE_URL}/current/constructors/${encodeURIComponent(constructorId)}/constructorStandings.json`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const standingsList = data?.MRData?.StandingsTable?.StandingsLists?.[0];
    const standing = standingsList?.ConstructorStandings?.[0];

    if (!standing) {
      return null;
    }

    return {
      season: standingsList.season || 'Current',
      position: standing.position || '-',
      points: standing.points || '0',
      wins: standing.wins || '0',
    };
  } catch (error) {
    console.warn(`Standing not available for ${constructorId}:`, error);
    return null;
  }
}

/**
 * Fetches comprehensive detail enrichment (drivers + current standings) for a constructor.
 * @param {string} constructorId
 * @returns {Promise<{drivers: Array, totalDrivers: number, currentStanding: object | null}>}
 */
export async function fetchConstructorDetails(constructorId) {
  const [driversResult, standingsResult] = await Promise.allSettled([
    fetchConstructorDrivers(constructorId, 8),
    fetchConstructorStandings(constructorId),
  ]);

  const driversData = driversResult.status === 'fulfilled' ? driversResult.value : { drivers: [], total: 0 };
  const currentStanding = standingsResult.status === 'fulfilled' ? standingsResult.value : null;

  return {
    drivers: driversData.drivers,
    totalDrivers: driversData.total,
    currentStanding,
  };
}
