# Changelog

What changed in each release of Noaam, newest first.

## 0.0.7 — 2026-10-14

- **Move to…**: right-click an item in the sidebar and choose **Move to…**
  to put it in another folder or Space. It picks the place the way the
  composer does, and the item starts there from then on (a running one
  keeps its directory until it restarts).
- Move to… is there for Claude Code, Codex, opencode, VS Code, Neovim,
  Terminal and browser items. A tool you added before 0.0.7 has it off: turn
  on Settings › Tools › *the tool* › **Items can move to another folder**.
  A new session shows it once it has started and Noaam knows its id.
- The **Move to Space** submenu in the same menu no longer lists settled
  Spaces.
- An auto-hidden sidebar no longer comes back by itself and shrinks the
  content beside it.

## 0.0.6 — 2026-10-13

- A restored terminal says *starting…* until its command shows something.
- Keys typed while a terminal's history is replayed no longer echo.

## 0.0.5 — 2026-10-13

- ⌘⌫ clears to the start of the line (⌃U) in Noaam's terminals.

## 0.0.4 — 2026-10-13

- A long tile title truncates instead of running under the header buttons.

## 0.0.3 — 2026-10-07

- **Journal**: each profile can keep a journal of raw signals with times
  (Noaam active, the app in front, items shown and focused, windows, screen
  lock and sleep, input seen per interval but never which keys, web
  navigation, git branch and commit activity, window titles if you allow
  them). Kept forever by default; Settings › Journal. The setup panel asks
  whether to keep one.
- **`noaam` command line tool**: lists and selects items, and reads the
  journal, also with Noaam closed. Install it from Settings › Journal ›
  Command line (it is linked as `~/.local/bin/noaam`).
- **Teach an Agent**, next to Install there, opens a session of the agent you
  pick and asks it to install Noaam's skill, so your agents can answer what
  you worked on and which sessions need you.
- Agents (Claude Code, Codex, opencode) keep no terminal recording, since
  resuming prints the conversation again. Terminal history now survives
  docking and reopening.
- A multi-line first prompt reaches the tool whole instead of only its first
  line.
- `noaam` typed in Noaam's terminals finds the command line tool.
- After replaying a terminal, mouse reporting is switched off, so clicks no
  longer reach the new shell as text (seen after htop).
- Lower CPU use with many sessions: a transcript is read whole only once, and
  the sidebar rebuilds only when sessions changed.
- Smoother divider dragging.
- A root folder itself can be the place for a new item: in the composer's
  place picker, open the root and choose **Here**.
- The Claude preset finds `claude` on your PATH when it isn't in one of the
  usual places.

## 0.0.2 — 2026-10-06

- **Updates**: Noaam checks for updates once a day and shows them in a strip
  in the sidebar, never a dialog. Settings › Updates picks Automatic
  (download quietly, then Restart, or install on quit), Notify only or Off;
  Noaam › Check for Updates… checks now. About shows the build number.
  Copies of 0.0.1 have to be updated to 0.0.2 by hand once.
- Settling a Space or Folder settles everything in it, and unsettling it
  brings back just that.
- TextEdit items are note files in their folder, so ⌘S saves there and
  reopening an item opens the same file.

## 0.0.1 — 2026-10-06

First release.

- A sidebar of your repositories, worktrees and folders, following the disk,
  with the agent sessions, terminals, editors and web pages that belong to
  each. Search it fzf-style; drag items and Spaces to rearrange them.
- Status dots for what each tool is doing (working, to read, needs you,
  crashed), from per-tool status presets you can extend.
- Spaces tile items side by side; drag from the sidebar onto a pane edge, or
  "+" in a pane header to open a new item beside it.
- Apps docked into the window or kept as native windows, with one click back
  to the sidebar; quitting closes the docked windows Noaam opened.
- Terminals and web panes built in: find, a URL bar with history, ⇧⌘R
  reload ignoring the cache, the Passwords panel on login fields.
- Profiles, each its own Noaam with its own settings, tree and web sign-ins,
  and a setup panel on first launch.
- The composer (⌃⌘T) starts a new session of any tool in any place.
- Noaam's commands on ⌃⌘ work in every pane; back and forward through
  visited items.
- Hidden items unload their terminals and pages when quiet.
