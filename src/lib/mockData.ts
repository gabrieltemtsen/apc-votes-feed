import { PartyId, getLeadingParty } from './partyConfig'

export type ZoneName =
  | 'North Central'
  | 'North East'
  | 'North West'
  | 'South East'
  | 'South South'
  | 'South West'

export interface PartyVotes {
  APC: number
  PDP: number
  LP: number
  NNPP: number
}

export interface StateData {
  id: string
  name: string
  code: string
  zone: ZoneName
  totalPUs: number
  reportingPUs: number
  registeredVoters: number
  accreditedVoters: number
  votes: PartyVotes
  validVotes: number
  rejectedBallots: number
  lastUpdated: Date
}

export interface ZoneData {
  name: ZoneName
  states: string[]
  votes: PartyVotes
  totalPUs: number
  reportingPUs: number
  registeredVoters: number
}

export interface LiveFeedEntry {
  id: string
  stateName: string
  lgaName: string
  wardName: string
  puName: string
  puCode: string
  votes: PartyVotes
  winner: PartyId
  verifiedAt: Date
  agentName: string
  status: 'verified' | 'pending' | 'rejected'
}

export interface MockAgent {
  id: string
  name: string
  email: string
  phone: string
  party: PartyId
  state: string
  lga: string
  assignedPUs: string[]
  submittedCount: number
  pendingCount: number
  status: 'active' | 'suspended' | 'pending_approval'
  joinedAt: Date
}

export interface PendingSubmission {
  id: string
  puName: string
  puCode: string
  state: string
  lga: string
  ward: string
  agentName: string
  votes: PartyVotes
  submittedAt: Date
  photoCount: number
  party: PartyId
  flagged: boolean
}

// ─── All 37 Nigerian States ──────────────────────────────────────────────────

const now = new Date()
const ago = (minutes: number) => new Date(now.getTime() - minutes * 60 * 1000)

