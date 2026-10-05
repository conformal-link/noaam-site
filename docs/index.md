# Guide

Noaam keeps track of the coding agents, editors, terminals and pages you
already use, filed under the repository, worktree or folder they belong to.
It never replaces them: a Claude Code session is still Claude Code, VS Code
is still VS Code. Noaam keeps a pointer and brings the right one up.

Free for macOS 14 or later (Apple silicon).
[Download the latest release](https://github.com/conformal-link/noaam-site/releases/latest/download/Noaam.dmg).

## Installing

Noaam is not notarized by Apple yet, so macOS asks once:

1. Open `Noaam.dmg` and drag Noaam into Applications.
2. Open Noaam. macOS says it cannot verify the app; click **Done**.
3. System Settings › Privacy & Security › Security › **Open Anyway** next to
   Noaam, and confirm.

After that it opens like any other app.

On first launch a setup panel asks where your code is, which of the
repositories found there to show, which sessions belong in Noaam (under
those folders, only in the chosen repositories, or everywhere) and which
tools you use. The tools found on your Mac start ticked. Nothing is scanned
or started until you finish.

## The primitives

| | |
|---|---|
| **Folder** | A real directory that matters, nested as on disk. Its kind is *Repository* (main checkout of a repository you show), *Worktree* (one of its linked worktrees) or *Directory* (anything else holding items). |
| **Item** | One thing you work on inside a Folder: a Claude Code or Codex session, a VS Code workspace, a shell, a page. The real thing stays where its tool keeps it; Noaam keeps a pointer. |
| **Tool** | A kind of Item: Claude Code, Codex, opencode, Pi, VS Code, Neovim, Ghostty, TextEdit, your browsers. Each says what its Items point to, how they can be shown and how existing ones are found. |
| **Presentation** | How an Item is shown: an embedded terminal, an embedded web view, the tool's own app, or docked beside Noaam. |
| **Discovery** | How a tool's existing Items are found, so the sidebar is complete without importing anything. |
| **Space** | A named group of related Items in a Folder, like a tab group: a session, its browser page, its editor. Shown as a list or as tiles side by side. |
| **Settled** | Out of sight, never deleted. |

## The sidebar

The sidebar is the folders you pointed Noaam at, laid out as on disk. Each
root is a row holding everything below it: your repositories and their
worktrees, every folder where a session lives, and the Items inside them.
Each row shows how long ago something last happened there. Right-click any
folder to create a worktree there.

- **Tree or Recent.** The tree shows Folders as on disk. Recent is one flat
  list of every Item, newest activity first, with its folder under the
  title: the view for following agent runs.
- **Order.** Stable (folders by name, Items in the order you made them;
  drag Items and Spaces to rearrange) or by recent activity. The ↑↓ button
  at the bottom of the sidebar switches.
- **Search** (⌃⌘F, or the search icon at the bottom). Filters what the
  sidebar shows, fzf-style: titles count most, then the folder path and
  Space, then status, URL, branch and a session's first prompt. ↑↓ move
  through matches, Return opens one, Esc clears and closes.
- **Filter by tool.** Show only some tools, for example only VS Code.
- **Jump around.** ⌃⌘[ and ⌃⌘] go back and forward through every row you
  visited. Hold ⌃⌘ to number the Items in view, then ⌃⌘1–9 jumps to one.
- **Settle** what is done (⌃⌘⇧D). A Folder goes quiet when its last Item is
  settled; ⌃⌘⇧H shows everything again.
- **Remove from Noaam** takes an Item out of the tree. It never deletes the
  session, transcript, worktree, files or page it pointed at.
- **Auto-hide** (⌃⌘S) gives the content the full width; touch the window's
  left edge and the sidebar slides in over it.

## Status

The dot on each Item says what its tool is doing:

| Dot | Meaning |
|---|---|
| orange with ? | needs you: a permission prompt or a question |
| orange | to read: it finished while you were looking elsewhere; looking at it clears the dot |
| orange ring | finished, maybe unread: Noaam couldn't tell whether you were looking |
| blue | working (dashed: probably, by a guess; faded: an old report) |
| green | open and idle (dashed: open, nothing reports its activity) |
| red | crashed |

Claude Code, Codex, shells and editors come set up. For any other tool,
one JSON file teaches Noaam where to listen: a window title, a status
file, a hook, or a script in any language. **Why this status?** in an
Item's menu shows which source decided, and **Mark as Read** clears a dot.
When you quit, Noaam asks only if a terminal is busy, and says why.
[How status works, and how to add a tool →](status.md)

## Items

- **Claude Code, Codex and opencode sessions** appear on their own, from
  each tool's own session index, filed under the folder they ran in (for
  Claude Code, the folder it last moved to with `/cd`). Selecting one
  resumes it in an embedded terminal.
- **New items.** ⌃⌘T (or **+** at the bottom of the sidebar) opens the
  composer: type, pick the tool and where it lives, ⌘↵. An agent starts in
  its own terminal with your text as its first message; a terminal takes it
  as its name, a browser as its address. Where browses the disk, so any
  directory can take an Item, and can make a new worktree or Space on the
  way. ⌃⌘N, ⌃⌘⇧N and ⌃⌘⌥N make an Item of your first three tools right away.
