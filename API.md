# 🌐 LabXplore — REST API Documentation

The **LabXplore Backend API** is an Express microservice running on port `5174` (configurable via `process.env.PORT`). It manages local telemetry, simulation catalogs, reaction balancing engines, and persistent SQLite storage.

- **Base URL**: `http://localhost:5174`
- **Content-Type**: `application/json`
- **CORS**: Enabled for cross-origin client development

---

## 1. Student Profile & Progress

### `GET /api/student`
Retrieves the active student record and all achievements.

**Response `200 OK`**:
```json
{
  "student": {
    "id": 1,
    "name": "Samuel Vinod",
    "level": 1,
    "xp": 0,
    "xp_for_level": 1000
  },
  "achievements": [
    {
      "id": 1,
      "slug": "first-burn",
      "name": "First Ignition",
      "description": "Run any experiment for the first time",
      "icon": "flame",
      "unlocked": 1
    }
  ]
}
```

---

### `PUT /api/student`
Updates the student display name, level, or experience points.

**Request Body**:
```json
{
  "name": "Samuel Vinod",
  "level": 2,
  "xp": 350,
  "xp_for_level": 1350
}
```

**Response `200 OK`**:
```json
{
  "student": {
    "id": 1,
    "name": "Samuel Vinod",
    "level": 2,
    "xp": 350,
    "xp_for_level": 1350
  }
}
```

---

## 2. Saved Experiment Bookmarks

### `GET /api/saved`
Retrieves all bookmarked experiments ordered by `created_at DESC`.

**Response `200 OK`**:
```json
[
  {
    "id": "exp-magnesium-burn",
    "experiment_id": "chem-mg",
    "title": "Magnesium Ribbon Burning",
    "discipline": "Chemistry",
    "link": "/chemistry",
    "created_at": "2026-09-04 12:40:40"
  }
]
```

---

### `POST /api/saved`
Saves or updates a bookmarked experiment simulation.

**Request Body**:
```json
{
  "id": "exp-pendulum-1",
  "experiment_id": "phys-pendulum",
  "title": "Pendulum Motion & Simple Harmonics",
  "discipline": "Physics",
  "link": "/physics"
}
```

**Response `200 OK`**: Returns the updated array of all saved experiments.

---

### `DELETE /api/saved/:id`
Removes a saved experiment bookmark by `id` or `experiment_id`.

**Parameters**:
- `:id` — ID or slug of the experiment bookmark to delete.

**Response `200 OK`**: Returns the remaining saved experiments array.

---

## 3. Completions & Telemetry

### `GET /api/completions`
Returns all verified activities completed by the student.

**Response `200 OK`**:
```json
[
  {
    "id": 1,
    "kind": "experiment",
    "ref": "Magnesium Ribbon Burning Observation",
    "completed_at": "2026-09-04 12:15:30"
  },
  {
    "id": 2,
    "kind": "quiz",
    "ref": "Chemistry Basics Quiz",
    "completed_at": "2026-09-04 12:20:10"
  }
]
```

---

### `POST /api/completions`
Records a newly verified experiment run, observation, or quiz pass. Automatically updates XP and unlocks any associated achievements.

**Request Body**:
```json
{
  "kind": "experiment",
  "ref": "Magnesium Ribbon Burning Observation",
  "xp": 80,
  "achievements": ["first-burn"]
}
```

**Response `200 OK`**:
```json
{
  "student": {
    "id": 1,
    "name": "Samuel Vinod",
    "level": 1,
    "xp": 80,
    "xp_for_level": 1000
  },
  "achievements": [...],
  "completions": [...]
}
```

---

### `POST /api/xp`
Awards experience points and triggers automatic leveling calculations.

**Request Body**:
```json
{
  "amount": 150
}
```

**Response `200 OK`**:
```json
{
  "leveled": false,
  "id": 1,
  "name": "Samuel Vinod",
  "level": 1,
  "xp": 230,
  "xp_for_level": 1000
}
```

---

## 4. Reaction Engine API

### `GET /api/reactions`
Returns the total count and catalogue of all modeled chemical reactions.

**Response `200 OK`**:
```json
{
  "count": 28,
  "reactions": [
    {
      "id": "mg-o2",
      "name": "Combustion of Magnesium",
      "equation": "2Mg + O2 -> 2MgO",
      "category": "Combustion",
      "inputs": ["Mg", "O2"],
      "outputs": ["MgO"],
      "enthalpy": -462,
      "observations": "Intense blinding white light, formation of white powder"
    }
  ]
}
```

---

### `GET /api/reactions/meta`
Returns categorical metadata, conditions, available reactants, and possible visual observations.

---

### `POST /api/reactions/match`
Evaluates a combination of reactants and environmental conditions (temperature, catalyst, electric current) and returns the resulting chemical reaction if matched.

**Request Body**:
```json
{
  "inputs": ["Mg", "HCl"],
  "conditions": ["room-temp"]
}
```

**Response `200 OK`**:
```json
{
  "matched": true,
  "reaction": {
    "id": "mg-hcl",
    "name": "Magnesium and Hydrochloric Acid",
    "equation": "Mg + 2HCl -> MgCl2 + H2",
    "category": "Single Replacement",
    "enthalpy": -112,
    "observations": "Vigorous bubbling (effervescence), exothermic heat generation"
  }
}
```