export const STATES: StateData[] = [
  // ── North Central ──────────────────────────────────────────────────────────
  {
    id: 'benue', name: 'Benue', code: 'BN', zone: 'North Central',
    totalPUs: 8847, reportingPUs: 7234, registeredVoters: 1812345, accreditedVoters: 836721,
    votes: { APC: 127420, PDP: 289340, LP: 87210, NNPP: 11890 },
    validVotes: 515860, rejectedBallots: 14320, lastUpdated: ago(12),
  },
  {
    id: 'fct', name: 'FCT Abuja', code: 'FC', zone: 'North Central',
    totalPUs: 3003, reportingPUs: 2984, registeredVoters: 1033348, accreditedVoters: 476210,
    votes: { APC: 90902, PDP: 74194, LP: 152224, NNPP: 14989 },
    validVotes: 332309, rejectedBallots: 9820, lastUpdated: ago(3),
  },
  {
    id: 'kogi', name: 'Kogi', code: 'KG', zone: 'North Central',
    totalPUs: 4020, reportingPUs: 3901, registeredVoters: 1376745, accreditedVoters: 488310,
    votes: { APC: 245670, PDP: 89450, LP: 43120, NNPP: 6780 },
    validVotes: 385020, rejectedBallots: 8940, lastUpdated: ago(8),
  },
  {
    id: 'kwara', name: 'Kwara', code: 'KW', zone: 'North Central',
    totalPUs: 3614, reportingPUs: 3210, registeredVoters: 1130290, accreditedVoters: 451280,
    votes: { APC: 178430, PDP: 97340, LP: 31240, NNPP: 9120 },
    validVotes: 316130, rejectedBallots: 7420, lastUpdated: ago(15),
  },
  {
    id: 'nasarawa', name: 'Nasarawa', code: 'NA', zone: 'North Central',
    totalPUs: 4143, reportingPUs: 3678, registeredVoters: 1234560, accreditedVoters: 498340,
    votes: { APC: 168340, PDP: 124210, LP: 38450, NNPP: 6230 },
    validVotes: 337230, rejectedBallots: 9870, lastUpdated: ago(21),
  },
  {
    id: 'niger', name: 'Niger', code: 'NI', zone: 'North Central',
    totalPUs: 9669, reportingPUs: 8234, registeredVoters: 2538234, accreditedVoters: 845670,
    votes: { APC: 298340, PDP: 167240, LP: 45230, NNPP: 11230 },
    validVotes: 522040, rejectedBallots: 14320, lastUpdated: ago(9),
  },
  {
    id: 'plateau', name: 'Plateau', code: 'PL', zone: 'North Central',
    totalPUs: 5562, reportingPUs: 4891, registeredVoters: 1852480, accreditedVoters: 634120,
    votes: { APC: 198450, PDP: 134230, LP: 176340, NNPP: 9120 },
    validVotes: 518140, rejectedBallots: 12430, lastUpdated: ago(6),
  },
  // ── North East ─────────────────────────────────────────────────────────────
  {
    id: 'adamawa', name: 'Adamawa', code: 'AD', zone: 'North East',
    totalPUs: 4116, reportingPUs: 3542, registeredVoters: 1520890, accreditedVoters: 487320,
    votes: { APC: 156230, PDP: 198450, LP: 34120, NNPP: 12340 },
    validVotes: 401140, rejectedBallots: 10230, lastUpdated: ago(18),
  },
  {
    id: 'bauchi', name: 'Bauchi', code: 'BA', zone: 'North East',
    totalPUs: 6440, reportingPUs: 5890, registeredVoters: 2234560, accreditedVoters: 776340,
    votes: { APC: 345670, PDP: 222340, LP: 27120, NNPP: 18230 },
    validVotes: 613360, rejectedBallots: 15240, lastUpdated: ago(7),
  },
  {
    id: 'borno', name: 'Borno', code: 'BO', zone: 'North East',
    totalPUs: 3857, reportingPUs: 3645, registeredVoters: 1734560, accreditedVoters: 612340,
    votes: { APC: 467340, PDP: 78230, LP: 19120, NNPP: 11230 },
    validVotes: 575920, rejectedBallots: 12340, lastUpdated: ago(4),
  },
  {
    id: 'gombe', name: 'Gombe', code: 'GO', zone: 'North East',
    totalPUs: 2710, reportingPUs: 2543, registeredVoters: 1023450, accreditedVoters: 387230,
    votes: { APC: 287340, PDP: 145230, LP: 18120, NNPP: 9230 },
    validVotes: 459920, rejectedBallots: 9870, lastUpdated: ago(11),
  },
  {
    id: 'taraba', name: 'Taraba', code: 'TA', zone: 'North East',
    totalPUs: 5360, reportingPUs: 4320, registeredVoters: 1645230, accreditedVoters: 498120,
    votes: { APC: 134230, PDP: 189340, LP: 43120, NNPP: 7230 },
    validVotes: 373920, rejectedBallots: 11230, lastUpdated: ago(25),
  },
  {
    id: 'yobe', name: 'Yobe', code: 'YO', zone: 'North East',
    totalPUs: 2450, reportingPUs: 2340, registeredVoters: 956230, accreditedVoters: 423450,
    votes: { APC: 389230, PDP: 67120, LP: 12340, NNPP: 8120 },
    validVotes: 476810, rejectedBallots: 8760, lastUpdated: ago(5),
  },
  // ── North West ─────────────────────────────────────────────────────────────
  {
    id: 'jigawa', name: 'Jigawa', code: 'JI', zone: 'North West',
    totalPUs: 5586, reportingPUs: 5120, registeredVoters: 2034560, accreditedVoters: 687230,
    votes: { APC: 512340, PDP: 178230, LP: 14120, NNPP: 34230 },
    validVotes: 738920, rejectedBallots: 12340, lastUpdated: ago(13),
  },
  {
    id: 'kaduna', name: 'Kaduna', code: 'KD', zone: 'North West',
    totalPUs: 11924, reportingPUs: 10234, registeredVoters: 3456230, accreditedVoters: 1134560,
    votes: { APC: 673450, PDP: 389230, LP: 87120, NNPP: 76230 },
    validVotes: 1226030, rejectedBallots: 23450, lastUpdated: ago(8),
  },
  {
    id: 'kano', name: 'Kano', code: 'KN', zone: 'North West',
    totalPUs: 14354, reportingPUs: 13120, registeredVoters: 5823456, accreditedVoters: 1734560,
    votes: { APC: 312450, PDP: 245230, LP: 56120, NNPP: 987230 },
    validVotes: 1601030, rejectedBallots: 34560, lastUpdated: ago(2),
  },
  {
    id: 'katsina', name: 'Katsina', code: 'KT', zone: 'North West',
    totalPUs: 9159, reportingPUs: 8234, registeredVoters: 3145230, accreditedVoters: 978450,
    votes: { APC: 698340, PDP: 289230, LP: 23120, NNPP: 45230 },
    validVotes: 1055920, rejectedBallots: 18760, lastUpdated: ago(10),
  },
  {
    id: 'kebbi', name: 'Kebbi', code: 'KB', zone: 'North West',
    totalPUs: 4134, reportingPUs: 3765, registeredVoters: 1534560, accreditedVoters: 534120,
    votes: { APC: 345230, PDP: 134120, LP: 12340, NNPP: 18230 },
    validVotes: 510020, rejectedBallots: 10230, lastUpdated: ago(16),
  },
  {
    id: 'sokoto', name: 'Sokoto', code: 'SO', zone: 'North West',
    totalPUs: 3595, reportingPUs: 3230, registeredVoters: 1823450, accreditedVoters: 634120,
    votes: { APC: 456230, PDP: 234120, LP: 16340, NNPP: 21230 },
    validVotes: 727920, rejectedBallots: 14320, lastUpdated: ago(19),
  },
  {
    id: 'zamfara', name: 'Zamfara', code: 'ZA', zone: 'North West',
    totalPUs: 3149, reportingPUs: 2876, registeredVoters: 1423450, accreditedVoters: 512340,
    votes: { APC: 387230, PDP: 178120, LP: 14340, NNPP: 16230 },
    validVotes: 595920, rejectedBallots: 11230, lastUpdated: ago(14),
  },
  // ── South East ─────────────────────────────────────────────────────────────
  {
    id: 'abia', name: 'Abia', code: 'AB', zone: 'South East',
    totalPUs: 3519, reportingPUs: 3312, registeredVoters: 1345230, accreditedVoters: 478340,
    votes: { APC: 34230, PDP: 23120, LP: 287340, NNPP: 4120 },
    validVotes: 348810, rejectedBallots: 7890, lastUpdated: ago(7),
  },
  {
    id: 'anambra', name: 'Anambra', code: 'AN', zone: 'South East',
    totalPUs: 5720, reportingPUs: 5456, registeredVoters: 2234560, accreditedVoters: 589230,
    votes: { APC: 45230, PDP: 16120, LP: 346230, NNPP: 3120 },
    validVotes: 410700, rejectedBallots: 9870, lastUpdated: ago(4),
  },
  {
    id: 'ebonyi', name: 'Ebonyi', code: 'EB', zone: 'South East',
    totalPUs: 2900, reportingPUs: 2567, registeredVoters: 1023450, accreditedVoters: 398230,
    votes: { APC: 187230, PDP: 67120, LP: 145340, NNPP: 2120 },
    validVotes: 401810, rejectedBallots: 8760, lastUpdated: ago(22),
  },
  {
    id: 'enugu', name: 'Enugu', code: 'EN', zone: 'South East',
    totalPUs: 4064, reportingPUs: 3890, registeredVoters: 1645230, accreditedVoters: 512340,
    votes: { APC: 47230, PDP: 31120, LP: 345230, NNPP: 3120 },
    validVotes: 426700, rejectedBallots: 9870, lastUpdated: ago(6),
  },
  {
    id: 'imo', name: 'Imo', code: 'IM', zone: 'South East',
    totalPUs: 4706, reportingPUs: 4234, registeredVoters: 1823450, accreditedVoters: 567230,
    votes: { APC: 89230, PDP: 43120, LP: 345230, NNPP: 3120 },
    validVotes: 480700, rejectedBallots: 11230, lastUpdated: ago(9),
  },
  // ── South South ────────────────────────────────────────────────────────────
  {
    id: 'akwaibom', name: 'Akwa Ibom', code: 'AK', zone: 'South South',
    totalPUs: 5256, reportingPUs: 4987, registeredVoters: 2145230, accreditedVoters: 734560,
    votes: { APC: 87230, PDP: 456230, LP: 67120, NNPP: 5120 },
    validVotes: 615700, rejectedBallots: 13450, lastUpdated: ago(5),
  },
  {
    id: 'bayelsa', name: 'Bayelsa', code: 'BY', zone: 'South South',
    totalPUs: 1645, reportingPUs: 1534, registeredVoters: 723450, accreditedVoters: 298230,
    votes: { APC: 67230, PDP: 234120, LP: 34120, NNPP: 3120 },
    validVotes: 338590, rejectedBallots: 6780, lastUpdated: ago(17),
  },
  {
    id: 'crossriver', name: 'Cross River', code: 'CR', zone: 'South South',
    totalPUs: 3635, reportingPUs: 3234, registeredVoters: 1523450, accreditedVoters: 512340,
    votes: { APC: 189230, PDP: 156120, LP: 78340, NNPP: 4120 },
    validVotes: 427810, rejectedBallots: 9870, lastUpdated: ago(20),
  },
  {
    id: 'delta', name: 'Delta', code: 'DE', zone: 'South South',
    totalPUs: 5842, reportingPUs: 5456, registeredVoters: 2645230, accreditedVoters: 867340,
    votes: { APC: 123230, PDP: 267120, LP: 234340, NNPP: 5120 },
    validVotes: 629810, rejectedBallots: 14320, lastUpdated: ago(11),
  },
  {
    id: 'edo', name: 'Edo', code: 'ED', zone: 'South South',
    totalPUs: 3876, reportingPUs: 3654, registeredVoters: 1823450, accreditedVoters: 612340,
    votes: { APC: 234230, PDP: 145120, LP: 178340, NNPP: 6120 },
    validVotes: 563810, rejectedBallots: 12340, lastUpdated: ago(3),
  },
  {
    id: 'rivers', name: 'Rivers', code: 'RI', zone: 'South South',
    totalPUs: 5720, reportingPUs: 4987, registeredVoters: 3234560, accreditedVoters: 987340,
    votes: { APC: 231230, PDP: 198120, LP: 123340, NNPP: 7120 },
    validVotes: 559810, rejectedBallots: 13450, lastUpdated: ago(8),
  },
  // ── South West ─────────────────────────────────────────────────────────────
  {
    id: 'ekiti', name: 'Ekiti', code: 'EK', zone: 'South West',
    totalPUs: 2445, reportingPUs: 2345, registeredVoters: 756230, accreditedVoters: 298340,
    votes: { APC: 187230, PDP: 67120, LP: 34340, NNPP: 3120 },
    validVotes: 291810, rejectedBallots: 5670, lastUpdated: ago(13),
  },
  {
    id: 'lagos', name: 'Lagos', code: 'LA', zone: 'South West',
    totalPUs: 13325, reportingPUs: 12876, registeredVoters: 7060343, accreditedVoters: 2198340,
    votes: { APC: 572340, PDP: 75120, LP: 582340, NNPP: 14120 },
    validVotes: 1243920, rejectedBallots: 27890, lastUpdated: ago(1),
  },
  {
    id: 'ogun', name: 'Ogun', code: 'OG', zone: 'South West',
    totalPUs: 4250, reportingPUs: 4012, registeredVoters: 1834560, accreditedVoters: 567340,
    votes: { APC: 234230, PDP: 89120, LP: 156340, NNPP: 7120 },
    validVotes: 486810, rejectedBallots: 9870, lastUpdated: ago(16),
  },
  {
    id: 'ondo', name: 'Ondo', code: 'ON', zone: 'South West',
    totalPUs: 3042, reportingPUs: 2876, registeredVoters: 1423450, accreditedVoters: 498340,
    votes: { APC: 198230, PDP: 89120, LP: 134340, NNPP: 5120 },
    validVotes: 426810, rejectedBallots: 8760, lastUpdated: ago(24),
  },
  {
    id: 'osun', name: 'Osun', code: 'OS', zone: 'South West',
    totalPUs: 3763, reportingPUs: 3456, registeredVoters: 1534560, accreditedVoters: 512340,
    votes: { APC: 178230, PDP: 145120, LP: 89340, NNPP: 4120 },
    validVotes: 416810, rejectedBallots: 8760, lastUpdated: ago(18),
  },
  {
    id: 'oyo', name: 'Oyo', code: 'OY', zone: 'South West',
    totalPUs: 6811, reportingPUs: 6234, registeredVoters: 2934560, accreditedVoters: 876340,
    votes: { APC: 234230, PDP: 345120, LP: 198340, NNPP: 8120 },
    validVotes: 785810, rejectedBallots: 16780, lastUpdated: ago(7),
  },
]

