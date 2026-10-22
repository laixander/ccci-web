# DMS — Document Management System

> Landing page content, mapped to its layout sections and UI elements.

---

## 1. Hero

**Badge/eyebrow:** `DMS` · Document Management System

# Every document, findable, trackable, secure.

A centralized repository that scans, indexes, and manages your files — with real-time status, OCR, digital signatures, and full version history.

**Buttons**
- **[Request a demo]** (primary)
- **[Explore modules]** (secondary)

**Feature bullets (under buttons)**
- OCR in any language
- SSO, LDAP-ready
- Cloud or on-premise

### Hero UI mockup — Dashboard card

**Browser bar:** `dms.ccci.com.ph/workflow`

**Title:** Purchase Order #4482
**Subtitle:** In review — Finance

**Stat tiles**

| Label | Value | Sub-label |
|---|---|---|
| Total documents | 82,410 | +1.2k this week |
| Pending signature | 14 | 3 overdue |
| OCR queue | 26 | Processing |
| Storage used | 3.4 TB | of 10 TB |

**Recent activity** — *View all*

| Status tag | Item | Time |
|---|---|---|
| Uploaded | Contract_2026_v3.pdf | 3m |
| Signed | NDA — Vendor Corp | 40m |
| Pending | Invoice #7783 approval | 2h |
| Version 4 | HR Policy Manual updated | Yesterday |

---

## 2. Trust strip (full-width banner)

Deployed on Digital Ocean, Google Cloud, Azure, and IBM Cloud.

---

## 3. The platform

**Eyebrow:** The platform

## Six modules. One document record.

DMS is a single platform that manages every document from upload to archive — search, OCR, signatures, versions, and workflow, all connected. Nothing lives in a folder on someone's desktop, and nothing gets filed twice.

**Module checklist (2-column)**

| | |
|---|---|
| ✓ Search | ✓ OCR Transcribing |
| ✓ Digital Signature | ✓ Versioning |
| ✓ Workflow | ✓ Security |

*Helper text:* Select a module to jump to it.

### Platform diagram (hub-and-spoke)

- **Center node:** DMS CORE — *Document Management*
- **Surrounding nodes (clickable, link to module sections):** Search · OCR Transcribing · Digital Signature · Versioning · Workflow · Security

---

## 4. Module — Search

**Eyebrow:** Search

## Find any document in seconds

Search across keywords, metadata, text content, and file attributes — with previews for office formats.

**Bullets**
- Multiple search engines supported
- Keyword, metadata, and full-text search
- LibreOffice-based preview of word, sheet, and slide files

**Link:** ↑ All modules

### UI mockup — Search results

**Browser bar:** `dms.ccci.com.ph/search`

**Title:** Search results
**Query:** "vendor contract 2026"

**Matches** — *View all*

| Type tag | File | Match reason |
|---|---|---|
| PDF | Contract_2026_v3.pdf | Text match |
| DOCX | Vendor onboarding checklist | Title match |
| XLSX | Vendor price list Q3 | Metadata |
| TIFF | Scanned MOU — Vendor Corp | OCR text |

---

## 5. Module — OCR Transcribing

*(Layout: mockup on the left, text on the right)*

### UI mockup — OCR queue

**Browser bar:** `dms.ccci.com.ph/ocr`

**Title:** OCR queue
**Subtitle:** Distributed across engines

**Processing** — *View all*

| Status | File | Language / state |
|---|---|---|
| Done | Registrar_scan_0412.tiff | English |
| Done | Board_minutes_2019.pdf | English |
| Running | Land_title_scan.pdf | Filipino |
| Queued | Invoice_batch_77.pdf | Pending |

**Eyebrow:** OCR Transcribing

## Turn paper into searchable text

Scanned pages, PDFs, office files, and TIFFs are transcribed automatically — with the document language detected first.

**Bullets**
- Language detection routes to a compatible OCR engine
- Transcription load distributed for availability
- Multi-page PDF, office, and TIFF support

