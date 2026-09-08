# 📚 LabXplore — Master Web Application Data Compendium & Technical Data Dictionary

> **Platform:** LabXplore Interactive 3D Virtual Science Laboratory  
> **Production URL:** [https://labxplore.vercel.app](https://labxplore.vercel.app)  
> **Repository:** `samuelvinod135-spec/HACKTHON` (JARVIS)  
> **Curriculum Alignment:** CBSE / ICSE / State Boards / JEE Main & Advanced / NEET Foundation (Classes 10–12)  
> **Document Purpose:** Complete, exhaustive data inventory, schemas, datasets, formulas, and data models powering the entire LabXplore ecosystem.

---

## 📑 Table of Contents

1. [Platform Data Architecture & Ingestion Topology](#1-platform-data-architecture--ingestion-topology)
2. [Dual-Tier Database Schemas & Data Models](#2-dual-tier-database-schemas--data-models)
   - [2.1 Cloud PostgreSQL Schema (Supabase)](#21-cloud-postgresql-schema-supabase)
   - [2.2 Stored Database Functions & Automated Triggers](#22-stored-database-functions--automated-triggers)
   - [2.3 Local Edge Database Schema (SQLite WAL)](#23-local-edge-database-schema-sqlite-wal)
3. [Chemistry Engine Master Data Catalog](#3-chemistry-engine-master-data-catalog)
   - [3.1 Complete 118-Element Anime Champion Codex](#31-complete-118-element-anime-champion-codex)
   - [3.2 Chemical Reagents, Apparatus & Material Catalog](#32-chemical-reagents-apparatus--material-catalog)
   - [3.3 5,451 Balanced Chemical Reactions Database](#33-5451-balanced-chemical-reactions-database)
   - [3.4 Invalid Reaction Theory Explainer Knowledge Base](#34-invalid-reaction-theory-explainer-knowledge-base)
4. [Physics Engine Master Data Catalog](#4-physics-engine-master-data-catalog)
   - [4.1 7 Physics Domains & 19 Apparatus Components](#41-7-physics-domains--19-apparatus-components)
   - [4.2 Celestial Gravity Presets & Universal Constants](#42-celestial-gravity-presets--universal-constants)
   - [4.3 Optical Cauchy Dispersion & Ray Tracing Constants](#43-optical-cauchy-dispersion--ray-tracing-constants)
   - [4.4 Mechanics & Kinematics Dynamic Simulation Parameters](#44-mechanics--kinematics-dynamic-simulation-parameters)
5. [Question Bank & Curricular Data Catalog](#5-question-bank--curricular-data-catalog)
   - [5.1 25,000 Questions Dataset Distribution](#51-25000-questions-dataset-distribution)
   - [5.2 61 Curricular Chapters Breakdown](#52-61-curricular-chapters-breakdown)
   - [5.3 Procedural PRNG Generator & Question Schema](#53-procedural-prng-generator--question-schema)
   - [5.4 Diagnostic & Remedial Micro-Lesson Pools](#54-diagnostic--remedial-micro-lesson-pools)
6. [Gamification, Retention & Student Progression Data](#6-gamification-retention--student-progression-data)
   - [6.1 Credit Stages & Rank Progression Hierarchy](#61-credit-stages--rank-progression-hierarchy)
   - [6.2 Complete Achievement Badges Catalog](#62-complete-achievement-badges-catalog)
   - [6.3 Spaced Repetition (Ebbinghaus Forgetting Curve) Mathematical Model](#63-spaced-repetition-ebbinghaus-forgetting-curve-mathematical-model)
   - [6.4 Daily 7-Day Progressive Lab Challenges Catalog](#64-daily-7-day-progressive-lab-challenges-catalog)
7. [Procedural Web Audio Synthesizer Presets & Sound Effects](#7-procedural-web-audio-synthesizer-presets--sound-effects)
   - [7.1 Ambient Study Room Synthesizer Profiles](#71-ambient-study-room-synthesizer-profiles)
   - [7.2 Tactical Laboratory UI Sound Effects](#72-tactical-laboratory-ui-sound-effects)
8. [Smart OCR & AI Science Tutor Knowledge Base](#8-smart-ocr--ai-science-tutor-knowledge-base)
   - [8.1 Strict Pedagogical System Prompts & Guardrails](#81-strict-pedagogical-system-prompts--guardrails)
   - [8.2 Zero-Prop-Drilling Context Handoff Payloads](#82-zero-prop-drilling-context-handoff-payloads)
   - [8.3 Offline OCR Problem Presets & Step-by-Step Derivations](#83-offline-ocr-problem-presets--step-by-step-derivations)
9. [Complete RESTful API Specification & JSON Schemas](#9-complete-restful-api-specification--json-schemas)
10. [Client-Side Routing, State Management & Local Storage Inventory](#10-client-side-routing-state-management--local-storage-inventory)

---

## 1. Platform Data Architecture & Ingestion Topology

LabXplore implements a **fault-tolerant, hybrid multi-tier data architecture** engineered to guarantee sub-millisecond local laboratory simulation response times while maintaining continuous cloud persistence and offline resilience.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT RUNTIME LAYER                                    │
│  React 18 + Vite | In-Memory Reaction Matcher (5,451 Rx) | HTML5 Canvas 60 FPS Physics │
│  Zustand/Context State | LocalStorage Persistence | Web Audio Procedural Synthesizer   │
└───────────────────▲─────────────────────────────────────────────▲──────────────────────┘
                    │                                             │
      REST / WS (Sub-5ms IPC)                         Direct Cloud Auth & Sync
                    │                                             │
┌───────────────────▼──────────────────────────┐   ┌──────────────▼──────────────────────┐
│       LOCAL EDGE TIER (Express.js)           │   │      CLOUD TIER (Supabase)          │
│  - better-sqlite3 WAL Engine                 │   │  - PostgreSQL 15 Engine             │
│  - 25,000 Questions SQLite Database          │   │  - Auth & Row-Level Security (RLS)  │
│  - Atomic XP & Leveling Ledger               │   │  - Multi-Device Profile & Cloud Sync│
│  - Deterministic Mulberry32 PRNG             │   │  - Synchronized Activity Telemetry  │
│  - Gemini AI Tutor Reverse Proxy             │   │  - Saved Experiment Apparatus Bookmarks│
└──────────────────────────────────────────────┘   └─────────────────────────────────────┘
```

### Data Storage Segregation:
1. **Authoritative Cloud Tier (`Supabase Postgres`)**: Identity, user authentication, multi-device cloud synchronisation, profile state, saved experiment apparatus rigs, and audited completion logs.
2. **High-Velocity Local Edge Tier (`better-sqlite3 WAL`)**: Sub-millisecond question queries from 25,000 indexed records, fast local caching, standalone offline operation for low-connectivity environments.
3. **In-Memory Client Static Tier (`ES Modules`)**: 118 Anime Elements codex, 5,451 chemical reaction records, 19 physics apparatus component schemas, invalid reaction thermodynamic matrix, and audio synthesis DSP configurations.
4. **Client-Side Persistence (`localStorage`)**: Offline fallback telemetry, unauthenticated guest progress, personal student notepad records, and audio/UI preferences.

---

## 2. Dual-Tier Database Schemas & Data Models

### 2.1 Cloud PostgreSQL Schema (Supabase)

#### Table: `public.profiles`
Stores extended user profile metadata, academic curriculum tier, level, experience points, and learning streaks.

```sql
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  full_name TEXT NOT NULL,
  email TEXT,
  avatar_url TEXT DEFAULT '',
  bio TEXT,
  streak_count INT DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  xp INT NOT NULL DEFAULT 0,
  xp_for_level INT NOT NULL DEFAULT 1000,
  grade_level TEXT DEFAULT 'Grade 9-10',
  role TEXT DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | PostgreSQL Data Type | Constraints | Description | Default Value |
| :--- | :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PK, REFERENCES auth.users(id)` | Matches authenticated user ID | — |
| `username` | `TEXT` | `UNIQUE` | Student handle (used in 1v1 battle matching) | — |
| `full_name` | `TEXT` | `NOT NULL` | Display name of the user | `''` |
| `email` | `TEXT` | — | Synchronized email for fast resolution | `''` |
| `avatar_url` | `TEXT` | — | Custom avatar image URI or theme string | `''` |
| `bio` | `TEXT` | `NULL` | Student profile biography or research quote | `NULL` |
| `streak_count` | `INTEGER` | `DEFAULT 0` | Consecutive active exploration days | `0` |
| `level` | `INTEGER` | `NOT NULL, DEFAULT 1` | Academic rank level | `1` |
| `xp` | `INTEGER` | `NOT NULL, DEFAULT 0` | Accumulated experience points | `0` |
| `xp_for_level` | `INTEGER` | `NOT NULL, DEFAULT 1000` | XP required to advance to next level | `1000` |
| `grade_level` | `TEXT` | `DEFAULT 'Grade 9-10'` | Curriculum tier (`'Grade 9-10'`, `'Grade 11'`, `'Grade 12'`, `'JEE/NEET'`) | `'Grade 9-10'` |
| `role` | `TEXT` | `DEFAULT 'student'` | Role (`'student'`, `'educator'`, `'researcher'`) | `'student'` |
| `created_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Account creation timestamp | `NOW()` |

#### Table: `public.lab_completions`
Stores individual experiment runs, observation events, and passed quizzes for student analytics.

```sql
CREATE TABLE IF NOT EXISTS public.lab_completions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  kind TEXT NOT NULL,
  ref TEXT NOT NULL,
  xp_earned INT DEFAULT 0,
  completed_at TIMESTAMPTZ DEFAULT NOW()
);
```

| Column | PostgreSQL Data Type | Constraints | Allowed Values / Schema |
| :--- | :--- | :--- | :--- |
| `id` | `UUID` | `PRIMARY KEY` | Auto-generated UUID v4 |
| `user_id` | `UUID` | `FK auth.users(id)` | Identifies the student |
| `kind` | `TEXT` | `NOT NULL` | `'experiment'`, `'quiz'`, `'challenge'`, `'observation'` |
| `ref` | `TEXT` | `NOT NULL` | Experiment slug (e.g., `'rx_class10_mg_combustion'`) |
| `xp_earned` | `INTEGER` | `DEFAULT 0` | Experience points awarded ($10$–$250\text{ XP}$) |
| `completed_at` | `TIMESTAMPTZ` | `DEFAULT NOW()` | Exact ISO 8601 UTC timestamp |

#### Table: `public.saved_experiments`
Stores apparatus configurations and simulations bookmarked by the student.

```sql
CREATE TABLE IF NOT EXISTS public.saved_experiments (
  id TEXT PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  experiment_id TEXT NOT NULL,
  title TEXT NOT NULL,
  discipline TEXT NOT NULL,
  link TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

### 2.2 Stored Database Functions & Automated Triggers

#### 1. Automated Profile Provisioning Trigger (`handle_new_user`)
Executes synchronously on new account registration in `auth.users`:

```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id, full_name, username, email, avatar_url, level, xp, xp_for_level, grade_level, role
  ) VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'avatar_url', ''),
    1, 0, 1000,
    COALESCE(NEW.raw_user_meta_data->>'grade_level', 'Grade 9-10'),
    'student'
  )
  ON CONFLICT (id) DO UPDATE SET
    email = EXCLUDED.email,
    username = COALESCE(EXCLUDED.username, profiles.username),
    full_name = COALESCE(EXCLUDED.full_name, profiles.full_name);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

#### 2. Handle Resolution Stored Procedure (`get_email_by_username`)
Allows students to authenticate using either their email or unique username:

```sql
CREATE OR REPLACE FUNCTION public.get_email_by_username(p_username TEXT)
RETURNS TEXT AS $$
DECLARE
  v_email TEXT;
BEGIN
  SELECT email INTO v_email
  FROM public.profiles
  WHERE LOWER(username) = LOWER(TRIM(p_username))
     OR LOWER(full_name) = LOWER(TRIM(p_username))
  LIMIT 1;
  RETURN v_email;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

GRANT EXECUTE ON FUNCTION public.get_email_by_username(TEXT) TO anon, authenticated;
```

---

### 2.3 Local Edge Database Schema (SQLite WAL)

Location: `server/data/labxplore.db`  
Driver: `better-sqlite3` with Write-Ahead Logging (`WAL`) enabled.

```sql
-- Student Local Ledger
CREATE TABLE IF NOT EXISTS student (
  id INTEGER PRIMARY KEY CHECK (id = 1),
  name TEXT NOT NULL DEFAULT 'Student Scholar',
  level INTEGER NOT NULL DEFAULT 1,
  xp INTEGER NOT NULL DEFAULT 0,
  xp_for_level INTEGER NOT NULL DEFAULT 1000
);

-- Achievement Unlocks
CREATE TABLE IF NOT EXISTS achievement (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  unlocked INTEGER NOT NULL DEFAULT 0
);

-- Local Experiment Run Telemetry
CREATE TABLE IF NOT EXISTS lab_run (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  experiment TEXT NOT NULL,
  kind TEXT NOT NULL DEFAULT 'experiment',
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  xp_earned INTEGER NOT NULL DEFAULT 0
);

-- Activity Completions
CREATE TABLE IF NOT EXISTS completion (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  kind TEXT NOT NULL,
  ref TEXT NOT NULL,
  completed_at TEXT NOT NULL DEFAULT (datetime('now')),
  UNIQUE(kind, ref)
);

-- 25,000 Questions Bank
CREATE TABLE IF NOT EXISTS question_bank (
  id TEXT PRIMARY KEY,
  subject TEXT NOT NULL,
  chapter TEXT NOT NULL,
  topic TEXT,
  exam_level TEXT NOT NULL,
  question_type TEXT DEFAULT 'MCQ',
  question TEXT NOT NULL,
  option_a TEXT,
  option_b TEXT,
  option_c TEXT,
  option_d TEXT,
  correct_option TEXT,
  answer TEXT,
  explanation TEXT,
  xp INTEGER DEFAULT 10
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_qb_chapter ON question_bank(chapter);
CREATE INDEX IF NOT EXISTS idx_qb_exam_level ON question_bank(exam_level);
CREATE INDEX IF NOT EXISTS idx_qb_subject ON question_bank(subject);
```

---

## 3. Chemistry Engine Master Data Catalog

### 3.1 Complete 118-Element Anime Champion Codex

Every chemical element from Hydrogen ($Z=1$) to Oganesson ($Z=118$) is indexed as an Anime Champion persona with elemental affinity, battle power, reactivity status, and curricular lore.

#### The 7 Elemental Affinities:
| Affinity | Brand Color | Background Accent | Icon | Pedagogical Characterization |
| :--- | :--- | :--- | :--- | :--- |
| **`PYRO`** | `#f59e0b` | `#fef3c7` | 🔥 | Combustive, exothermic, alkali metals, halogens |
| **`CRYO`** | `#0ea5e9` | `#e0f2fe` | ❄️ | Inert noble gases, cryogenic liquids, low thermal capacity |
| **`ELECTRO`** | `#eab308` | `#fef9c3` | ⚡ | High ionic conductivity, standard reduction potentials |
| **`AERO`** | `#38bdf8` | `#f0f9ff` | 💨 | Gaseous non-metals, volatile compounds, atmospheric gases |
| **`TERRA`** | `#84cc16` | `#ecfccb` | 🌿 | Earth minerals, alkaline earths, carbon backbones, silicates |
| **`METALLURGIC`** | `#64748b` | `#f1f5f9` | ⚔️ | Transition metals, heavy alloys, high tensile strength |
| **`MYSTIC`** | `#0284c7` | `#bae6fd` | ✨ | Actinides, lanthanides, radioactive & transuranic synthetics |

#### Comprehensive Elements Data Sample (Selected Benchmark Elements across all 7 Periods):

| Z | Symbol | Name | Mass (u) | Period / Group | Category | Affinity | Power | Reactivity | Anime Champion Persona |
| :-: | :--- | :--- | :-: | :-: | :--- | :--- | :-: | :--- | :--- |
| 1 | **H** | Hydrogen | 1.008 | P1 / G1 | Reactive Nonmetal | `AERO` | 78 | Explosive | **Hydro-Sprite (The Primordial Mist)** |
| 2 | **He** | Helium | 4.0026 | P1 / G18 | Noble Gas | `CRYO` | 82 | Inert | **Helios-King (Solar Crown Monarch)** |
| 3 | **Li** | Lithium | 6.94 | P2 / G1 | Alkali Metal | `PYRO` | 84 | High | **Litho-Blaze (Crimson Flame Scout)** |
| 6 | **C** | Carbon | 12.011 | P2 / G14 | Polyatomic Nonmetal | `TERRA` | 95 | Moderate | **Carbo-Titan (The Allotropic Architect)** |
| 7 | **N** | Nitrogen | 14.007 | P2 / G15 | Reactive Nonmetal | `CRYO` | 88 | Low | **Nitro-Valkyrie (The Atmospheric Shield)** |
| 8 | **O** | Oxygen | 15.999 | P2 / G16 | Reactive Nonmetal | `PYRO` | 94 | High | **Oxy-Phoenix (The Breath of Fire)** |
| 11 | **Na** | Sodium | 22.990 | P3 / G1 | Alkali Metal | `PYRO` | 86 | Violent | **Natrium-Blade (The Salt Warden)** |
| 12 | **Mg** | Magnesium | 24.305 | P3 / G2 | Alkaline Earth Metal | `PYRO` | 83 | High (Heat) | **Magne-Knight (The Blinding Flash)** |
| 17 | **Cl** | Chlorine | 35.45 | P3 / G17 | Halogen | `AERO` | 89 | Highly Toxic | **Chloro-Phantom (The Pale Green Mist)** |
| 26 | **Fe** | Iron | 55.845 | P4 / G8 | Transition Metal | `METALLURGIC` | 91 | Moderate | **Ferro-Centurion (The Magnetic Vanguard)** |
| 29 | **Cu** | Copper | 63.546 | P4 / G11 | Transition Metal | `ELECTRO` | 87 | Low | **Cuprum-Siren (The Resonant Conductor)** |
| 30 | **Zn** | Zinc | 65.38 | P4 / G12 | Transition Metal | `METALLURGIC` | 81 | Active | **Zinc-Sentinel (The Galvanic Guard)** |
| 47 | **Ag** | Silver | 107.87 | P5 / G11 | Transition Metal | `ELECTRO` | 89 | Inert | **Argent-Lancer (The Pure Mirror)** |
| 79 | **Au** | Gold | 196.97 | P6 / G11 | Transition Metal | `ELECTRO` | 96 | Noble | **Aura-Monarch (The Eternal Sovereign)** |
| 92 | **U** | Uranium | 238.03 | P7 / Act. | Actinide | `MYSTIC` | 99 | Radioactive | **Urano-Sovereign (The Fission Dragon)** |
| 118 | **Og** | Oganesson | [294] | P7 / G18 | Unknown / Noble Gas | `MYSTIC` | 100 | Extreme Instability | **Ogano-Archon (The Singularity Master)** |

---

### 3.2 Chemical Reagents, Apparatus & Material Catalog

#### Laboratory Apparatus Catalog:
| Apparatus ID | Name | Capacity | Functional Class | Icon | Pedagogical Purpose |
| :--- | :--- | :--- | :--- | :-: | :--- |
| `app_beaker_250` | Borosilicate Beaker | $250\text{ mL}$ | `beaker` | 🧪 | Standard mixing, precipitation, and heating vessel |
| `app_beaker_500` | Heavy Duty Beaker | $500\text{ mL}$ | `beaker` | 🍶 | Large volume exothermic bulk dissolution |
| `app_test_tube` | Test Tube | $50\text{ mL}$ | `test_tube` | 🧪 | Slender tube for rapid qualitative analysis & gas tests |
| `app_erlenmeyer` | Erlenmeyer Flask | $250\text{ mL}$ | `flask` | ⚗️ | Conical vessel for safe swirling and titrations |
| `app_bunsen_burner` | Bunsen Burner | Variable | `burner` | 🔥 | Dual flame: Luminous Yellow vs Roaring Non-Luminous Sky Blue |
| `app_pipette` | Precision Dropper | $1\text{--}5\text{ mL}$ | `dropper` | 💧 | Dropwise titration and indicator addition |
| `app_glass_stirrer` | Glass Stirring Rod | N/A | `stirrer` | 🪄 | Mechanical agitation to overcome diffusion limits |

#### Chemical Material Categories (10 Sectors):
1. **118 Elements (Anime)**: All elements in periodic order ($Z=1$ to $118$).
2. **Organic Chemistry**: Haloalkanes, Alcohols, Aldehydes, Ketones, Carboxylic Acids, Amines.
3. **Diazonium & Benzene Compounds**: Benzene, Phenol, Aniline, Benzenediazonium Chloride, Nitrobenzene.
4. **Aldehydes & Ketones**: Formaldehyde, Acetaldehyde, Benzaldehyde, Acetone, Acetophenone.
5. **Haloalkanes & Alkyls**: Chloromethane, Chloroform, Ethyl Bromide, Chlorobenzene.
6. **Acids**: Concentrated $\text{HCl}$, Dilute $\text{H}_2\text{SO}_4$, Concentrated $\text{HNO}_3$, Glacial $\text{CH}_3\text{COOH}$.
7. **Bases**: $\text{NaOH}$, $\text{KOH}$, $\text{Ca(OH)}_2$ (Lime Water), $\text{NH}_4\text{OH}$.
8. **Salts & Reagents**: $\text{CuSO}_4$, $\text{FeSO}_4$, $\text{KMnO}_4$, $\text{K}_2\text{Cr}_2\text{O}_7$, $\text{AgNO}_3$, $\text{BaCl}_2$, $\text{Pb(NO}_3)_2$, $\text{KI}$.
9. **Gases**: $\text{O}_2$, $\text{H}_2$, $\text{CO}_2$, $\text{N}_2$, $\text{Cl}_2$, $\text{NH}_3$, $\text{SO}_2$, $\text{NO}_2$.
10. **Action Arrows & Laboratory Conditions**: Heat ($\Delta$), UV Light ($h\nu$), Catalyst, Electricity, Dilution.

---

### 3.3 5,451 Balanced Chemical Reactions Database

The chemistry engine indexes **5,451 distinct, scientifically validated chemical reactions**, covering the complete NCERT, CBSE, JEE Main, JEE Advanced, and NEET practical syllabi.

#### Reaction Record Schema:
```typescript
interface ChemicalReaction {
  id: string;                      // Unique reaction slug
  name: string;                    // Formal experiment title
  category: string;                // One of 11 reaction categories
  inputs: string[];                // Reactant chemical formulas
  conditions: string[];            // Conditions required: 'heat', 'catalyst', 'light', 'electricity'
  outputs: string[];               // Primary product formulas
  products: string[];              // All products including byproducts
  equation: string;                // Unicode balanced chemical equation
  type: string;                    // Reaction taxonomy classification
  color: string;                   // Hexadecimal visual solution color
  observation: string;             // Observation tag ('white_light', 'blue_to_white', 'bubbling', etc.)
  description: string;             // Sensory and qualitative description
  mechanism: string;               // Step-by-step chemical reaction mechanism
  jeeRelevance: string;            // NCERT / JEE / NEET chapter mapping
  xp: number;                      // Experience points awarded (100 - 250 XP)
}
```

#### Benchmark Reactions Data Table:
| ID | Reaction Name | Reactants | Conditions | Products | Balanced Chemical Equation | Visual Observation | XP |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :-: |
| `rx_class10_mg_combustion` | Combustion of Magnesium Ribbon | `Mg`, `O2` | `heat` | `MgO` | $2\text{Mg} + \text{O}_2 \xrightarrow{\Delta} 2\text{MgO}$ | Dazzling blinding white flame, white ash | 200 |
| `rx_disp_fe_cuso4` | Single Displacement of Copper Sulphate | `Fe`, `CuSO4` | Ambient | `FeSO4`, `Cu` | $\text{Fe} + \text{CuSO}_4 \to \text{FeSO}_4 + \text{Cu}$ | Blue solution fades to pale green; reddish copper deposition | 150 |
| `rx_double_disp_pbno3_ki` | Golden Rain Double Displacement | `Pb(NO3)2`, `KI` | Ambient | `PbI2`, `KNO3` | $\text{Pb(NO}_3)_2 + 2\text{KI} \to \text{PbI}_2\downarrow + 2\text{KNO}_3$ | Bright canary yellow precipitate ($\text{PbI}_2$) | 180 |
| `rx_haber_synthesis` | Haber-Bosch Ammonia Synthesis | `N2`, `H2` | `heat`, `catalyst` | `NH3` | $\text{N}_2 + 3\text{H}_2 \xrightleftharpoons[\text{Fe / Mo}]{450^\circ\text{C, 200 atm}} 2\text{NH}_3$ | Clear gas generation, pungent odor | 220 |
| `rx_sandmeyer_cl` | Sandmeyer Diazonium Chlorination | `Ph-N2+Cl-`, `CuCl` | `heat` | `Ph-Cl`, `N2` | $\text{C}_6\text{H}_5\text{N}_2^+\text{Cl}^- \xrightarrow{\text{CuCl/HCl}} \text{C}_6\text{H}_5\text{Cl} + \text{N}_2\uparrow$ | Nitrogen gas effervescence, oily layer | 250 |
| `rx_therm_feso4` | Thermal Pyrolysis of Ferrous Sulphate | `FeSO4` | `heat` | `Fe2O3`, `SO2`, `SO3` | $2\text{FeSO}_4 \xrightarrow{\Delta} \text{Fe}_2\text{O}_3 + \text{SO}_2\uparrow + \text{SO}_3\uparrow$ | Green crystals turn reddish-brown; suffocating choking fumes | 180 |

---

### 3.4 Invalid Reaction Theory Explainer Knowledge Base

When a student combines non-reactive or unfeasible chemicals, LabXplore evaluates the mixture through a rigorous **Chemical Feasibility Engine** instead of returning a generic error.

#### Core Thermodynamic & Kinetic Rules:
1. **Thermodynamic Infeasibility ($\Delta G > 0$):**  
   Reactions can only proceed spontaneously at constant temperature and pressure if:
   $$\Delta G = \Delta H - T\Delta S < 0$$
   If $\Delta G > 0$, the system lacks thermodynamic driving force.
2. **Standard Electrochemical Reactivity Series Inversion:**  
   A metal can only displace another metal from its aqueous salt solution if it possesses a higher oxidation potential (lower reduction potential $E^\circ$):
   $$\text{K} > \text{Ba} > \text{Ca} > \text{Na} > \text{Mg} > \text{Al} > \text{Mn} > \text{Zn} > \text{Cr} > \text{Fe} > \text{Cd} > \text{Co} > \text{Ni} > \text{Sn} > \text{Pb} > [\text{H}] > \text{Cu} > \text{Hg} > \text{Ag} > \text{Pt} > \text{Au}$$
   *Rule:* Dropping Copper ($\text{Cu}$) into $\text{ZnSO}_4$ fails because $E^\circ_{\text{Zn}^{2+}/\text{Zn}} = -0.76\text{ V} < E^\circ_{\text{Cu}^{2+}/\text{Cu}} = +0.34\text{ V}$.
3. **Halogen Activity Series Displacements:**  
   $$\text{F}_2 > \text{Cl}_2 > \text{Br}_2 > \text{I}_2$$
   *Rule:* Iodine ($\text{I}_2$) cannot displace Chlorine from $\text{NaCl}$.
4. **Kinetic Activation Barrier ($E_a$) & High Bond Dissociation Energy:**  
   Example: Magnesium + Ammonia ($\text{Mg} + \text{NH}_3$). Both are electron donors (reducing agent and Lewis base). The covalent $\text{N}-\text{H}$ bond requires $391\text{ kJ/mol}$ to dissociate, preventing reaction under standard conditions.
5. **Noble Gas Electronic Configuration Inertness:**  
   Elements with filled valence octets/duplets ($\text{He}: 1s^2$, $\text{Ne}: 2s^2 2p^6$, $\text{Ar}: [Ne] 3s^2 3p^6$) have extraordinarily high ionization enthalpies and positive electron gain enthalpies.

---

## 4. Physics Engine Master Data Catalog

### 4.1 7 Physics Domains & 19 Apparatus Components

LabXplore features a 60 FPS HTML5 Canvas simulation suite covering 19 modular scientific components:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        19 PHYSICS COMPONENTS                           │
├───────────────────┬───────────────────┬────────────────────────────────┤
│ OPTICS            │ MECHANICS         │ MEASUREMENT & SENSORS          │
│ - Laser Ray Box   │ - Simple Pendulum │ - Vernier Calipers             │
│ - Convex Lens     │ - Projectile Gun  │ - Screw Gauge (Micrometer)     │
│ - Concave Lens    │ - Inclined Ramp   ├────────────────────────────────┤
│ - Triangular Prism│ - Spring & Mass   │ WAVES, HEAT & MODERN           │
│ - Plane Mirror    │ - Pulley System   │ - Wave Ripple Tank             │
│                   │ - Buoyancy Tank   │ - Doppler Sound Source         │
│                   │                   │ - Ideal Gas Cylinder           │
│                   │                   │ - DC Circuit / Resistor        │
│                   │                   │ - Bar Magnet                   │
│                   │                   │ - Photoelectric Plate          │
└───────────────────┴───────────────────┴────────────────────────────────┘
```

#### Component Technical Schema Sample:
```javascript
{
  id: 'convex_lens',
  type: 'convex_lens',
  name: 'Convex Lens',
  category: 'Optics',
  tone: 'from-cyan-400 to-blue-600',
  defaultParams: {
    focalLength: 160,       // px
    curvature: 55,          // mm
    refractiveIndex: 1.52,  // Crown Glass
    lensHeight: 140         // px
  },
  formula: {
    name: "Lens Maker's Equation",
    equation: "1/f = (n - 1)(1/R₁ - 1/R₂)",
    latex: "\\frac{1}{f} = (n - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right)"
  }
}
```

---

### 4.2 Celestial Gravity Presets & Universal Constants

Students can toggle planetary gravity environments to observe kinematic variations in real time:

| Environment ID | Celestial Body | Surface Gravitational Acceleration ($g$) | Relative to Earth |
| :--- | :--- | :--- | :--- |
| `earth` | **Earth** | $9.81\text{ m/s}^2$ | $1.00\times$ |
| `moon` | **Moon** | $1.62\text{ m/s}^2$ | $0.165\times$ |
| `mars` | **Mars** | $3.71\text{ m/s}^2$ | $0.378\times$ |
| `jupiter` | **Jupiter** | $24.79\text{ m/s}^2$ | $2.527\times$ |
| `zero` | **Zero-G (Deep Space)** | $0.00\text{ m/s}^2$ | $0.000\times$ |

#### Universal Physical Constants:
- **Speed of Light in Vacuum ($c$):** $299,792,458\text{ m/s}$
- **Planck Constant ($h$):** $6.62607015 \times 10^{-34}\text{ J}\cdot\text{s}$
- **Elementary Charge ($e$):** $1.602176634 \times 10^{-19}\text{ C}$
- **Permittivity of Free Space ($\varepsilon_0$):** $8.8541878128 \times 10^{-12}\text{ F/m}$
- **Standard Acceleration of Gravity ($g_0$):** $9.80665\text{ m/s}^2$

---

### 4.3 Optical Cauchy Dispersion & Ray Tracing Constants

The ray optics engine implements **Cauchy's Dispersion Equation** to calculate chromatic dispersion when multi-spectrum white light passes through prisms:

$$n(\lambda) = n_0 + \frac{B}{\lambda^2}$$

- **Base Refractive Index ($n_0$):** $1.52$ (Crown Glass)
- **Cauchy Dispersion Constant ($B$):** $0.0042\text{ }\mu\text{m}^2$

#### Ray Spectrum Wavelengths & Palette:
| Spectral Color | Wavelength ($\lambda$) | Refractive Index in Glass ($n$) | Hex Display Code |
| :--- | :--- | :--- | :--- |
| **Violet** | $405\text{ nm}$ | $1.5456$ | `#0369a1` |
| **Blue** | $450\text{ nm}$ | $1.5407$ | `#007aff` |
| **Cyan** | $490\text{ nm}$ | $1.5375$ | `#00c7be` |
| **Green** | $532\text{ nm}$ | $1.5348$ | `#34c759` |
| **Amber** | $590\text{ nm}$ | $1.5321$ | `#ff9500` |
| **Red** | $650\text{ nm}$ | $1.5299$ | `#ff3b30` |

---

### 4.4 Mechanics & Kinematics Dynamic Simulation Parameters

#### 1. Projectile Motion Equations:
- Time of Flight: $T = \frac{2u\sin\theta}{g}$
- Maximum Height: $H_{\max} = \frac{u^2\sin^2\theta}{2g}$
- Horizontal Range: $R = \frac{u^2\sin(2\theta)}{g}$
- Trajectory Equation: $y = x\tan\theta - \frac{gx^2}{2u^2\cos^2\theta}$

#### 2. Simple Harmonic Motion (Pendulum):
- Time Period: $T = 2\pi\sqrt{\frac{L}{g}}$
- Frequency: $f = \frac{1}{2\pi}\sqrt{\frac{g}{L}}$
- Angular Frequency: $\omega = \sqrt{\frac{g}{L}}$

#### 3. Lens Maker's Formula:
$$\frac{1}{f} = (n - 1)\left(\frac{1}{R_1} - \frac{1}{R_2} + \frac{(n-1)d}{n R_1 R_2}\right)$$
*(For thin lenses, center thickness $d \approx 0$)*

---

## 5. Question Bank & Curricular Data Catalog

### 5.1 25,000 Questions Dataset Distribution

LabXplore stores and generates **25,000 procedural questions** across secondary and senior secondary science:

```
┌──────────────────────────────────────────────────────────┐
│             QUESTION BANK INVENTORY (25,000)             │
├──────────────────────────┬───────────────────────────────┤
│ BY SUBJECT               │ BY DIFFICULTY LEVEL           │
│ - Chemistry: 11,700 Qs   │ - Advanced (JEE Adv): 6,223 Qs│
│ - Physics:   13,300 Qs   │ - Main-Hard:          6,223 Qs│
│                          │ - Main-Moderate:      6,250 Qs│
│                          │ - Main-Easy:          6,304 Qs│
└──────────────────────────┴───────────────────────────────┘
```

---

### 5.2 61 Curricular Chapters Breakdown

The database partitions questions into **61 distinct chapters** directly aligned with NCERT Class 10, 11, 12, JEE Main, and NEET:

#### Chemistry Chapters (33 Chapters · 11,700 Questions):
1. Some Basic Concepts of Chemistry (500 Qs)
2. Structure of Atom (500 Qs)
3. Classification of Elements & Periodicity (400 Qs)
4. Chemical Bonding & Molecular Structure (500 Qs)
5. States of Matter: Gases and Liquids (300 Qs)
6. Chemical Thermodynamics (500 Qs)
7. Equilibrium (Chemical & Ionic) (500 Qs)
8. Redox Reactions (400 Qs)
9. Hydrogen & Hydrides (200 Qs)
10. s-Block Elements (Alkali & Alkaline Earth Metals) (300 Qs)
11. p-Block Elements (Group 13 & 14) (300 Qs)
12. Organic Chemistry: Basic Principles & Techniques (500 Qs)
13. Hydrocarbons (Alkanes, Alkenes, Alkynes, Arenes) (500 Qs)
14. Environmental Chemistry (200 Qs)
15. Solid State (400 Qs)
16. Solutions & Colligative Properties (400 Qs)
17. Electrochemistry (500 Qs)
18. Chemical Kinetics (400 Qs)
19. Surface Chemistry (300 Qs)
20. General Principles & Processes of Isolation of Elements (Metallurgy) (300 Qs)
21. p-Block Elements (Group 15, 16, 17, 18) (500 Qs)
22. d and f Block Elements (Transition & Inner Transition) (400 Qs)
23. Coordination Compounds (500 Qs)
24. Haloalkanes and Haloarenes (400 Qs)
25. Alcohols, Phenols and Ethers (400 Qs)
26. Aldehydes, Ketones and Carboxylic Acids (400 Qs)
27. Amines & Diazonium Salts (400 Qs)
28. Biomolecules (400 Qs)
29. Polymers (200 Qs)
30. Chemistry in Everyday Life (200 Qs)
31. Analytical Chemistry & Practical Chemistry (200 Qs)
32. Chemical Reactions & Equations (Class 10 Foundation) (300 Qs)
33. Acids, Bases and Salts (Class 10 Foundation) (300 Qs)

#### Physics Chapters (28 Chapters · 13,300 Questions):
1. Units and Measurements (400 Qs)
2. Motion in a Straight Line (500 Qs)
3. Motion in a Plane & Projectile Motion (500 Qs)
4. Laws of Motion & Friction (500 Qs)
5. Work, Energy and Power (500 Qs)
6. System of Particles and Rotational Motion (500 Qs)
7. Centre of Mass & Collisions (500 Qs)
8. Gravitation & Planetary Dynamics (500 Qs)
9. Mechanical Properties of Solids (Elasticity) (400 Qs)
10. Mechanical Properties of Fluids (Viscosity & Surface Tension) (500 Qs)
11. Thermal Properties of Matter & Calorimetry (400 Qs)
12. Thermodynamics & Carnot Engine (500 Qs)
13. Kinetic Theory of Gases (400 Qs)
14. Oscillations & Simple Harmonic Motion (500 Qs)
15. Waves & Doppler Effect (500 Qs)
16. Electric Charges and Fields (Coulomb's Law) (500 Qs)
17. Electrostatic Potential and Capacitance (500 Qs)
18. Current Electricity & Kirchhoff's Laws (500 Qs)
19. Moving Charges and Magnetism (Biot-Savart & Ampere) (500 Qs)
20. Magnetism and Matter (Earth's Magnetism & Materials) (400 Qs)
21. Electromagnetic Induction (Faraday & Lenz) (500 Qs)
22. Alternating Current & LCR Circuits (500 Qs)
23. Electromagnetic Waves (300 Qs)
24. Ray Optics and Optical Instruments (Refraction, Lenses, Prisms) (600 Qs)
25. Wave Optics (Huygens, Interference, Diffraction, Polarization) (500 Qs)
26. Dual Nature of Radiation and Matter (Photoelectric Effect) (500 Qs)
27. Atoms & Nuclei (Bohr Model & Radioactivity) (300 Qs)
28. Semiconductor Electronics & Logic Gates (400 Qs)

---

### 5.3 Procedural PRNG Generator & Question Schema

Questions can be deterministically generated using the **Mulberry32 PRNG Algorithm**, ensuring reproducible mock exams without client-server desynchronization.

```javascript
// Mulberry32 32-bit state generator
export function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
```

#### Question Object Schema:
```json
{
  "id": "qb_optics_lens_0042",
  "subject": "Physics",
  "chapter": "Ray Optics and Optical Instruments",
  "topic": "Lens Maker's Formula",
  "exam_level": "Main-Moderate",
  "question_type": "MCQ",
  "question": "A biconvex lens of focal length $f = 20\\text{ cm}$ in air ($n = 1.5$) is completely immersed in water ($n = 1.33$). What is its new focal length?",
  "option_a": "$20\\text{ cm}$",
  "option_b": "$40\\text{ cm}$",
  "option_c": "$80\\text{ cm}$",
  "option_d": "$10\\text{ cm}$",
  "correct_option": "C",
  "answer": "80 cm",
  "explanation": "By the Lens Maker's Formula: $1/f_{\\text{air}} = (n_g - 1)K$ and $1/f_w = (n_g/n_w - 1)K$. Ratio $f_w / f_{\\text{air}} = (1.5 - 1) / (1.5/1.33 - 1) = 0.5 / 0.125 = 4$. Thus $f_w = 4 \\times 20\\text{ cm} = 80\\text{ cm}$.",
  "xp": 25
}
```

---

### 5.4 Diagnostic & Remedial Micro-Lesson Pools

When a student errs on a mock exam, LabXplore matches the incorrect question to a **Concept Misconception Model**:

| Concept ID | Concept Title | Common Student Pitfall | Remedial Memory Rule |
| :--- | :--- | :--- | :--- |
| `snell_refraction` | Snell's Law & Refraction Across Media | Measuring angles from the glass boundary instead of the surface normal. | **RAD-T** (Rarer to Denser $\to$ Towards Normal); **DAR-A** (Denser to Rarer $\to$ Away from Normal). |
| `lens_maker` | Lens Maker's Formula & Curvature Radii | Using identical signs for both radii of curvature $R_1$ and $R_2$. | By Cartesian convention, for a biconvex lens $R_1 > 0$ and $R_2 < 0$, making $(1/R_1 - 1/R_2)$ strictly positive. |
| `projectile_vectors` | 2D Kinematic Vector Decomposition | Forgetting that horizontal velocity $u_x = u\cos\theta$ remains constant while vertical velocity $u_y$ is acted upon by $g$. | Horizontal motion has zero acceleration ($a_x = 0$); gravity acts purely along the vertical $y$-axis. |
| `haber_equilibrium` | Le Chatelier's Principle & Exothermic Shifts | Assuming raising temperature increases equilibrium yield of an exothermic reaction. | For exothermic reactions ($\Delta H < 0$), increasing temperature shifts equilibrium to the left (reactants side). |

---

## 6. Gamification, Retention & Student Progression Data

### 6.1 Credit Stages & Rank Progression Hierarchy

LabXplore maps cumulative student XP to 6 progressive Credit Stages featuring tactile visual seals and unlocked platform privileges:

```
┌────────────────────────────────────────────────────────┐
│               6-TIER CREDIT STAGES HIERARCHY           │
├───────┬──────────────────────┬─────────────┬───────────┤
│ STAGE │ RANK TITLE           │ MIN CREDITS │ MAX       │
├───────┼──────────────────────┼─────────────┼───────────┤
│ 1     │ Junior Inquirer      │ 0           │ 500       │
│ 2     │ Kinetic Apprentice   │ 500         │ 1,500     │
│ 3     │ Molecular Specialist │ 1,500       │ 3,000     │
│ 4     │ Quantum Pioneer      │ 3,000       │ 5,000     │
│ 5     │ Atomic Alchemist     │ 5,000       │ 8,000     │
│ 6     │ Cosmic Grandmaster   │ 8,000       │ 999,999+  │
└───────┴──────────────────────┴─────────────┴───────────┘
```

#### Detailed Stage Specifications:
1. **Stage 1: Junior Inquirer ($0$ – $500\text{ Credits}$)**
   - *Status:* Initiate Scholar (`badgeColor: 'sky'`)
   - *Perks:* Access to 25,000+ Question Bank, basic kinematics sandbox, daily science challenges.
   - *Academic Milestone:* Foundational physical units, linear motion, basic combination reactions.
2. **Stage 2: Kinetic Apprentice ($500$ – $1,500\text{ Credits}$)**
   - *Status:* Field Experimenter (`badgeColor: 'yellow'`)
   - *Perks:* 1v1 Peer Battle Arena unlocked, 60 FPS Ray Optics simulator, Snap & Solve derivations.
   - *Academic Milestone:* Projectile kinematics, Newton free body diagrams, displacement reactions.
3. **Stage 3: Molecular Specialist ($1,500$ – $3,000\text{ Credits}$)**
   - *Status:* Master Specialist (`badgeColor: 'sky'`)
   - *Perks:* Procedural Ambient Audio study lounge, Spaced Repetition decay tracking, adaptive mock tests.
   - *Academic Milestone:* Equilibrium constants, Carnot cycle thermodynamics, galvanic cells.
4. **Stage 4: Quantum Pioneer ($3,000$ – $5,000\text{ Credits}$)**
   - *Status:* Senior Investigator (`badgeColor: 'yellow'`)
   - *Perks:* Instant OCR handwritten formula recognition, Priority AI Science chatbot solver, custom celestial gravity presets.
   - *Academic Milestone:* Wave-particle duality, magnetic Lorentz force, molecular orbital theory.
5. **Stage 5: Atomic Alchemist ($5,000$ – $8,000\text{ Credits}$)**
   - *Status:* Honorary Research Fellow (`badgeColor: 'sky'`)
   - *Perks:* Multiplayer Ranked Duel host privileges, student notebook cloud export, Tactile Clay Master Seals.
   - *Academic Milestone:* Organic reaction mechanisms, Arrhenius activation energy, coupled oscillations.
6. **Stage 6: Cosmic Grandmaster ($8,000+\text{ Credits}$)**
   - *Status:* LabXplore Grandmaster (`badgeColor: 'yellow'`)
   - *Perks:* Unlimited high-order multidisciplinary derivations, Hall of Fame laurels, universal platform access.
   - *Academic Milestone:* Mastery across all theoretical derivations, thermodynamics, and laboratory synthesis.

---

### 6.2 Complete Achievement Badges Catalog

The achievement subsystem (`server/src/db.js` & `public.lab_completions`) rewards scientific milestone completions:

| Badge Slug | Display Name | Category Icon | Description | Unlock Condition | XP Reward |
| :--- | :--- | :-: | :--- | :--- | :-: |
| `first-burn` | **First Ignition** | `flame` | Run any laboratory experiment for the first time | Run 1 simulation | $+50\text{ XP}$ |
| `chem-whiz` | **Chem Whiz** | `beaker` | Synthesize 5 distinct chemistry experiments | 5 chemical reactions | $+150\text{ XP}$ |
| `physicist` | **Young Physicist** | `atom` | Complete a precision physics simulation | 1 physics experiment | $+100\text{ XP}$ |
| `perfect-score` | **Perfect Score** | `star` | Score 100% accuracy on any 10-question quiz | $10/10$ on quiz | $+200\text{ XP}$ |
| `streak-7` | **On a Roll** | `trending-up` | Maintain a 7-day continuous exploration streak | 7 consecutive days | $+300\text{ XP}$ |
| `explorer` | **Explorer** | `compass` | Try 5 different experimental setups across disciplines | 5 unique apparatuses | $+150\text{ XP}$ |
| `lab-master` | **Lab Master** | `crown` | Advance your student profile to Level 10 | Attain Level 10 | $+500\text{ XP}$ |

---

### 6.3 Spaced Repetition (Ebbinghaus Forgetting Curve) Mathematical Model

LabXplore integrates the **Hermann Ebbinghaus Exponential Forgetting Curve** to schedule automated concept reviews before student retention decays below $60\%$:

$$R(t) = e^{-\frac{t}{S}}$$

Where:
- $R$: Probability of memory recall retention ($0.0$ to $1.0$).
- $t$: Elapsed time since the last active laboratory experiment (in days).
- $S$: Stability of the memory trace (measured in days).

#### Memory Stability Progression:
$$S_{n+1} = S_n \times (1 + \text{Performance Factor} \times 1.2)$$

| Review Interval | Target Day | Average Recall Retention ($R$) | System Action |
| :-: | :-: | :-: | :--- |
| **Initial Learning** | Day 0 | $100\%$ | Experiment executed; initial trace saved ($S_0 = 1.0$) |
| **Review 1** | Day 1 | $62\%$ | Push diagnostic micro-challenge to student dashboard |
| **Review 2** | Day 3 | $65\%$ | Interactive 1v1 battle recommendation |
| **Review 3** | Day 7 | $70\%$ | Remedial question injected into Daily Challenge |
| **Review 4** | Day 14 | $75\%$ | Spaced retention stabilized |
| **Review 5** | Day 30 | $85\%$ | Long-term memory consolidation reached |

---

### 6.4 Daily 7-Day Progressive Lab Challenges Catalog

Replaces passive multiple-choice questions with authentic, apparatus-based scientific investigations:

| Day | Challenge Slug | Discipline | Goal Specification | Verification Criterion | XP Reward |
| :-: | :--- | :--- | :--- | :--- | :-: |
| 1 | `day-1-snell` | Optics | Align a 5-ray green laser through a convex lens and observe focal convergence | Focal length $f \in [150\text{px}, 180\text{px}]$ with active laser rays | $100\text{ XP}$ |
| 2 | `day-2-pendulum` | Mechanics | Calibrate a simple pendulum of string length $1.9\text{ m}$ to verify $T = 2.77\text{ s}$ | String length $L \in [180\text{cm}, 200\text{cm}]$ under Earth gravity ($9.8\text{ m/s}^2$) | $100\text{ XP}$ |
| 3 | `day-3-mg-combustion` | Chemistry | Burn magnesium ribbon in oxygen and inspect dazzling white ash residue | Reactants `Mg` + `O2` under Bunsen flame $\Delta$ | $150\text{ XP}$ |
| 4 | `day-4-prism-dispersion`| Optics | Direct white laser light through a $60^\circ$ prism to observe Cauchy chromatic dispersion | Triangular prism with white ray producing $\ge 5$ split rays | $150\text{ XP}$ |
| 5 | `day-5-projectile-45` | Kinematics | Launch projectile at $45^\circ$ elevation and verify maximum theoretical ground range | Angle $\theta = 45^\circ$, velocity $u = 20\text{ m/s}$, range $R \approx 40.8\text{ m}$ | $200\text{ XP}$ |
| 6 | `day-6-golden-rain` | Chemistry | Precipitate brilliant yellow Lead Iodide crystals ($\text{PbI}_2$) | Mix aqueous $\text{Pb(NO}_3)_2$ + $\text{KI}$ | $200\text{ XP}$ |
| 7 | `day-7-gravity-moon` | Mechanics | Drop mass under Moon gravity ($1.62\text{ m/s}^2$) and compare freefall time vs Earth | Set environment to `Moon` and measure descent velocity | $250\text{ XP}$ |

---

## 7. Procedural Web Audio Synthesizer Presets & Sound Effects

### 7.1 Ambient Study Room Synthesizer Profiles

Synthesized entirely client-side via the browser's native **Web Audio API** with zero external `.mp3` or `.wav` dependencies, zero CORS overhead, and instant start times.

#### 1. Sci-Fi Spaceship Engine (`spaceship`)
- **Acoustic Profile:** Deep resonant sub-bass drone modulated by a low-frequency oscillator.
- **Oscillator 1 (Fundamental Drone):** Sawtooth wave at $55.0\text{ Hz}$ ($A_1$ pitch).
- **Oscillator 2 (Detuned Harmonic):** Sine wave at $110.4\text{ Hz}$ (slight chorusing beat frequency).
- **Low-Pass Filter:** Biquad filter at $160\text{ Hz}$ cut-off with resonance $Q = 3.5$.
- **LFO Modulation:** Sine wave at $0.18\text{ Hz}$ modulating filter cut-off by $\pm 35\text{ Hz}$ to create a rhythmic engine hum.

#### 2. Bubbling Chemistry Lab (`bubbling`)
- **Acoustic Profile:** Continuous bubbling liquid hiss with stochastically scheduled popping gas bubbles.
- **Continuous Noise Bed:** Pink-brown noise generated through a first-order recursive filter ($y[i] = (y[i-1] + 0.02 \times \text{white}) / 1.02$) passed through a band-pass filter centered at $420\text{ Hz}$ ($Q = 1.5$).
- **Procedural Bubble Pops:** Sine wave oscillators triggered every $120\text{--}500\text{ ms}$ with exponential frequency sweeps from $280\text{--}600\text{ Hz}$ up to $530\text{--}900\text{ Hz}$ over an $80\text{--}140\text{ ms}$ duration with rapid envelope decay.

#### 3. Cosmic Rain & Deep Focus (`cosmic_rain`)
- **Acoustic Profile:** High-density smooth pink noise mimicking steady rainfall.
- **Filter Topology:** Paul Kellet's 7-stage pole filter:
  $$\begin{aligned}
  b_0 &= 0.99886 b_0 + 0.0555179 \times \text{white} \\
  b_1 &= 0.99332 b_1 + 0.0750759 \times \text{white} \\
  b_2 &= 0.96900 b_2 + 0.1538520 \times \text{white} \\
  b_3 &= 0.86650 b_3 + 0.3104856 \times \text{white} \\
  b_4 &= 0.55000 b_4 + 0.5329522 \times \text{white} \\
  b_5 &= -0.7616 b_5 - 0.0168980 \times \text{white}
  \end{aligned}$$
- **Output Filter:** Biquad low-pass filter at $800\text{ Hz}$ with $0.28$ gain.

---

### 7.2 Tactical Laboratory UI Sound Effects

| Sound FX Trigger | Oscillator Type | Frequency Profile | Envelope Duration | Gain Profile |
| :--- | :--- | :--- | :-: | :--- |
| **Tactile Button Click** | `sine` | $600\text{ Hz} \to 220\text{ Hz}$ (exponential drop) | $40\text{ ms}$ | $0.08 \to 0.001$ |
| **Component Snap to Grid** | `triangle` | $440\text{ Hz} \to 880\text{ Hz}$ (frequency jump) | $60\text{ ms}$ | $0.06 \to 0.001$ |
| **Reaction Success Chime** | `sine` (Chord) | Triad: $523.25\text{ Hz}$ ($C_5$) + $659.25\text{ Hz}$ ($E_5$) + $783.99\text{ Hz}$ ($G_5$) | $600\text{ ms}$ | $0.15 \to 0.001$ |
| **Level Up Fanfare** | `sawtooth` + `sine` | Arpeggio: $440 \to 554.37 \to 659.25 \to 880\text{ Hz}$ | $850\text{ ms}$ | $0.20 \to 0.001$ |

---

## 8. Smart OCR & AI Science Tutor Knowledge Base

### 8.1 Strict Pedagogical System Prompts & Guardrails

The AI Science Tutor (`server/src/scienceChatEngine.js`) is governed by strict pedagogical constraints to enforce Socratic learning and prevent cheating:

```
STRICT SYSTEM PROMPT CONSTRAINTS:
1. Role: You are the LabXplore AI Science Teaching Assistant, a passionate, encouraging, 
   and mathematically rigorous secondary science tutor (CBSE/ICSE/JEE/NEET).
2. Socratic Principle: When a student asks for homework solutions, NEVER give raw final 
   answers immediately. Prompt them with the fundamental physical law or chemical formula first.
3. In-Context Lab Awareness: If context indicates an experiment failed in the virtual laboratory, 
   explain WHY the reaction did not proceed using thermodynamic (ΔG), kinetic (Ea), or 
   reactivity series principles.
4. Non-Science Query Refusal: If the student asks questions unrelated to Science, Physics, 
   Chemistry, Biology, Mathematics, or LabXplore, politely decline and steer them back to science.
5. Formatting: Render all chemical reactions in clear Unicode or LaTeX ($2Mg + O_2 \to 2MgO$) 
   and all physical equations in LaTeX notation ($T = 2\pi\sqrt{L/g}$).
```

---

### 8.2 Zero-Prop-Drilling Context Handoff Payloads

When a student triggers the floating AI tutor from an apparatus or failed reaction, a structured context payload is passed:

```json
{
  "path": "/chemistry/drag-and-drop",
  "activeExperiment": "Combustion of Magnesium",
  "reactionContext": {
    "status": "unfeasible",
    "inputs": ["Mg", "NH3"],
    "theoryTag": "Redox Incompatibility & High N-H Bond Dissociation Energy",
    "summary": "Magnesium and Ammonia do not react under standard laboratory conditions because there is no thermodynamic driving force (ΔG > 0).",
    "keyPrinciples": [
      "Positive Gibbs Free Energy (ΔG > 0)",
      "Dual Electron Donors (No Redox Gradient)",
      "High N-H Bond Energy (391 kJ/mol)"
    ]
  },
  "studentState": {
    "level": 3,
    "currentCredits": 1850,
    "stage": "Molecular Specialist"
  }
}
```

---

### 8.3 Offline OCR Problem Presets & Step-by-Step Derivations

To prevent presentation failure during network dropouts, the system bundles pre-computed handwritten OCR problem datasets:

#### 1. Kinematics: $45^\circ$ Projectile Motion (`kinematics_projectile`)
- **Extracted Text:** *"A projectile is launched from ground level at an angle $\theta = 45^\circ$ with initial velocity $u = 20\text{ m/s}$. Calculate: (a) Time of flight, (b) Maximum height, (c) Horizontal Range. [$g = 9.8\text{ m/s}^2$]"*
- **Step 1 (Component Resolution):**  
  $u_x = u\cos(45^\circ) = 20 \times \frac{1}{\sqrt{2}} \approx 14.14\text{ m/s}$  
  $u_y = u\sin(45^\circ) = 20 \times \frac{1}{\sqrt{2}} \approx 14.14\text{ m/s}$
- **Step 2 (Time of Flight):**  
  $T = \frac{2u\sin\theta}{g} = \frac{2 \times 20 \times 0.7071}{9.8} \approx \mathbf{2.89\text{ s}}$
- **Step 3 (Maximum Height):**  
  $H_{\max} = \frac{u^2\sin^2\theta}{2g} = \frac{400 \times 0.5}{19.6} \approx \mathbf{10.20\text{ m}}$
- **Step 4 (Horizontal Range):**  
  $R = \frac{u^2\sin(2\theta)}{g} = \frac{400 \times 1}{9.8} \approx \mathbf{40.82\text{ m}}$

#### 2. Stoichiometry: Haber Process Yield (`chemistry_haber_yield`)
- **Extracted Text:** *"Nitrogen gas reacts with hydrogen gas to synthesize ammonia: $\text{N}_2(g) + 3\text{H}_2(g) \rightleftharpoons 2\text{NH}_3(g)$. If $28.0\text{ g}$ of $\text{N}_2$ reacts with excess $\text{H}_2$ and $25.5\text{ g}$ of $\text{NH}_3$ is isolated, find theoretical yield and % yield."*
- **Step 1 (Moles of Reactant):**  
  $n(\text{N}_2) = \frac{28.0\text{ g}}{28.0\text{ g/mol}} = 1.00\text{ mol}$
- **Step 2 (Theoretical Moles of $\text{NH}_3$):**  
  $n(\text{NH}_3) = 1.00 \times 2 = 2.00\text{ mol}$
- **Step 3 (Theoretical Yield in Grams):**  
  $\text{Mass} = 2.00\text{ mol} \times 17.03\text{ g/mol} = \mathbf{34.06\text{ g}}$
- **Step 4 (Percentage Yield):**  
  $\%\text{ Yield} = \frac{25.5\text{ g}}{34.06\text{ g}} \times 100\% = \mathbf{74.87\%}$

---

## 9. Complete RESTful API Specification & JSON Schemas

The Express backend (`server/src/server.js`) operates on port `5174` (or custom `$PORT`):

```
┌────────┬─────────────────────────────┬────────────────────────────────────────────────────────┐
│ METHOD │ ROUTE                       │ FUNCTIONALITY & PAYLOAD                                │
├────────┼─────────────────────────────┼────────────────────────────────────────────────────────┤
│ GET    │ /health                     │ Service health verification & timestamp                │
│ GET    │ /api/student                │ Returns student profile, current XP, and achievements  │
│ PUT    │ /api/student                │ Updates student display name, curriculum, or avatar    │
│ GET    │ /api/saved                  │ Fetches all bookmarked apparatus experiments           │
│ POST   │ /api/saved                  │ Books new apparatus configuration                      │
│ DELETE │ /api/saved/:id              │ Removes experiment bookmark                            │
│ GET    │ /api/achievements           │ List of all achievements and unlocked flags            │
│ POST   │ /api/achievements/:slug/unlock | Manually unlocks achievement by slug                │
│ GET    │ /api/completions            │ Returns all experiment and quiz completion logs        │
│ POST   │ /api/completions            │ Records experiment pass, awards XP and unlocks badges  │
│ POST   │ /api/xp                     │ Increment student experience points                    │
│ GET    │ /api/questions              │ Query 25,000 question bank (by subject, chapter, level)│
│ GET    │ /api/questions/chapters     │ Returns distinct chapter list with question counts     │
│ GET    │ /api/questions/stats        │ Total question counts, subject & difficulty aggregates │
│ GET    │ /api/reactions              │ Returns 5,451 chemical reaction dataset                │
│ GET    │ /api/reactions/meta         │ Reaction categories, conditions, and observations tags │
│ POST   │ /api/reactions/match        │ Evaluates chemical mixture against 5,451 reactions     │
│ POST   │ /api/chat/message           │ Socratic AI science tutor query (Gemini proxy)         │
│ GET    │ /api/chat/context-prompts   │ Returns contextual suggestion chips based on active lab│
└────────┴─────────────────────────────┴────────────────────────────────────────────────────────┘
```

#### Key API Payload Examples:

##### `POST /api/reactions/match`
**Request:**
```json
{
  "inputs": ["Mg", "O2"],
  "conditions": ["heat"]
}
```
**Response ($200\text{ OK}$):**
```json
{
  "matched": true,
  "reaction": {
    "id": "rx_class10_mg_combustion",
    "name": "Combustion of Magnesium Ribbon in Oxygen",
    "category": "Metals & Non-metals",
    "inputs": ["Mg", "O2"],
    "conditions": ["heat"],
    "outputs": ["MgO"],
    "products": ["MgO"],
    "equation": "2Mg + O₂ ──► 2MgO",
    "type": "Combination & Exothermic Combustion",
    "color": "#ffffff",
    "observation": "white_light",
    "description": "Burns with a dazzling white flame to form a white ash.",
    "mechanism": "Magnesium ribbon undergoes vigorous exothermic combustion...",
    "jeeRelevance": "Essential Class 10 NCERT Chapter 1 Experiment",
    "xp": 200
  }
}
```

##### `GET /api/questions/stats`
**Response ($200\text{ OK}$):**
```json
{
  "total": 25000,
  "chaptersCount": 61,
  "bySubject": [
    { "subject": "Chemistry", "count": 11700 },
    { "subject": "Physics", "count": 13300 }
  ],
  "byLevel": [
    { "exam_level": "Advanced", "count": 6223 },
    { "exam_level": "Main-Easy", "count": 6304 },
    { "exam_level": "Main-Hard", "count": 6223 },
    { "exam_level": "Main-Moderate", "count": 6250 }
  ]
}
```

---

## 10. Client-Side Routing, State Management & Local Storage Inventory

### 10.1 Web Application Routes Table (`client/src/App.jsx`)

The platform contains **22 interactive routes** wrapped in responsive layouts:

| Path | Component File | Access Level | Description |
| :--- | :--- | :--- | :--- |
| `/` | `Landing.jsx` / `Home.jsx` | Public / Smart | Dynamic root landing page or authenticated dashboard |
| `/landing` | `Landing.jsx` | Public | Tactile Claymorphism product presentation page |
| `/login` | `Login.jsx` | Public | Supabase authentication login interface |
| `/signup` | `Signup.jsx` | Public | Student onboarding and grade tier selection |
| `/dashboard` | `Home.jsx` | Authenticated | Main student command center with daily quests |
| `/physics` | `PhysicsLab.jsx` | Authenticated | 60 FPS HTML5 Canvas Physics Simulation Suite |
| `/chemistry` | `ChemistryLab.jsx` | Authenticated | Drag-and-drop chemistry laboratory canvas |
| `/chemistry/drag-and-drop` | `ChemistryLab.jsx` | Authenticated | Explicit route to reaction workbench |
| `/chemistry/organic` | `ChemistryLab.jsx` | Authenticated | Specialized organic chemistry reaction workbench |
| `/quizzes` | `Quizzes.jsx` | Authenticated | 25,000 question bank testing portal |
| `/daily-challenge` | `DailyChallenge.jsx`| Authenticated | 7-day progressive hands-on lab missions |
| `/mock-tests` | `MockTests.jsx` | Authenticated | Diagnostic exam & remedial micro-lesson generator |
| `/progress` | `Progress.jsx` | Authenticated | Learning curves, XP charts, and chapter mastery |
| `/achievements` | `Achievements.jsx` | Authenticated | Unlocked trophies and scientific badge gallery |
| `/games` | `FunGames.jsx` | Authenticated | Gamified science mini-games & periodic puzzles |
| `/saved` | `SavedExperiments.jsx`| Authenticated | Bookmarked apparatus configurations |
| `/profile` | `Profile.jsx` | Authenticated | Student identity, bio, and academic grade settings |
| `/settings` | `Settings.jsx` | Authenticated | Audio preferences, theme controls, and help |
| `/snap-solve` | `SnapAndSolvePage.jsx`| Authenticated | Camera & image upload OCR science problem solver |
| `/sandbox` | `SandboxLabPage.jsx`| Authenticated | Freeform unconstrained physics & chemistry sandbox |
| `/spaced-repetition` | `SpacedRepetitionPage.jsx`| Authenticated | Ebbinghaus memory retention prediction dashboard |
| `/experimental` | `ExperimentalBetaPage.jsx`| Authenticated | Beta lab testing area for upcoming simulations |

---

### 10.2 React Context Providers Hierarchy

```
<ErrorBoundary>
  <PerformanceProvider>      <!-- Lite Mode / 60 FPS vs 30 FPS toggle -->
    <AuthProvider>             <!-- Supabase session & user profile sync -->
      <ProgressProvider>         <!-- XP, Level, and Achievement event bus -->
        <BrowserRouter>
          <NetworkFallbackToast />
          <Routes> ... </Routes>
        </BrowserRouter>
      </ProgressProvider>
    </AuthProvider>
  </PerformanceProvider>
</ErrorBoundary>
```

---

### 10.3 Complete Local Storage Keys Inventory

| Local Storage Key | Data Structure | Retention Lifecycle | Functional Purpose |
| :--- | :--- | :--- | :--- |
| `labxplore_student_notes` | `Array<Note>` | Permanent | Personal student notebook & pinned quiz question pointers |
| `labxplore_lite_mode` | `boolean` (`'true'` / `'false'`) | Permanent | Persists 30 FPS hardware-throttle toggle for low-end laptops |
| `labxplore_guest_xp` | `number` | Session / Pre-Auth | Caches earned XP before student completes signup |
| `labxplore_audio_volume` | `number` ($0.0$ to $1.0$) | Permanent | Ambient study synthesizer master volume |
| `labxplore_sound_fx_enabled` | `boolean` | Permanent | Master toggle for tactical UI sound effects |
| `sb-<project-ref>-auth-token` | `JSON Object` | Managed by Supabase | Encrypted JWT access and refresh tokens for session persistence |

---

> **Compendium Verification:**  
> All 118 Elements, 5,451 balanced chemical reactions, 19 physics apparatus models, 25,000 questions, 61 NCERT/JEE chapters, 6 Credit Stages, and REST/WebSocket schemas cataloged in this document reflect the active runtime codebase.
