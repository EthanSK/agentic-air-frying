# Air Frying

**Finally. The agent can cook for you.** Air Frying gives your AI assistant a workflow for planning a whole air-fryer meal. It starts with what to put in each drawer, then works out the settings, timing, and when to check the food.

[Project website](https://ethansk.github.io/air-frying/) · [My Fryer Setup](https://ethansk.github.io/air-frying/#setup) · [Read the skill](skills/air-frying/SKILL.md) · [Download ZIP](https://github.com/EthanSK/air-frying/archive/refs/heads/main.zip)

## What It Does

- Plans meals for a single basket or two independent drawers.
- Looks up recent Zapp or Zoom by Ocado orders through iPhone Mirroring when you have a signed-in app and an assistant with Mac access.
- Aims for one load with no mid-cook steps when the food and appliance directions allow it.
- Checks the food’s directions and uses your model’s finish-together feature when available.
- Explains when a second batch or a different cooking method will work better.
- Uses your cooking feedback to suggest a concrete adjustment for next time.

Any basic air fryer works for planning. For the COSORI Pro Smart setup, an assistant with Mac access can also prepare an authorised program in VeSync and verify the status after you press Start.

## Install

1. [Download and unzip the repository](https://github.com/EthanSK/air-frying/archive/refs/heads/main.zip).
2. Open `skills` in the unzipped folder. Copy the whole `air-frying` folder to the skills folder for your assistant. Create the destination directory if needed. If an `air-frying` folder already exists there, keep your existing copy and review differences before replacing it.
3. Start a new session. Use the skill name in a request or choose it from your assistant’s skill list.

| Assistant | User-wide skills folder | Project-only skills folder |
| --- | --- | --- |
| [Codex](https://developers.openai.com/codex/skills) | `~/.agents/skills/` | `.agents/skills/` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `~/.claude/skills/` | `.claude/skills/` |

For example, a user-wide Codex installation should contain `~/.agents/skills/air-frying/SKILL.md` next to its supporting files. In Codex, use `$air-frying`. In Claude Code, start a request with `/air-frying`.

## Try It

> Check my recent Zapp and Zoom orders and plan dinner. I’d like salmon with asparagus, crispy baby potato slices and jammy tomatoes. Tell me what goes in each drawer and help both finish together.

If order lookup is unavailable, share the food, model and packet directions when you have them. The skill can use those details to plan the cook.

## My Fryer Setup

The [illustrated setup guide](https://ethansk.github.io/air-frying/setup.html) covers the stacked COSORI Turbo Tower Pro Smart, VeSync pairing, Codex Computer Use on a Mac, iPhone Mirroring, a first cook and the foil-and-Blu-Tack Fingerbot experiment. [Ethan’s common orders](https://ethansk.github.io/air-frying/favourites.html) shows a dated snapshot of favourites and repeat buys with observed order counts and public shop links.

The optional [connected workflow](skills/air-frying/references/connected-setup.md) uses your own signed-in apps. COSORI calls for Start at the appliance. Automatic Start with the experimental Fingerbot assembly remains unverified.

## Updates

The skill can check this repository when used and at most weekly after a successful check. The check uses Python 3, keeps its state on your machine, and can be turned off. Your assistant asks before applying any update. See the [update procedure](skills/air-frying/references/public-updates.md) for details.

## Project Files

- [`skills/air-frying/`](skills/air-frying/) contains the installable skill, examples and optional update helper.
- [`docs/`](docs/) contains the GitHub Pages site. Run `python3 -m http.server 8000 --directory docs` to preview it locally.

Privacy and data use are described on the [project site](https://ethansk.github.io/air-frying/#privacy). If you share an example in an [issue](https://github.com/EthanSK/air-frying/issues), remove personal details first.

## License

First-party material is available under Apache License 2.0 with the Commons Clause v1.0. See [LICENSE](LICENSE) and [LICENSING.md](LICENSING.md) for scope and asset notices.
