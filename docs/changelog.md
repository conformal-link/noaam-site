# Changelog

What changed in each release of Noaam, newest first.

## 0.0.11 — 2026-11-05 {#v0.0.11}

- **Talk to Noaam.** Turn it on in Settings › Voice › Talk to Noaam, then
  press ⌃⌥Space to start talking and again to stop (a quiet spell ends it
  too). A speech-to-speech model is the voice of one of your agent
  sessions, your assistant: what you say goes to it as a message and its
  reply is read back, so the conversation stays in that session's
  transcript and the voice can do whatever it can (its tools, your
  connected accounts, your other items through the `noaam` command). What
  it hears and says is in the journal (`noaam journal --ev voice`).
- **Pick the voice's assistant** with **Use as Voice Assistant** in a
  Claude Code or Codex item's right-click menu, or under Settings › Voice
  › Assistant; otherwise it's the item selected when you press the key.
  It needn't be open: Noaam starts it in the background.
- **A voice that keeps you company.** The default voice is OpenAI Live
  (GPT-Live): it talks and listens at once, says "on it" and stays with
  you while the assistant works, knows what it's doing step by step,
  reacts while you talk ("mm-hmm") and stops when you talk over it.
  OpenAI Realtime and Gemini Live are in Settings › Voice › Provider too.
  Paste your own API key there; it's kept in Noaam's app files, readable
  only by you.
- **Permissions and follow-ups by voice.** When the assistant asks to run
  something, the voice reads you the command: say "yes" or "no". What you
  say while it's busy goes in right away, and Claude Code takes it before
  its next step.
- **Spoken alerts.** The voice tells you when another item needs you or
  finishes, with what it asked or said, also when no conversation is open
  (Settings › Voice › Alerts).
- **Remote control for agents.** `noaam send`, `answer`, `interrupt`,
  `start` and `read` act on items from a terminal or another agent, and are
  what the voice uses. Claude Code and Codex know how (their presets have a
  new `control` block, which reaches tools set up before this release too),
  but sending, answering and interrupting are off until you turn them on in
  Settings › Tools › (the tool) › Remote control. Only items running in
  Noaam's own terminal can be reached. A prompt you're halfway through
  typing in Claude Code is set aside (its ⌃S stash) and comes back once
  the message is sent.
- **A new session that never got a message reopens.** One made in Noaam
  and closed before its first message used to show "No conversation
  found" and crash when reopened; it now starts again under its id.

## 0.0.10 — 2026-11-02 {#v0.0.10}

- **Opening an item no longer moves it up.** In the sidebar's Recent view,
  and in the tree when Settings › Sidebar › Order is set to Recent
  activity, an item now moves up only when it has something new for you:
  an agent session when it finishes a reply, a terminal when it rings its
  bell or sends a notification. Selecting, resuming or loading an item,
  or browsing in a page, leaves it where it is.

## 0.0.9 — 2026-10-22 {#v0.0.9}

- **⌃⌘W closes the window** (File › Close), like Noaam's other ⌃⌘
  commands. ⌘W now goes to the focused pane, so it closes a tab in VS Code
  or a browser, or a terminal split, instead of the whole Noaam window.

## 0.0.8 — 2026-10-15 {#v0.0.8}

- **Move to…** now shows for tools you set up before 0.0.7 too: Claude
  Code, Codex, opencode, VS Code, Neovim, Terminal and browser items get it
  in their right-click menu in the sidebar. A tool you made yourself keeps
  its setting (Settings › Tools › *the tool* › **Items can move to another
  folder**).
- **What's new**: the update strip above the sidebar's bottom bar has a
  What's new button that opens that version's changes on noaam.dev. After
  an update, the strip says which version you are on, with What's new too;
  close it with ×.
- **Help menu**: Help › Noaam Guide opens the guide, Help › What's New in
  Noaam this version's changes, and Help › Send Feedback… the discussions
  on GitHub, where you can post ideas and bug reports. Each opens in your
  default browser. The menu's search field finds any menu command.

## 0.0.7 — 2026-10-14 {#v0.0.7}

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

## 0.0.6 — 2026-10-13 {#v0.0.6}

- A restored terminal says *starting…* until its command shows something.
- Keys typed while a terminal's history is replayed no longer echo.

## 0.0.5 — 2026-10-13 {#v0.0.5}

- ⌘⌫ clears to the start of the line (⌃U) in Noaam's terminals.

## 0.0.4 — 2026-10-13 {#v0.0.4}

- A long tile title truncates instead of running under the header buttons.

## 0.0.3 — 2026-10-07 {#v0.0.3}

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

## 0.0.2 — 2026-10-06 {#v0.0.2}

- **Updates**: Noaam checks for updates once a day and shows them in a strip
  in the sidebar, never a dialog. Settings › Updates picks Automatic
  (download quietly, then Restart, or install on quit), Notify only or Off;
  Noaam › Check for Updates… checks now. About shows the build number.
  Copies of 0.0.1 have to be updated to 0.0.2 by hand once.
- Settling a Space or Folder settles everything in it, and unsettling it
  brings back just that.
- TextEdit items are note files in their folder, so ⌘S saves there and
  reopening an item opens the same file.

## 0.0.1 — 2026-10-06 {#v0.0.1}

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
