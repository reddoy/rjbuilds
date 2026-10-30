/** page sections in scroll order. each one is a gear: scrolling down shifts up. */
export const SECTIONS = [
  { id: 'top', gear: 'n', label: 'home' },
  { id: 'about', gear: '1', label: 'about' },
  { id: 'builds', gear: '2', label: 'builds' },
  { id: 'business', gear: '3', label: 'business' },
  { id: 'music', gear: '4', label: 'music' },
  { id: 'movies', gear: '5', label: 'movies' },
  { id: 'contact', gear: '6', label: 'contact' },
] as const

export type SectionId = (typeof SECTIONS)[number]['id']

export type Song = { id: number; title: string; artist: string; note: string }

/** itunes track ids. previews + artwork are fetched from the itunes lookup api at runtime. */
export const SONGS: Song[] = [
  { id: 1442447970, title: 'nightcall', artist: 'kavinsky', note: 'driving at night, windows down' },
  { id: 1146195725, title: 'white ferrari', artist: 'frank ocean', note: "it's literally about a car" },
  { id: 1434544967, title: 'tokyo drift', artist: 'teriyaki boyz', note: 'mandatory. sorry.' },
  { id: 347480516, title: 'a real hero', artist: 'college & electric youth', note: 'the drive soundtrack, again' },
  { id: 1771719595, title: 'redbone', artist: 'childish gambino', note: 'stay woke' },
  { id: 617154366, title: 'get lucky', artist: 'daft punk', note: 'robots making music. respect.' },
  { id: 1440891171, title: 'mr. brightside', artist: 'the killers', note: 'you know every word too' },
  { id: 1786000124, title: 'gasolina', artist: 'daddy yankee', note: 'fuel. for the soul.' },
]

export type Movie = { yt: string; title: string; year: number; scene: string; why: string; color: string }

export const MOVIES: Movie[] = [
  { yt: 'hq8YD7-Aimw', title: 'bullitt', year: 1968, scene: 'the car chase', why: 'the og. no cgi, just a mustang and hills.', color: '#3d5a3a' },
  { yt: 'N3Zp516JkmU', title: 'ford v ferrari', year: 2019, scene: '7000 rpm', why: 'there\'s a point at 7000 rpm where everything fades.', color: '#c8102e' },
  { yt: 'bibRSt0Ajqk', title: 'drive', year: 2011, scene: 'the getaway', why: 'quietest car chase ever. somehow the most intense.', color: '#ff4fa3' },
  { yt: 'k5fJmkv02is', title: 'the social network', year: 2010, scene: 'a billion dollars', why: 'code + business + drama. basically my whole personality.', color: '#1f3b73' },
  { yt: '6A4J4Kg4E60', title: 'baby driver', year: 2017, scene: 'the opening heist', why: 'a getaway synced to a playlist. peak.', color: '#e8b400' },
  { yt: 'WtnTZSJndPc', title: 'the fast and the furious', year: 2001, scene: '10 seconds or less', why: 'i owe you a ten second car.', color: '#ff6a00' },
  { yt: '9UspZGJ-TrI', title: 'the wolf of wall street', year: 2013, scene: 'sell me this pen', why: 'the best sales lesson ever filmed.', color: '#0f7b5f' },
  { yt: '4XA73ni9eVs', title: 'rush', year: 2013, scene: 'trailer', why: 'hunt vs. lauda. rivalry is the best fuel.', color: '#d9d2c3' },
]

export const CONTACT = {
  email: 'rohanomalley@gmail.com',
  github: 'https://github.com/reddoy',
}

export type Build = {
  name: string
  line: string
  engine: string
  status: 'running' | 'retired' | 'blown engine' | 'private build'
  drive?: string
  hood?: string
}

