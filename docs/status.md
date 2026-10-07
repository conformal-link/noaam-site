# Status: how Noaam knows what a tool is doing

The dot on each item in the sidebar says what that tool is up to. This is
where it comes from, and how to teach Noaam a tool it has never heard of.

## What the dot says

| Dot | Meaning |
|---|---|
| orange with ? | needs you: a permission prompt or a question. Stays until it's answered |
| orange | to read: a turn finished (or a notification came) while you were looking elsewhere. Looking at the item clears it |
| orange ring | maybe unread: it finished while Noaam couldn't tell whether you were looking |
| blue | working |
| dashed blue | probably working: only a guess says so (a program running in a terminal) |
| faded blue | last heard working, but that report is old |
| green | open and idle |
| dashed green | open, but nothing reports its activity in this presentation |
| red | crashed: exited with an error or a signal, or its session's process died |
| none | closed |

**Why this status?** in an item's menu says which source decided each part,
how long ago, from what. **Mark as Read** clears a dot by hand.

## Where it comes from

Three kinds of source, in order of how much they count:

1. **The tool's own word.** A status file it keeps per session (Claude Code
   writes one), or the tool telling Noaam through a hook or notify setting
   (Codex does). Also a script you write.
2. **What it shows in its terminal.** The window title (most tools put a
   spinner there while working), a progress bar, desktop notifications,
   the bell.
3. **A guess.** A program other than the tool holding the terminal (a build
   in a shell).

A fresher report from a higher kind wins; a report tied to a process is
dropped when the process dies; one with nothing behind it goes stale.

**Free, for every tool in a terminal.** Noaam runs the tool inside its own
terminal recorder, both in the embedded terminal and in whatever terminal
app the tool's Own app command opens through `{terminal}`. From there it
always sees the tool start and exit (an exit code says closed or crashed)
and whether that window has focus, and it reads everything the tool prints
to the terminal. A tool started some other way gives Noaam only its files,
its hooks and your scripts.

**Looking, and "to read".** A turn that ends while you are not looking at
the item leaves something to read. Looking means: the item's pane is shown
(selected, or a visible tile) with Noaam in front; its docked window is
shown; its own window is the focused one; or its terminal reports focus. A
locked screen counts as not looking. When Noaam can't tell, the dot is a
hollow ring (or whatever you chose in Settings).

## Presets

Where Noaam listens for a tool, and what it hears there means, is a
**preset**: one JSON file per tool.

- Shipped: `Noaam.app/Contents/Resources/status-presets/*.json` (Claude
  Code, Codex, a shell, an editor, generic).
- Yours: `~/.config/noaam/status-presets/*.json`. A file here with the same
  `id` as a shipped one replaces it. Settings › Tools › Status › **Edit
  preset file** makes the copy and opens it; **More › New preset for this
  tool** starts one for a tool with no preset.

A tool uses the preset whose `commands` names the command it runs
(`claude`, `codex`, `zsh`…), or the one picked by hand in Settings › Tools ›
Status › More, else `generic` (the free basics). Changes to a file apply
within a second or two; no restart. Settings shows each source and the last
thing it heard, so you see your edit take.

## The file

```json
{
  "id": "mytool",
  "name": "My Tool",
  "commands": ["mytool"],
  "status": {
    "adapters": [ …sources, see below… ],
    "minWorkSeconds": 0,
    "whenViewingUnknown": "soft",
    "staleAfterSeconds": 600
  }
}
```

- `commands`: command names (the last path component) this preset is for.
- `minWorkSeconds`: work shorter than this leaves nothing to read (3 for a
  shell, so `ls` never lights up).
- `whenViewingUnknown`: when something finishes and Noaam can't tell whether
  you were looking: `soft` (hollow ring), `flag`, `skip`.
- `staleAfterSeconds`: how long to believe "working" from a source with no
  process behind it.

These three can also be set per tool in Settings, over the preset.

Every source: `{"id": "<unique name>", "kind": "<kind>", "enabled": true, "tier": …, …}`.
`tier` lowers how much it counts, never raises: `authoritative` (the tool's
own word), `signal`, `heuristic` (a guess). Each kind has a default.

### The words

What a source may say about an item:

| Word | Meaning |
|---|---|
| `working` | mid-turn |
| `idle` | between turns |
| `ended` | a turn finished: something to read if you were elsewhere |
| `ended:quiet` | stopped (an interrupt): nothing to read |
| `needs-you` | a question or permission prompt; stays until answered |
| `answered` | the question was answered |
| `attention` | something to show you; clears when you look |
| `open`, `closed`, `crashed` | running or not |
| `ignore` | means nothing |

### Kinds

**`terminalTitle`** — rules over the window title the tool sets.
```json
{"id": "mytool.title", "kind": "terminalTitle", "rules": [
  {"match": "^[⠋⠙⠹] |Thinking", "emit": "working"},
  {"match": ".", "emit": "idle"}
]}
```
First match wins; patterns are POSIX extended regular expressions (`[0-9]`,
not `\d`). Noaam reports only when the meaning changes, so a spinner
cycling through frames is one "working". Codex: a braille spinner
(`⠋ title`) while working, the bare title when idle. Claude Code: `◐ `/`◑ `
while working, `✳ ` when idle.