// ─── Derived Zone Data ────────────────────────────────────────────────────────

export function getZones(): ZoneData[] {
  const zoneNames: ZoneName[] = [
    'North Central', 'North East', 'North West',
    'South East', 'South South', 'South West',
  ]
  return zoneNames.map(zoneName => {
    const zoneStates = STATES.filter(s => s.zone === zoneName)
    const votes: PartyVotes = { APC: 0, PDP: 0, LP: 0, NNPP: 0 }
    let totalPUs = 0, reportingPUs = 0, registeredVoters = 0
    for (const s of zoneStates) {
      votes.APC += s.votes.APC
      votes.PDP += s.votes.PDP
      votes.LP += s.votes.LP
      votes.NNPP += s.votes.NNPP
      totalPUs += s.totalPUs
      reportingPUs += s.reportingPUs
      registeredVoters += s.registeredVoters
    }
    return {
      name: zoneName,
      states: zoneStates.map(s => s.name),
      votes,
      totalPUs,
      reportingPUs,
      registeredVoters,
    }
  })
}

export function getNationalTotals(): { votes: PartyVotes; totalPUs: number; reportingPUs: number; registeredVoters: number; accreditedVoters: number; validVotes: number; rejectedBallots: number } {
  const votes: PartyVotes = { APC: 0, PDP: 0, LP: 0, NNPP: 0 }
  let totalPUs = 0, reportingPUs = 0, registeredVoters = 0, accreditedVoters = 0, validVotes = 0, rejectedBallots = 0
  for (const s of STATES) {
    votes.APC += s.votes.APC
    votes.PDP += s.votes.PDP
    votes.LP += s.votes.LP
    votes.NNPP += s.votes.NNPP
    totalPUs += s.totalPUs
    reportingPUs += s.reportingPUs
    registeredVoters += s.registeredVoters
    accreditedVoters += s.accreditedVoters
    validVotes += s.validVotes
    rejectedBallots += s.rejectedBallots
  }
  return { votes, totalPUs, reportingPUs, registeredVoters, accreditedVoters, validVotes, rejectedBallots }
}

