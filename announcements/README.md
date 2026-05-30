# Announcements

Each announcement is a single JSON file in `announcements/main/`.

## How to create an announcement

1. Copy `_template.json` and rename it to something unique:
   ```
   cp announcements/main/_template.json announcements/main/clean-up-drive.json
   ```

2. Fill in the fields. Only `id`, `title`, `date`, `summary`, and `description` are required.

3. Add an image to `announcements/assets/` and reference it in the JSON.

4. Push to `main` — the workflow auto-updates `list.json`.

## Required fields

| Field | Description |
|-------|-------------|
| `id` | Unique slug (lowercase, hyphens) |
| `title` | Display title |
| `date` | Display date (e.g. June 5, 2026) |
| `summary` | Short text for the card |
| `description` | Full text shown when expanded |

## Optional fields

| Field | Description |
|-------|-------------|
| `tag` | Badge label (Event, Update, Notice — defaults to Notice) |
| `day` | Day of week |
| `time` | Event time |
| `location` | Event location |
| `issuedBy` | Who issued it |
| `importance` | Highlighted "Why It Matters" box |
| `instructions` | Participant instructions |
| `image` | Path to image in `announcements/assets/` |
| `active` | Set to `false` to hide without deleting |
| `gallery` | Array of additional image paths |

## Hiding without deleting

Set `"active": false` in the JSON — it stays in the folder but won't appear on the site.
