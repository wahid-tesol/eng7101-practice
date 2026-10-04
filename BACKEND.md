# The backend — where it is and how to run it

Written 3 October 2026, when the app moved from the v1 backend to v2.

## The three things it is made of

| Thing | Where |
|---|---|
| Apps Script project | `ENG7101 Practice — backend v2`, under **wahidabdul1985@gmail.com** |
| Data spreadsheet | **ENG7101 Practice Data** — `1Dr_8uhzbdd6C2ymcPW-KGCHTf4Mal6YvFXfwtEN-E8U` |
| Published address | the `/exec` in `SYNC_URL`, line 250 of `index.html` |

The source of the backend lives beside this repo as `Code-v2.gs` (one folder up, not
checked in). Apps Script has no command line here: changes are pasted into the editor.

## Adding students

In the script editor, paste this at the bottom of `Code.gs`, edit the lines,
save, choose `addMyStudents` from the dropdown and click **Run**:

```javascript
function addMyStudents() {
  addStudent("awahid", "Abdul Wahid", "Oct 2026");
  addStudent("sfarah", "Sara Farah",  "Oct 2026");
}
```

Each password is printed in the Execution log **and** written into column **I** of
the Roster, and it **stays there** — `KEEP_PASSWORD_VISIBLE = true` at the top of
the code. You can read anybody's password at any time.

The cost of that convenience: the spreadsheet holds working credentials. Anyone who
sees it, or any export or screen-share of it, can log in as any student. Set
`KEEP_PASSWORD_VISIBLE = false` and each password clears itself the first time its
owner logs in. Column **E, "Last login"** tells you who has started either way.

## Resetting a password

Tick column **H, "Issue new password"** on their row — as many rows as you like —
then run `issueNewPasswords`. New passwords appear in column I, the ticks clear
themselves, and that student's devices are released so they can log in anywhere.

Column **G, "Reset devices"** is the separate one: it frees the two device slots
without changing the password, for a student with a new phone.

## Publishing a code change

**Deploy → Manage deployments → the pencil → Version: New version → Deploy.**

Never "New deployment" again. A second deployment gets a second `/exec` address,
the app keeps calling the first one, and your change appears to do nothing.

## Two things that will ruin your day

**`SECRET`** in *Project Settings → Script Properties* signs every password hash and
every login token. Delete it and nobody can log in, ever, and it cannot be recovered —
every student would need a new password. Do not edit it. Do not delete it.

**Row 1 of the Roster.** Rename or delete a heading and the backend now stops with a
message naming the column rather than silently refusing every login. Run `setup()` to
put the headings back.

## What is still running from before

The old v1 Apps Script project and its spreadsheet *EWU English Practice App*
(`1LhocRZmBG8L5CfKz865hmxyReZG7HLvYUbMQULqanQQ`) are untouched and still deployed.
They are the record of the cohort that finished, and the fallback if v2 ever has to be
backed out. Nothing writes to them any more.

## Verified live on 3 October 2026

From the real site origin, `https://wahid-tesol.github.io`:

- `GET /exec` → `ENG7101 backend v2 is running.` anonymously, which also proves the
  deployment was published with access **Anyone**, not **Only myself**
- cross-origin `POST` login → HTTP 200, correct JSON, CORS clean
- a wrong password and an unknown username give the **same** answer, so the roster
  cannot be probed
- a forged token, a result with no token and a session with no token are all refused
- an empty body gives "Empty request"; malformed JSON gives a plain message rather
  than leaking anything about the inside of the script
- the login screen will not submit until username, password **and** the terms tick
  are all present