// ─── Live Feed ────────────────────────────────────────────────────────────────

export const LIVE_FEED: LiveFeedEntry[] = [
  { id: 'f1', stateName: 'Lagos', lgaName: 'Ikeja', wardName: 'Ikeja Central', puName: 'Ikeja Town Hall PU 001', puCode: 'LA/IK/01/001', votes: { APC: 234, PDP: 12, LP: 287, NNPP: 3 }, winner: 'LP', verifiedAt: ago(1), agentName: 'Chisom A.', status: 'verified' },
  { id: 'f2', stateName: 'Kano', lgaName: 'Kano Municipal', wardName: 'Fagge A', puName: 'Fagge Primary School', puCode: 'KN/KM/01/003', votes: { APC: 45, PDP: 23, LP: 8, NNPP: 412 }, winner: 'NNPP', verifiedAt: ago(2), agentName: 'Usman M.', status: 'verified' },
  { id: 'f3', stateName: 'Borno', lgaName: 'Maiduguri MC', wardName: 'Bulumkutu', puName: 'Bulumkutu Ward Office', puCode: 'BO/MM/03/002', votes: { APC: 567, PDP: 34, LP: 12, NNPP: 8 }, winner: 'APC', verifiedAt: ago(3), agentName: 'Ibrahim K.', status: 'verified' },
  { id: 'f4', stateName: 'Anambra', lgaName: 'Awka South', wardName: 'Awka North', puName: 'Government College PU', puCode: 'AN/AS/02/005', votes: { APC: 8, PDP: 4, LP: 623, NNPP: 2 }, winner: 'LP', verifiedAt: ago(4), agentName: 'Emeka O.', status: 'verified' },
  { id: 'f5', stateName: 'Akwa Ibom', lgaName: 'Uyo', wardName: 'Idoro', puName: 'Idoro Community Hall', puCode: 'AK/UY/01/007', votes: { APC: 23, PDP: 445, LP: 34, NNPP: 2 }, winner: 'PDP', verifiedAt: ago(5), agentName: 'Obong B.', status: 'verified' },
  { id: 'f6', stateName: 'Kaduna', lgaName: 'Kaduna North', wardName: 'Kawo', puName: 'Kawo Primary School', puCode: 'KD/KN/02/004', votes: { APC: 312, PDP: 134, LP: 45, NNPP: 67 }, winner: 'APC', verifiedAt: ago(6), agentName: 'Musa A.', status: 'verified' },
  { id: 'f7', stateName: 'Rivers', lgaName: 'Port Harcourt', wardName: 'Old GRA', puName: 'Old GRA Town Hall PU', puCode: 'RI/PH/01/009', votes: { APC: 189, PDP: 167, LP: 98, NNPP: 4 }, winner: 'APC', verifiedAt: ago(8), agentName: 'Tamuno F.', status: 'verified' },
  { id: 'f8', stateName: 'Oyo', lgaName: 'Ibadan North', wardName: 'Challenge', puName: 'Challenge Secretariat PU', puCode: 'OY/IN/03/002', votes: { APC: 123, PDP: 234, LP: 89, NNPP: 5 }, winner: 'PDP', verifiedAt: ago(9), agentName: 'Adebayo T.', status: 'verified' },
  { id: 'f9', stateName: 'FCT Abuja', lgaName: 'AMAC', wardName: 'Garki', puName: 'Area 3 Shopping Centre PU', puCode: 'FC/AM/01/012', votes: { APC: 45, PDP: 34, LP: 234, NNPP: 12 }, winner: 'LP', verifiedAt: ago(10), agentName: 'Yakubu P.', status: 'verified' },
  { id: 'f10', stateName: 'Katsina', lgaName: 'Katsina', wardName: 'Kofar Kaura', puName: 'Kofar Kaura Primary School', puCode: 'KT/KA/01/006', votes: { APC: 489, PDP: 123, LP: 12, NNPP: 23 }, winner: 'APC', verifiedAt: ago(11), agentName: 'Habibu G.', status: 'verified' },
  { id: 'f11', stateName: 'Delta', lgaName: 'Warri South', wardName: 'Warri Central', puName: 'Warri Govt School PU', puCode: 'DE/WS/02/003', votes: { APC: 78, PDP: 289, LP: 198, NNPP: 3 }, winner: 'PDP', verifiedAt: ago(13), agentName: 'Efeoma N.', status: 'verified' },
  { id: 'f12', stateName: 'Enugu', lgaName: 'Enugu North', wardName: 'Ogui Urban', puName: 'Ogui Urban Community School', puCode: 'EN/EN/01/008', votes: { APC: 12, PDP: 23, LP: 456, NNPP: 2 }, winner: 'LP', verifiedAt: ago(14), agentName: 'Ngozi C.', status: 'verified' },
  { id: 'f13', stateName: 'Lagos', lgaName: 'Eti-Osa', wardName: 'Victoria Island', puName: 'Bar Beach Primary School', puCode: 'LA/EO/02/001', votes: { APC: 345, PDP: 23, LP: 412, NNPP: 7 }, winner: 'LP', verifiedAt: ago(15), agentName: 'Adunola S.', status: 'pending' },
  { id: 'f14', stateName: 'Plateau', lgaName: 'Jos North', wardName: 'Gangare', puName: 'Gangare Primary School', puCode: 'PL/JN/01/004', votes: { APC: 234, PDP: 89, LP: 256, NNPP: 8 }, winner: 'LP', verifiedAt: ago(16), agentName: 'Dauda B.', status: 'verified' },
  { id: 'f15', stateName: 'Sokoto', lgaName: 'Sokoto North', wardName: 'Mabera', puName: 'Mabera Primary School', puCode: 'SO/SN/01/002', votes: { APC: 534, PDP: 167, LP: 12, NNPP: 23 }, winner: 'APC', verifiedAt: ago(17), agentName: 'Aminu S.', status: 'verified' },
]