export const BUILDS: Build[] = [
  {
    name: 'age guess',
    line: 'guess how old celebrities and athletes were in their photo. closer guess, more points.',
    engine: 'javascript · html · css · python',
    status: 'running',
    drive: 'https://reddoy.github.io/age-guess/',
    hood: 'https://github.com/reddoy/age-guess',
  },
  {
    name: 'cars & bids questions',
    line: 'searchable archive of every community question answered on THIS CAR POD.',
    engine: 'typescript · python',
    status: 'running',
    drive: 'https://reddoy.github.io/cars-and-bids-questions/',
    hood: 'https://github.com/reddoy/cars-and-bids-questions',
  },
  {
    name: 'touch grass',
    line: 'iphone app where friends compete on daily screen time. lowest scroll time wins.',
    engine: 'swiftui',
    status: 'running',
    drive: 'https://touchgrass-app-xi.vercel.app',
  },
  {
    name: 'auro',
    line: 'marketplace for honest dating-profile feedback from real women. launched it. it failed. we burned out.',
    engine: 'next.js · supabase · stripe connect',
    status: 'blown engine',
    drive: 'https://auro-pearl.vercel.app',
    hood: 'https://github.com/reddoy/auro',
  },
  {
    name: 'linkedly',
    line: 'chrome extension that wrote ai outreach messages for linkedin. built mostly by hand in college.',
    engine: 'javascript · chrome extension',
    status: 'retired',
    drive: 'https://reddoy.github.io/linkedly/',
    hood: 'https://github.com/reddoy/linkedly',
  },
  {
    name: 'replay intel',
    line: 'transcribes iphone videos with whisper and logs them to notion. robots doing my homework.',
    engine: 'python · whisper · notion api',
    status: 'private build',
  },
]

export type Venture = {
  pos: string
  name: string
  what: string
  status: 'running' | 'dnf' | 'retired' | 'loading'
  gap: string
  link?: string
}

export const VENTURES: Venture[] = [
  {
    pos: 'P1',
    name: 'cool hand studios',
    what: 'short-form video + ai follow-up for local service businesses',
    status: 'running',
    gap: 'leader',
    link: 'https://coolhand.vercel.app',
  },
  {
    pos: 'P2',
    name: 'loudmouth graphics',
    what: 'all-over print & graphic tee brand',
    status: 'running',
    gap: '+ tees',
    link: 'https://loudmouth-graphics.vercel.app',
  },
  {
    pos: 'P3',
    name: 'touch grass',
    what: 'screen time, but make it competitive',
    status: 'running',
    gap: '+ 0 min',
    link: 'https://touchgrass-app-xi.vercel.app',
  },
  {
    pos: '—',
    name: 'linkedly',
    what: 'ai linkedin outreach (2023)',
    status: 'retired',
    gap: 'parc fermé',
    link: 'https://reddoy.github.io/linkedly/',
  },
  {
    pos: 'DNF',
    name: 'auro',
    what: 'dating-profile feedback marketplace',
    status: 'dnf',
    gap: 'engine fire',
    link: 'https://auro-pearl.vercel.app',
  },
  {
    pos: 'P?',
    name: 'next thing',
    what: 'currently in my notes app with 47 other ideas',
    status: 'loading',
    gap: 'soon™',
  },
]

export const DISTRACTIONS: string[] = [
  "wait — did you know the mclaren f1's engine bay is lined with gold foil? it reflects heat. anyway.",
  'the first computer "bug" was an actual moth stuck in a relay in 1947. sorry. where were we.',
  'javascript was written in 10 days. explains a lot honestly.',
  "the honda s2000's f20c revs to 9,000 rpm. from the factory. ok focus.",
  'business idea: — no. no. finish the website first, rj.',
  'the e30 m3 only exists because bmw needed to homologate it for touring car racing. cool right. ok.',
  'the apollo guidance computer had about 4kb of ram. i have 47 chrome tabs open.',
  'the ferrari f40 was the last car enzo ferrari personally signed off on. sorry, back to you.',
  'just checked cars & bids. again. it has been 4 minutes.',
  'miata is always the answer. what was the question? doesn\'t matter.',
  'i just thought of a startup while you were reading this. writing it down. ok i\'m back.',
  'every porsche 911 has the key on the left. supposedly from le mans starts. ok, back on track.',
]

export const SPEC: [string, string][] = [
  ['model', "rj o'malley"],
  ['vin (legal name)', "rohan o'malley"],
  ['badge', 'rj — ask for it by name'],
  ['powertrain', 'cars · code · business'],
  ['transmission', 'manual. focus sold separately.'],
  ['peak output', 'roughly 2am'],
  ['languages', 'typescript, swift, python, sarcasm'],
  ['known issues', 'jokes too much. gets distracted. starts new projects.'],
  ['service history', 'one blown engine (auro). rebuilt stronger.'],
  ['warranty', 'void'],
]
