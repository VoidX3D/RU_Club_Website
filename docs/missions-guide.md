# Missions

Missions represent the core activities and projects undertaken by RU Club Motherland. Each mission has its own directory containing data and images.

## Structure

```
mission/
├── list.json                 # Global index of all missions
├── mission-01/               # Mission #01
│   ├── info.json             # Detailed data for the mission
│   ├── img-01.jpg            # Mission images (img-01.jpg, img-02.jpg, ...)
│   └── img-02.jpg
├── mission-02/               # Mission #02
└── mission-03/               # Mission #03
```

## How to add a new mission

1. **Create a new folder** under `mission/` using the next sequential number:
   ```bash
   mkdir mission/mission-04
   ```

2. **Add images** to that folder.

3. **Create `info.json`** in your new folder. Use the following structure:
   ```json
    {
      "id": "mission-04",
      "title": "Clean-up Drive Title",
      "slug": "mission-04",
     "tag": "Mission #04",
     "date": "Month Year",
     "description": "One sentence summary.",
     "detail": "Long description (multiple paragraphs ok).",
      "images": [
        "img-01.jpg",
        "img-02.jpg"
      ],
     "stats": {
       "volunteers": "20+",
       "areasSurveyed": "10+",
       "area": "Location Name"
     },
     "partners": ["Partner Name 1", "Partner Name 2"],
     "show": true
   }
   ```

4. **Update `mission/list.json`** to include your mission in the index:
   ```json
    {
      "id": "mission-04",
      "slug": "mission-04",
      "title": "Clean-up Drive Title",
      "tag": "Mission #04",
      "date": "Month Year",
      "description": "One sentence summary.",
      "detail": "The beginning of the long description...",
      "imageCount": 2,
      "featured": "mission/mission-04/img-01.jpg",
     "show": true
   }
   ```

## Key Fields

| Field | Description |
|-------|-------------|
| `id` | Must match the folder name (e.g. `mission-01`). |
| `slug` | Used in the URL (`/mission?id=slug`). Syncs with the folder name. |
| `tag` | Usually "Mission #XX". |
| `featured` | (In `list.json`) Path to the main image shown in the grid. |
| `stats` | (In `info.json`) Key-value pairs shown in the mission sidebar. |
| `show` | Set to `false` to hide the mission from the website. |

## Updating Stats

The mission statistics on the homepage and about page are automatically calculated or retrieved from the `stats` object in `info.json` files. Ensure the numerical values (like `volunteers`) are provided as strings that can be parsed (e.g., "25+").