// ─── Mock Agents ──────────────────────────────────────────────────────────────

export const MOCK_AGENTS: MockAgent[] = [
  { id: 'ag1', name: 'Chisom Adaeze', email: 'chisom.a@party.ng', phone: '08012345001', party: 'APC', state: 'Lagos', lga: 'Ikeja', assignedPUs: ['LA/IK/01/001', 'LA/IK/01/002', 'LA/IK/01/003'], submittedCount: 3, pendingCount: 0, status: 'active', joinedAt: ago(2880) },
  { id: 'ag2', name: 'Usman Maitama', email: 'usman.m@party.ng', phone: '08012345002', party: 'NNPP', state: 'Kano', lga: 'Kano Municipal', assignedPUs: ['KN/KM/01/003', 'KN/KM/01/004'], submittedCount: 2, pendingCount: 0, status: 'active', joinedAt: ago(2160) },
  { id: 'ag3', name: 'Ibrahim Kolo', email: 'ibrahim.k@party.ng', phone: '08012345003', party: 'APC', state: 'Borno', lga: 'Maiduguri MC', assignedPUs: ['BO/MM/03/002', 'BO/MM/03/003'], submittedCount: 1, pendingCount: 1, status: 'active', joinedAt: ago(4320) },
  { id: 'ag4', name: 'Emeka Okonkwo', email: 'emeka.o@party.ng', phone: '08012345004', party: 'LP', state: 'Anambra', lga: 'Awka South', assignedPUs: ['AN/AS/02/005', 'AN/AS/02/006', 'AN/AS/02/007', 'AN/AS/02/008'], submittedCount: 4, pendingCount: 0, status: 'active', joinedAt: ago(1440) },
  { id: 'ag5', name: 'Obong Bassey', email: 'obong.b@party.ng', phone: '08012345005', party: 'PDP', state: 'Akwa Ibom', lga: 'Uyo', assignedPUs: ['AK/UY/01/007', 'AK/UY/01/008'], submittedCount: 2, pendingCount: 0, status: 'active', joinedAt: ago(3600) },
  { id: 'ag6', name: 'Musa Abdullahi', email: 'musa.a@party.ng', phone: '08012345006', party: 'APC', state: 'Kaduna', lga: 'Kaduna North', assignedPUs: ['KD/KN/02/004', 'KD/KN/02/005'], submittedCount: 1, pendingCount: 1, status: 'active', joinedAt: ago(2880) },
  { id: 'ag7', name: 'Folake Adeleke', email: 'folake.a@party.ng', phone: '08012345007', party: 'PDP', state: 'Oyo', lga: 'Ibadan North', assignedPUs: ['OY/IN/03/002'], submittedCount: 0, pendingCount: 1, status: 'pending_approval', joinedAt: ago(120) },
  { id: 'ag8', name: 'Ngozi Chukwu', email: 'ngozi.c@party.ng', phone: '08012345008', party: 'LP', state: 'Enugu', lga: 'Enugu North', assignedPUs: ['EN/EN/01/008', 'EN/EN/01/009'], submittedCount: 2, pendingCount: 0, status: 'active', joinedAt: ago(5760) },
  { id: 'ag9', name: 'Yakubu Peters', email: 'yakubu.p@party.ng', phone: '08012345009', party: 'LP', state: 'FCT Abuja', lga: 'AMAC', assignedPUs: ['FC/AM/01/012'], submittedCount: 1, pendingCount: 0, status: 'suspended', joinedAt: ago(7200) },
  { id: 'ag10', name: 'Adunola Silva', email: 'adunola.s@party.ng', phone: '08012345010', party: 'APC', state: 'Lagos', lga: 'Eti-Osa', assignedPUs: ['LA/EO/02/001', 'LA/EO/02/002'], submittedCount: 1, pendingCount: 1, status: 'active', joinedAt: ago(2160) },
]

