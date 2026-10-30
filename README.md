# rjbuilds

personal site for rj o'malley. cars, code, and business.

the site boots like a terminal, turns the key, sweeps the tach to redline, and then you drive it with an h-pattern gear shifter.

| gear | section |
| --- | --- |
| n | home |
| 1 | spec sheet (about, as a window sticker) |
| 2 | the garage (builds) |
| 3 | pit wall (business, as live timing) |
| 4 | the dyno (questionable stats) |
| 5 | pit radio (contact) |
| r | reverse (changelog, through a backup camera) |

controls: drag the shifter, press `1`–`5`, `r`, `n`, or the arrow keys. press `` ` `` for the terminal. sit still too long and rj gets distracted.

## run it

```bash
npm install
npm run dev
```

## edit content

all copy lives in `src/data.ts`: builds, ventures, changelog, spec sheet, and the distraction facts.

## deploy

pushes to `main` build and deploy to github pages via `.github/workflows/deploy.yml`. the vite `base` is relative, so the same build works on a custom domain later.
