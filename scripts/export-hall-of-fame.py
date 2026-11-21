#!/usr/bin/env python3
"""Render the public Hall of Fame from the private, curated cookbook."""
import argparse
from html import escape
import json
from pathlib import Path
import re
from string import Template


ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / "docs" / "hall-of-fame.html"
TEMPLATE = Path(__file__).with_name("hall-of-fame.html")
SLUG = re.compile(r"[a-z0-9]+(?:-[a-z0-9]+)*")
PRIVATE_MARKERS = re.compile(
    r"/Users/|/home/|~[/]|\.codex|codex://|grocery-history\.md|"
    r"\b[0-9a-f]{8}(?:-[0-9a-f]{4}){3}-[0-9a-f]{12}\b",
    re.IGNORECASE,
)


def render_pick(pick):
    return f"""        <article class="hall-pick" id="{pick['id']}">
          <h3>{escape(pick['title'])}</h3>
          <p>{escape(pick['note'])}</p>
          <a class="text-link" href="#{pick['recipe']}">Shared Drawer Settings <span aria-hidden="true">↓</span></a>
        </article>"""


def render_recipe(recipe, shared):
    drawers = []
    for drawer in recipe["drawers"]:
        setting = f"{drawer['mode']} · {drawer['celsius']}°C · {drawer['minutes']} min"
        drawers.append(
            f"          <div><dt>{escape(drawer['name'])}</dt>"
            f"<dd><strong>{escape(setting)}</strong><span>{escape(drawer['food'])}</span></dd></div>"
        )
    drawer_rows = "\n".join(drawers)
    steps = "\n".join(f"          <li>{escape(step)}</li>" for step in recipe["steps"])
    classes = "hall-recipe hall-recipe-shared" if shared else "hall-recipe"
    return f"""      <article class="{classes}" id="{recipe['id']}">
        <h3>{escape(recipe['title'])}</h3>
        <p>{escape(recipe['summary'])}</p>
        <dl class="hall-settings">
{drawer_rows}
        </dl>
        <ol>
{steps}
        </ol>
        <p class="hall-note">{escape(recipe['note'])}</p>
      </article>"""


def render(cookbook):
    picks = cookbook["featured"]
    recipes = cookbook["recipes"]
    ids = [entry["id"] for entry in [*picks, *recipes]]
    if not picks or not recipes or len(set(ids)) != len(ids) or any(not SLUG.fullmatch(slug) for slug in ids):
        raise ValueError("Use unique lower-case anchor names for the picks and recipes.")
    recipes_by_id = {recipe["id"]: recipe for recipe in recipes}
    if any(pick["recipe"] not in recipes_by_id for pick in picks):
        raise ValueError("Each featured pick needs an existing recipe.")

    shared_ids = {pick["recipe"] for pick in picks}
    # Use only explicit display fields. Private source references never enter the template.
    html = Template(TEMPLATE.read_text(encoding="utf-8")).substitute(
        picks="\n".join(map(render_pick, picks)),
        shared="\n".join(render_recipe(r, shared=True) for r in recipes if r["id"] in shared_ids),
        recipes="\n".join(render_recipe(r, shared=False) for r in recipes if r["id"] not in shared_ids),
    )
    if PRIVATE_MARKERS.search(html):
        raise ValueError("The rendered page contains a private reference.")
    return html


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("cookbook", type=Path, help="Path to the curated Hall of Fame JSON")
    parser.add_argument("--check", action="store_true", help="Check the published HTML matches the source")
    args = parser.parse_args()
    html = render(json.loads(args.cookbook.read_text(encoding="utf-8")))
    if args.check:
        if PAGE.read_text(encoding="utf-8") != html:
            raise SystemExit("Regenerate docs/hall-of-fame.html before publishing.")
    else:
        PAGE.write_text(html, encoding="utf-8")


if __name__ == "__main__":
    main()