- **Real terminals.** Embedded terminals are Ghostty's own engine: your
  theme, GPU rendering, native scrollback. ⌘F finds in the terminal. Drop a
  file or a screenshot thumbnail onto one to paste its path; Claude Code
  turns an image path into an attachment.
- **Terminal history survives.** Terminals keep what they printed. Reopen
  one after the process died, Noaam quit or the Mac restarted, and the old
  output comes back before the tool starts again, embedded or in Ghostty.
- **VS Code** opens embedded (VS Code's own local web server) or as your
  desktop VS Code. The embedded one starts bare: turn on Backup and Sync
  Settings once from its account menu to bring your extensions and settings
  along.
- **Pages** open embedded with a URL bar that loads addresses, searches
  everything else and suggests pages you visited (⌘L focuses it, ⇧⌘C copies
  the address, ⌘F finds), or in a specific browser. Clicking into a login
  field opens the macOS Passwords panel; Noaam stores nothing.
- **Docked** puts the tool's real window beside Noaam: Noaam narrows to its
  sidebar, the app fills the rest, and the two move together. Undock gives
  Noaam its width back. Needs Accessibility permission the first time.
- **Open elsewhere.** ⌃⌘E hands the current pane to its own app: Ghostty,
  the VS Code app, your browser.
- **Hidden items unload when quiet.** Terminals and pages you aren't looking
  at stop after a while, or past a number kept loaded, and come back when
  shown: the session resumes with its history, the page reloads. Nothing
  typed and unsent is ever dropped, and shells are kept. Set per tool in
  Settings › Tools › When hidden.

## Spaces and tiles

A Space groups the Items of one task under a named row.

- **New Beside This.** Looking at a session and want a browser next to it?
  Click **+** in the pane header (or right-click the row) › New Beside This
  › Browser. The two share a new Space, split side by side. **Add to Space
  Only** adds an Item without splitting.
- **Drag to tile.** Drag an Item from the sidebar onto the right panel: near
  an edge, a highlight shows the half it will take; drop to split. Drag a
  tile by its header to another edge to move it, drag the dividers to
  resize. The layout is saved.
- **List or tiles.** Show as List keeps the group without tiles; Show as
  Tiles puts its Items side by side. A tile's × takes its Item back to its
  folder, still running.
- ⌃⌘⇧G makes a named Space around the selected Item. Items move between
  Spaces by drag and drop or Move to…

## Profiles

A profile is a whole set of folders, repositories, tools and sidebar
settings with its own tree, for keeping work and personal apart. Each
profile opens as a Noaam of its own, with its own window, Dock icon and
⌘-Tab entry (the icon carries its name), so several run side by side. Web
views are not shared: each profile has its own cookies and sign-ins, so a
work login never shows in the personal one. A new profile starts with the
setup panel; a duplicate starts with the original's settings. Manage them in
Settings › Profiles or App menu › Profile.

## Settings

⌘, opens Settings. It edits the profile's `config.json`, which stays
readable and hand-editable.

| Page | What it holds |
|---|---|
| Profiles | every profile, Switch, Duplicate, Rename, Delete, New profile |
| Overview | how Noaam works, the scan interval, every source a scan uses and what it found last time, which found items to keep |
| Repositories | where to look for repositories, and which ones show |
| Sidebar | per folder kind its icon and when it stays visible, pinned folders, order, sidebar mode |
| Tools | add ready-made tools from **+** (Claude Code, Codex, opencode, Pi, VS Code, Neovim, Terminal, TextEdit, browsers) or define your own: commands, how existing items are found, how they open, status, when hidden, icon |
| Terminal | theme and font size of embedded terminals |
| Web | default page zoom, search engine, URL bar history |
| Shortcuts | every keyboard shortcut |
| Storage | every path and what it holds, Check storage |

Everything Noaam knows is plain files under `~/.config/noaam`, one small
JSON file per Folder and Item.

## Keys

Noaam's own commands are ⌃⌘ plus a key, the same wherever the focus is.
Plain ⌘ keys belong to the focused pane, so a terminal or web page keeps its
own shortcuts.

| Key | Action |
|---|---|
| ⌃⌘T | New…: the composer |
| ⌃⌘N, ⌃⌘⇧N, ⌃⌘⌥N | new Item of the first, second, third tool in the selected Folder |
| ⌃⌘⌥R | rename |
| ⌃⌘⇧D | settle or unsettle |
| ⌃⌘⇧H | show or hide settled entries |
| ⌃⌘F | search the sidebar |
| ⌃⌘⇧R | scan now |
| ⌃⌘⇧- | collapse or expand all |
| ⌃⌘⇧G | new Space around the selected Item |
| ⌃⌘⇧] / ⌃⌘⇧[ | next / previous row |
| ⌃⌘1–9 | jump to an Item in view; hold ⌃⌘ to see their numbers |
| ⌃⌘[ / ⌃⌘] | back / forward through the rows you visited |
| ⌃⌘E | open the current pane in its own app |
| ⌃⌘S | sidebar always shown or auto-hide |
| ⌘, | Settings |
| ⌘+, ⌘-, ⌘0 | zoom the terminal font or the page |
| ⌘F, ⌘G | find in the terminal or page |
| ⌘L, ⇧⌘C | focus the URL bar, copy the page address |
| ⌘R | reload the page |

---

Made by Conformal Link. Feedback, ideas and bug reports:
[start a discussion](https://github.com/conformal-link/noaam-site/discussions).