// ─── Pending Verification Queue ───────────────────────────────────────────────

export const PENDING_SUBMISSIONS: PendingSubmission[] = [
  { id: 'ps1', puName: 'Victoria Island Bar Beach Primary School', puCode: 'LA/EO/02/001', state: 'Lagos', lga: 'Eti-Osa', ward: 'Victoria Island', agentName: 'Adunola Silva', votes: { APC: 345, PDP: 23, LP: 412, NNPP: 7 }, submittedAt: ago(15), photoCount: 3, party: 'APC', flagged: false },
  { id: 'ps2', puName: 'Fagge Primary School', puCode: 'KN/KM/01/004', state: 'Kano', lga: 'Kano Municipal', ward: 'Fagge B', agentName: 'Usman Maitama', votes: { APC: 34, PDP: 19, LP: 5, NNPP: 378 }, submittedAt: ago(22), photoCount: 2, party: 'NNPP', flagged: true },
  { id: 'ps3', puName: 'Kawo Secondary School PU', puCode: 'KD/KN/02/005', state: 'Kaduna', lga: 'Kaduna North', ward: 'Kawo', agentName: 'Musa Abdullahi', votes: { APC: 289, PDP: 123, LP: 34, NNPP: 56 }, submittedAt: ago(31), photoCount: 4, party: 'APC', flagged: false },
  { id: 'ps4', puName: 'Badagry Market PU', puCode: 'LA/BA/01/003', state: 'Lagos', lga: 'Badagry', ward: 'Badagry Central', agentName: 'Tunde Fashola', votes: { APC: 234, PDP: 45, LP: 123, NNPP: 4 }, submittedAt: ago(38), photoCount: 1, party: 'APC', flagged: true },
  { id: 'ps5', puName: 'Ogui Urban Community Centre', puCode: 'OY/IN/03/002', state: 'Oyo', lga: 'Ibadan North', ward: 'Challenge', agentName: 'Folake Adeleke', votes: { APC: 99, PDP: 213, LP: 78, NNPP: 4 }, submittedAt: ago(45), photoCount: 3, party: 'PDP', flagged: false },
]

