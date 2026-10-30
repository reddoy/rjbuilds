/** Page sections in scroll order. */
export const SECTIONS = [
  { id: 'top', gear: 'n', label: 'home' },
  { id: 'about', gear: '1', label: 'about' },
  { id: 'builds', gear: '2', label: 'builds' },
  { id: 'business', gear: '3', label: 'marketing' },
  { id: 'music', gear: '4', label: 'music' },
  { id: 'movies', gear: '5', label: 'movies' },
  { id: 'contact', gear: '6', label: 'contact' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export type Song = { id: number; title: string; artist: string; note: string }

/** itunes track ids. previews + artwork are fetched from the itunes lookup api at runtime. */
export const SONGS: Song[] = [
  { id: 1442447970, title: 'nightcall', artist: 'kavinsky', note: 'driving at night, windows down' },
  { id: 1146195725, title: 'white ferrari', artist: 'frank ocean', note: "from blonde" },
  { id: 1434544967, title: 'tokyo drift', artist: 'teriyaki boyz', note: 'from the tokyo drift soundtrack' },
  { id: 347480516, title: 'a real hero', artist: 'college & electric youth', note: 'from the drive soundtrack' },
  { id: 1771719595, title: 'redbone', artist: 'childish gambino', note: 'from awaken, my love!' },
  { id: 617154366, title: 'get lucky', artist: 'daft punk', note: 'from random access memories' },
  { id: 1440891171, title: 'mr. brightside', artist: 'the killers', note: 'from hot fuss' },
  { id: 1786000124, title: 'gasolina', artist: 'daddy yankee', note: 'from barrio fino' },
]

export type Movie = { yt: string; title: string; year: number; scene: string; why: string; color: string }

export const MOVIES: Movie[] = [
  { yt: 'hq8YD7-Aimw', title: 'bullitt', year: 1968, scene: 'the car chase', why: 'the san francisco chase sequence.', color: '#aeb2ba' },
  { yt: 'N3Zp516JkmU', title: 'ford v ferrari', year: 2019, scene: '7000 rpm', why: 'there\'s a point at 7000 rpm where everything fades.', color: '#ff7a18' },
  { yt: 'bibRSt0Ajqk', title: 'drive', year: 2011, scene: 'the getaway', why: 'the opening getaway scene.', color: '#c0c3ca' },
  { yt: 'k5fJmkv02is', title: 'the social network', year: 2010, scene: 'a billion dollars', why: 'a film about building facebook.', color: '#343438' },
  { yt: '6A4J4Kg4E60', title: 'baby driver', year: 2017, scene: 'the opening heist', why: 'the opening chase, set to bellbottoms.', color: '#f5964f' },
  { yt: 'WtnTZSJndPc', title: 'the fast and the furious', year: 2001, scene: '10 seconds or less', why: 'the street racing scene.', color: '#ff7a18' },
  { yt: '9UspZGJ-TrI', title: 'the wolf of wall street', year: 2013, scene: 'sell me this pen', why: 'the sales pitch scene.', color: '#888d98' },
  { yt: '4XA73ni9eVs', title: 'rush', year: 2013, scene: 'trailer', why: 'james hunt and niki lauda in the 1976 f1 season.', color: '#d9dbe0' },
]

export const CONTACT = {
  email: 'rohanomalley@gmail.com',
  github: 'https://github.com/reddoy',
}

export type Build = {
  name: string
  line: string
  engine: string
  status: 'live' | 'archived' | 'closed' | 'private'
  drive?: string
  hood?: string
}

export const BUILDS: Build[] = [
  {
    name: 'age guess',
    line: 'guess how old celebrities and athletes were in their photo. closer guess, more points.',
    engine: 'javascript · html · css · python',
    status: 'live',
    drive: 'https://reddoy.github.io/age-guess/',
    hood: 'https://github.com/reddoy/age-guess',
  },
  {
    name: 'cars & bids questions',
    line: 'searchable archive of every community question answered on THIS CAR POD.',
    engine: 'typescript · python',
    status: 'live',
    drive: 'https://reddoy.github.io/cars-and-bids-questions/',
    hood: 'https://github.com/reddoy/cars-and-bids-questions',
  },
  {
    name: 'touch grass',
    line: 'iphone app where friends compete on daily screen time. lowest scroll time wins.',
    engine: 'swiftui',
    status: 'live',
    drive: 'https://touchgrass-app-xi.vercel.app',
  },
  {
    name: 'auro',
    line: 'a marketplace for dating-profile feedback from real women. launched, then closed.',
    engine: 'next.js · supabase · stripe connect',
    status: 'closed',
    drive: 'https://auro-pearl.vercel.app',
    hood: 'https://github.com/reddoy/auro',
  },
  {
    name: 'linkedly',
    line: 'chrome extension that wrote ai outreach messages for linkedin. built mostly by hand in college.',
    engine: 'javascript · chrome extension',
    status: 'archived',
    drive: 'https://reddoy.github.io/linkedly/',
    hood: 'https://github.com/reddoy/linkedly',
  },
  {
    name: 'replay intel',
    line: 'transcribes iphone videos with whisper and logs them to notion. ',
    engine: 'python · whisper · notion api',
    status: 'private',
  },
]

export type Venture = {
  name: string
  what: string
  status: 'live' | 'closed' | 'archived' | 'in progress'
  link?: string
}

export const VENTURES: Venture[] = [
  {
    name: 'cool hand studios',
    what: 'short-form video + ai follow-up for local service businesses',
    status: 'live',
    link: 'https://coolhand.vercel.app',
  },
  {
    name: 'loudmouth graphics',
    what: 'all-over print & graphic tee brand',
    status: 'live',
    link: 'https://loudmouth-graphics.vercel.app',
  },
  {
    name: 'touch grass',
    what: 'an app for comparing daily screen time with friends',
    status: 'live',
    link: 'https://touchgrass-app-xi.vercel.app',
  },
  {
    name: 'linkedly',
    what: 'ai linkedin outreach (2023)',
    status: 'archived',
    link: 'https://reddoy.github.io/linkedly/',
  },
  {
    name: 'auro',
    what: 'dating-profile feedback marketplace',
    status: 'closed',
    link: 'https://auro-pearl.vercel.app',
  },
  {
    name: 'next thing',
    what: 'an upcoming project',
    status: 'in progress',
  },
]

export const FUN_FACTS: string[] = [
  "the mclaren f1 uses gold foil in its engine bay to reflect heat.",
  'javascript was created in 10 days.',
  "the honda s2000’s f20c has a 9,000 rpm redline.",
  'bmw developed the original m3 to meet touring-car racing homologation requirements.',
  'the apollo guidance computer had about 4 kb of erasable memory.',
  'the f40 was the last ferrari unveiled during enzo ferrari’s lifetime.',
]
