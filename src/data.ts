export type GearId = 'N' | '1' | '2' | '3' | '4' | '5' | 'R'

export const GEARS: { id: GearId; name: string; blurb: string }[] = [
  { id: 'N', name: 'neutral', blurb: 'home' },
  { id: '1', name: 'spec sheet', blurb: 'who is this guy' },
  { id: '2', name: 'the garage', blurb: 'stuff i built' },
  { id: '3', name: 'pit wall', blurb: 'business' },
  { id: '4', name: 'the dyno', blurb: 'questionable stats' },
  { id: '5', name: 'pit radio', blurb: 'say hi' },
  { id: 'R', name: 'reverse', blurb: 'changelog' },
]

export const GEAR_ORDER: GearId[] = ['R', 'N', '1', '2', '3', '4', '5']

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

export const CHANGELOG: { v: string; msg: string; type: 'feat' | 'fix' | 'refactor' | 'chore' | 'revert' | 'wip' }[] = [
  { v: 'v9.9.9', type: 'wip', msg: 'whatever i start next (probably at 2am)' },
  { v: 'v9.0.0', type: 'feat', msg: 'shipped rjbuilds. you are here.' },
  { v: 'v8.2.0', type: 'feat', msg: 'cool hand studios: short-form video for local businesses' },
  { v: 'v8.1.0', type: 'feat', msg: 'loudmouth graphics: tees that talk too much (like me)' },
  { v: 'v8.0.0', type: 'feat', msg: 'touch grass: made screen time a competition' },
  { v: 'v7.3.0', type: 'feat', msg: 'cars & bids questions: archived every question from the pod' },
  { v: 'v7.2.0', type: 'feat', msg: 'age guess: a game about how old famous people looked' },
  { v: 'v7.0.1', type: 'revert', msg: 'auro. it failed. we burned out. learned a ton.' },
  { v: 'v7.0.0', type: 'feat', msg: 'auro: launched a real marketplace with real payments' },
  { v: 'v5.0.0', type: 'feat', msg: 'linkedly: 3 months, mostly by hand, in college (2023)' },
  { v: 'v3.1.4', type: 'fix', msg: 'learned that "just one more feature" is a lie' },
  { v: 'v2.0.0', type: 'refactor', msg: 'rohan → rj. same engine, better badge.' },
  { v: 'v1.0.0', type: 'feat', msg: 'got into cars. never recovered.' },
  { v: 'v0.0.1', type: 'chore', msg: 'initial commit: rohan o\'malley' },
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