// ─── Mock LGAs per state (for drill-down) ────────────────────────────────────

export interface MockLGA {
  id: string
  name: string
  stateId: string
  wards: number
  pus: number
  reportingPUs: number
  votes: PartyVotes
}

export function getLGAsForState(stateId: string): MockLGA[] {
  const state = STATES.find(s => s.id === stateId)
  if (!state) return []

  const lgas = LGA_TEMPLATES[stateId] || DEFAULT_LGAS
  return lgas.map((l, i) => {
    const fraction = (0.1 + Math.random() * 0.15)
    const ratio = { APC: state.votes.APC * fraction, PDP: state.votes.PDP * fraction, LP: state.votes.LP * fraction, NNPP: state.votes.NNPP * fraction }
    return {
      id: `${stateId}-lga-${i}`,
      name: l,
      stateId,
      wards: 8 + Math.floor(Math.random() * 12),
      pus: Math.floor(state.totalPUs / lgas.length),
      reportingPUs: Math.floor((state.reportingPUs / state.totalPUs) * (state.totalPUs / lgas.length)),
      votes: {
        APC: Math.floor(ratio.APC),
        PDP: Math.floor(ratio.PDP),
        LP: Math.floor(ratio.LP),
        NNPP: Math.floor(ratio.NNPP),
      },
    }
  })
}

