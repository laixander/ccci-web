# Complete DMS Dashboard Implementation

This plan outlines the creation of the remaining dashboard pages for the Document Management System (DocuCore) to match the navigation links defined in the sidebar layout.

## Open Questions

> [!WARNING]
> Please review these questions as they will impact the final design:
> 1. **Document Columns:** For the `documents.vue` data table, are there specific columns you prefer? By default, I will use: *Name, Owner, Type, Size, Last Modified, and Status*.
> 2. **DMS Settings:** For the `settings.vue` page, should we include specific DMS-related settings (e.g., "Default Storage Limit", "Data Retention Policy", "Watermarking") in addition to general preferences?
> 3. **Approvals UI:** For `approvals.vue` and `signatures.vue`, do you prefer a standard Data Table (like the employees list) or a more visual Kanban/Card-based layout?

## Proposed Changes

We will create the following files in `app/pages/products/dms/dashboard/` using Nuxt UI components:

### Document Management
#### [NEW] `documents.vue`
- A comprehensive Data Table displaying all files and folders.
- Includes a search bar, file type filters, and a "New Folder" / "Upload File" action button.

#### [NEW] `shared.vue`
- A data table view focusing on documents shared with the user.
- Key columns: *Document Name, Shared By, Permission (View/Edit), Date Shared*.

#### [NEW] `starred.vue`
- A streamlined view showing only documents the user has starred for quick access.

### Workflows
#### [NEW] `approvals.vue`
- A view displaying documents pending review or approval.
- Includes action buttons to "Approve", "Reject", or "Request Changes".

#### [NEW] `signatures.vue`
- Similar to approvals, but focused on e-signatures.
- Key columns: *Document, Signatories, Status (Pending/Signed), Due Date*.

### Administration
#### [NEW] `access.vue`
- A management page for configuring role-based access control (RBAC).
- Will feature a list of user roles and their associated document permissions.

#### [NEW] `settings.vue`
- A general settings interface for the DMS module.
- Will use a tabbed interface (e.g., General, Storage, Security) to manage DMS preferences.

## Verification Plan

### Manual Verification
- Navigate through all links in the DMS sidebar to ensure pages load correctly without 404 errors.
- Verify that the active state on the sidebar corresponds correctly to the current page.
- Ensure the breadcrumbs at the top of the dashboard reflect the correct nested routing.
- Check that the Data Tables render correctly with mock data.
