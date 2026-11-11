# context-status

A Claude Code mod that adds one line to the status line. The line shows how full the context window is, the rate limit windows and the cost of the session.

Example:

```
ctx 9% (86k/1000k) | 5h 4% | 7d 7% | $0.88
```

What each part means:
- ctx: input tokens used and the size of the model's context window. It shows `ctx --` on a fresh session and right after a compact, until the next response.
- 5h and 7d: how much of the five hour and seven day rate limit windows is used. These appear only on a subscription.
- The dollar figure: what the session has cost so far.

The line updates after each turn and when a rate limit window moves one whole point.

## Install

At the prompt of a terminal session:

```
/plugin install context-status --marketplace alexeyv29/cc-context_status_line-with-mods
```

From a shell:

```
claude plugin install context-status --marketplace alexeyv29/cc-context_status_line-with-mods
```

Claude Code asks `Add marketplace?`. Answer `y`, then choose a scope. The mod is active in that session right away.

In the desktop app, where `/plugin` does not run: click + next to the prompt box, then Plugins, Add marketplace with `alexeyv29/cc-context_status_line-with-mods`, then Add plugin.

## Files

- `hooks/register.ts`: the mod. It reads `$.session.usage()` and calls `$.ui.status`.
- `.claude-plugin/plugin.json`: the manifest.
- `.claude-plugin/marketplace.json`: makes this repository a marketplace.