const LGA_TEMPLATES: Record<string, string[]> = {
  lagos: ['Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Badagry', 'Epe', 'Eti-Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'],
  kano: ['Kano Municipal', 'Fagge', 'Dala', 'Gwale', 'Nassarawa', 'Tarauni', 'Ungogo', 'Kumbotso', 'Kura', 'Bunkure'],
  kaduna: ['Kaduna North', 'Kaduna South', 'Chikun', 'Igabi', 'Zaria', 'Sabon Gari', 'Soba', 'Lere', 'Kajuru', 'Kaura'],
  rivers: ['Port Harcourt', 'Obio-Akpor', 'Ikwerre', 'Emohua', 'Ahoada East', 'Ahoada West', 'Degema', 'Eleme', 'Khana', 'Ogba-Egbema-Ndoni'],
  fct: ['AMAC', 'Bwari', 'Gwagwalada', 'Kuje', 'Kwali', 'Abaji'],
  oyo: ['Ibadan North', 'Ibadan North-East', 'Ibadan South-West', 'Ibadan South-East', 'Akinyele', 'Egbeda', 'Ido', 'Lagelu', 'Ona-Ara', 'Oluyole'],
  anambra: ['Awka South', 'Awka North', 'Onitsha North', 'Onitsha South', 'Nnewi North', 'Nnewi South', 'Idemili North', 'Idemili South', 'Ogbaru', 'Orumba North'],
}

const DEFAULT_LGAS = ['LGA Central', 'LGA North', 'LGA South', 'LGA East', 'LGA West', 'LGA Metro', 'LGA Rural North', 'LGA Rural South']

export function getStateById(id: string): StateData | undefined {
  return STATES.find(s => s.id === id)
}