**Link:** ↑ All modules

---

## 6. Module — Digital Signature

**Eyebrow:** Digital Signature

## Authentic documents, signed anywhere

Verify embedded cryptographic signatures, upload signatures added after storage, and capture handwritten ones.

**Bullets**
- Verifies embedded cryptographic signatures
- Captures and digitizes handwritten signatures
- Remote contract signing for online transactions

**Link:** ↑ All modules

### UI mockup — Signature status

**Browser bar:** `dms.ccci.com.ph/signatures`

**Title:** Signature status
**Subtitle:** Contracts this week

**Documents** — *View all*

| Status tag | Document | Detail |
|---|---|---|
| Verified | NDA — Vendor Corp | Valid |
| Signed | Service agreement #118 | Remote |
| Pending | Lease renewal | Awaiting 1 |
| Uploaded | Signed MOU copy | Post-storage |

---

## 7. Module — Versioning

*(Layout: mockup on the left, text on the right)*

### UI mockup — Version history table

**Browser bar:** `dms.ccci.com.ph/documents/hr-policy`

**Title:** HR Policy Manual
**Subtitle:** 4 versions

| Version | Author | Date | Status |
|---|---|---|---|
| v4 | L. Santiago | Sep 20 | Current |
| v3 | R. Santos | Aug 02 | Archived |
| v2 | L. Santiago | Mar 14 | Archived |
| v1 | M. Reyes | Jan 09 | Archived |

**Eyebrow:** Versioning

## Nothing gets lost or overwritten

Every edit is a new version — viewable, comparable, and reversible.

**Bullets**
- Non-destructive page mapping and reordering
- Compare, download, or revert any version
- Comments and discussion on new versions
- Tags and color coding for fast recognition

**Link:** ↑ All modules

---

## 8. Module — Workflow

**Eyebrow:** Workflow

## Documents move on rules, not reminders

Set routing rules once. Business processes trigger automatically as a document changes state.

**Bullets**
- Routing rules and conditions
- Escalation and automatic state expiration
- Triggers for external processes and notifications
- Duplicate detection by file and label

**Link:** ↑ All modules

### UI mockup — Approval chain

**Browser bar:** `dms.ccci.com.ph/workflow/4482`

**Title:** Purchase Order #4482
**Subtitle:** Step 3 of 5

**Approval chain** — *View all*

| Status | Step | When |
|---|---|---|
| Done | Submitted by Requester | Mon |
| Done | Reviewed by Supervisor | Tue |
| Active | Finance approval | Now |
| Waiting | Final sign-off | — |

---

## 9. Module — Security

*(Layout: mockup on the left, text on the right)*

### UI mockup — Access log

**Browser bar:** `dms.ccci.com.ph/settings/access`

**Title:** Access log
**Subtitle:** Last 24 hours

**Audit trail** — *View all*

| Action tag | Event | Time |
|---|---|---|
| Viewed | Contract_2026_v3.pdf — R. Santos | 14:02 |
| Signed | NDA — L. Santiago | 13:40 |
| Denied | Payroll_Q3.xlsx — Guest | 11:15 |
| Redacted | Employee_Record_009 — Admin | 09:47 |

**Eyebrow:** Security

## Access controlled down to the action

Every atomic operation requires explicit permission — nothing happens by accident.

**Bullets**
- Role-based access and granular permissions
- SSO, LDAP, and email or username sign-in
- Audit trail of user activity and document access
- Redaction and overlays for sensitive content

**Link:** ↑ All modules

---

## 10. Deployment

**Eyebrow:** Deployment

## Runs where your infrastructure already is

**Cards (3-column)**

| Card label | Heading | Description |
|---|---|---|
| Storage | Any backend you choose | File system, S3-compatible cloud storage, or on-premise Minio. |
| Environment | Bare metal to single-board | Virtual machine, public or private cloud, or a single board computer. |
| Scale | Docker & Kubernetes | Deployed on Digital Ocean, Google Cloud, Azure, and IBM Cloud. |
