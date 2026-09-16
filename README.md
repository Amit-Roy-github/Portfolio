# Portfolio — Amit Roy

Single-page portfolio. Plain HTML, CSS and JavaScript: no build step, no
dependencies. Deployed on Vercel at
<https://portfolio-flame-five-61.vercel.app>.

```
index.html               the whole page
css/style.css            the whole stylesheet
js/main.js               pipeline animation + copy buttons
Amit-Roy-Resume.pdf      linked from the nav and footer
```

## Design

Colour is the state machine's legend rather than decoration: blue is queued,
amber is running, green is done, and coral marks the one confidence gate that
hands a ticket back to a human. Coral appears exactly once on the page.

The hero is Katlas' pipeline. It runs one pass on load and then rests; the
fill's length is a single custom property (`--p`), so the horizontal and
vertical layouts animate off the same number. `prefers-reduced-motion` skips
straight to the resting state.

## Running it

Anything that serves static files:

```sh
python3 -m http.server 8777
```

## Keeping it current

The copy is derived from `resume.tex` in the private `resume` repo. When the
resume changes, update the matching section here and re-copy the PDF:

```sh
cp ../resume/resume.pdf ./Amit-Roy-Resume.pdf
```
