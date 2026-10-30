# rjbuilds

personal site for rj o'malley. cars, code, business, music, and movies.

one scrolling page. it boots with a tach sweep to redline, and the nav has a little gearbox: every section you scroll into shifts up a gear, and the shift lights fill as you go.

- **about**: a car window sticker
- **builds**: projects as build sheets
- **business**: ventures as an f1 live timing tower
- **music**: a turntable + record crate with 30s apple music previews
- **movies**: a crt tv + vhs shelf of favorite movie scenes (youtube)
- **contact**: pit radio

sit still and rj gets distracted (fun-fact popups). press `` ` `` for a secret terminal.

## run it

```bash
npm install
npm run dev
```

## edit content

all copy lives in `src/data.ts`.

- songs: itunes track ids. find one with `https://itunes.apple.com/search?term=artist+song&entity=song&limit=1`
- movies: youtube video ids (the part after `watch?v=`)

## deploy

pushes to `main` build and deploy to github pages via `.github/workflows/deploy.yml`.
