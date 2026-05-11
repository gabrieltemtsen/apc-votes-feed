export type PartyId = 'APC' | 'PDP' | 'LP' | 'NNPP'

export interface PartyConfig {
  id: PartyId
  name: string
  shortName: string
  candidate: string
  runningMate: string
  color: string
  lightColor: string
  darkColor: string
  textOnColor: string
}

export const PARTIES: Record<PartyId, PartyConfig> = {
  APC: {
    id: 'APC',
    name: 'All Progressives Congress',
    shortName: 'APC',
    candidate: 'Bola Ahmed Tinubu',
    runningMate: 'Kashim Shettima',
    color: '#0AA83F',
    lightColor: '#e6f7ed',
    darkColor: '#077a2d',
    textOnColor: '#ffffff',
  },
  PDP: {
    id: 'PDP',
    name: 'Peoples Democratic Party',
    shortName: 'PDP',
    candidate: 'Atiku Abubakar',
    runningMate: 'Ifeanyi Okowa',
    color: '#CC0000',
    lightColor: '#fff0f0',
    darkColor: '#990000',
    textOnColor: '#ffffff',
  },
  LP: {
    id: 'LP',
    name: 'Labour Party',
    shortName: 'LP',
    candidate: 'Peter Obi',
    runningMate: 'Yusuf Datti Baba-Ahmed',
    color: '#00843D',
    lightColor: '#e6f4ee',
    darkColor: '#005c2b',
    textOnColor: '#ffffff',
  },
  NNPP: {
    id: 'NNPP',
    name: 'New Nigeria Peoples Party',
    shortName: 'NNPP',
    candidate: 'Rabiu Musa Kwankwaso',
    runningMate: 'Isaac Idahosa',
    color: '#003F7F',
    lightColor: '#e6edf7',
    darkColor: '#002d5c',
    textOnColor: '#ffffff',
  },
}

export const PARTY_LIST: PartyConfig[] = Object.values(PARTIES)

export function getPartyColor(partyId: PartyId): string {
  return PARTIES[partyId]?.color ?? '#6b7280'
}

export function getPartyLightColor(partyId: PartyId): string {
  return PARTIES[partyId]?.lightColor ?? '#f3f4f6'
}

export function getLeadingParty(votes: Record<PartyId, number>): PartyId {
  let max = 0
  let leader: PartyId = 'APC'
  for (const [party, count] of Object.entries(votes) as [PartyId, number][]) {
    if (count > max) {
      max = count
      leader = party
    }
  }
  return leader
}