**`terminalProgress`** — the progress bar (OSC 9;4) some tools show in the
title bar or tab: shown means working; removed means a turn ended. No
fields: `{"id": "mytool.progress", "kind": "terminalProgress"}`.

**`terminalNotify`** — rules over the text of desktop notifications the
tool sends through the terminal (OSC 9, 777, 99).
```json
{"id": "mytool.notify", "kind": "terminalNotify", "rules": [
  {"match": "permission|approve", "emit": "needs-you"},
  {"match": ".", "emit": "attention"}
]}
```

**`terminalBell`** — `{"id": "…", "kind": "terminalBell", "emit": "attention"}`
(or `needs-you`, `ignore`).

**`foregroundJob`** — something other than the tool itself running in its
terminal (a build in a shell). A guess.
`{"id": "…", "kind": "foregroundJob", "seconds": 3, "ignore": ["less", "man"]}`

**`jsonFile`** — a file the tool keeps about each running session.
```json
{"id": "mytool.sessionFile", "kind": "jsonFile",
 "path": "{home}/.mytool/sessions/*.json",
 "fields": {"id": "sessionId", "state": "status", "message": "waitingFor", "pid": "pid", "at": "updatedAt", "atUnit": "ms"},
 "states": {"busy": "working", "idle": "idle", "waiting": "needs-you", "waiting/dialog open": "attention"},
 "skip": {"kind": "bg"}}
```
`fields` says where things are in the JSON (dotted paths; numbers index
arrays). `states` maps the raw state, or `state/message`, to a word. `pid`
ties the report to a process: when it dies, the report goes. `skip`
ignores files where a field's whole value matches a pattern. Placeholders:
`{home}`, `{claudeHome}`, `{codexHome}`.

**`hookEvents`** — the tool tells Noaam itself. Its hook or notify setting
runs `noaam-status hook <id>` with the tool's JSON (last argument or stdin);
`arguments` are added to the tool's command line each time Noaam starts it,
so the hook is set up without touching the tool's own config.
```json
{"id": "mytool.hooks", "kind": "hookEvents",
 "arguments": ["--on-event", "{noaamStatus} hook mytool.hooks"],
 "fields": {"event": "type", "subtype": "notification_type", "session": "session_id", "message": "text"},
 "states": {"turn-start": "working", "turn-end": "ended", "ask": "needs-you", "Notification:idle": "ignore"},
 "skip": {"input.0": "Generate a title.*"}}
```
`states` keys are event names, or `event:subtype`. Events naming a session
other than the item's are ignored. `turn` (optional) is where the payload
names its turn or message: the journal keeps that id, never the payload's
text, so a reader finds the turn in the tool's own transcript.

**`transcriptId`** (next to `adapters`, optional) — where each JSON line of
the tool's transcript keeps its id (Claude Code `uuid`, Codex
`payload.turn_id`). At each turn's start and end the journal records the
latest one, so a reader can go straight to that point in the transcript. `{noaamStatus}` is Noaam's helper; from
inside any Noaam terminal a script can also just run
`noaam-status needs-you "approve?"` (also `working`, `idle`, `ended`,
`attention`).

**`discovery`** — whatever the tool's Finding existing items source
reports about a session (mid-turn or not, when its last turn ended).
`{"id": "mytool.index", "kind": "discovery"}`

**`command`** — a script of yours, run every so often.
```json
{"id": "mytool.script", "kind": "command", "run": "python3 {home}/.config/noaam/status-presets/mytool-status.py", "every": 5}
```
Any command line, run in your login shell (bash, Python, anything on your
PATH). It gets this tool's items in `NOAAM_ITEMS`
(`[{"item": "…", "session": "…", "folder": "…"}]`) and prints one JSON
object per line, or an array:
```json
{"id": "<session>", "state": "working", "message": "…", "at": 1700000000}
{"item": "<item>", "state": "needs-you", "message": "approve?"}
```
`at` is epoch seconds, milliseconds or ISO 8601. Printing the same line
again is not a new event. Exit code and stderr show in Settings.

**`stream`** — the same, but started once and left running; it prints a
line the moment something happens (a log tail, an event stream). Restarted
with a growing pause if it exits.
`{"id": "mytool.events", "kind": "stream", "run": "mytool events --json"}`

## Teaching Noaam a new tool, step by step

Say `mytool`, a coding agent CLI nobody has written a preset for.

1. Settings › Tools › + › add it with its command. Its Status section says
   no preset is for `mytool` and lists the free basics.
2. **More › New preset for this tool** writes
   `~/.config/noaam/status-presets/mytool.json` and opens it, with this
   document beside it.
3. Run the tool once in Noaam and look at Settings › Status while it works:
   what the title row heard tells you whether a `terminalTitle` rule is
   enough. Paste a title into the box there to try a rule.
4. If the tool keeps a status file, has hooks, or exposes its state some
   other way, add the matching source from the list above. When only you
   know how to read its state, a `command` script in any language does.
5. Watch the item's dot, and **Why this status?** when it doesn't match
   what you expect: it names the source that decided.

The shipped `claude.json` and `codex.json` are complete examples. A preset
file can be shared; dropping one into the folder is all it takes.
