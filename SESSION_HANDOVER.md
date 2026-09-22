# SESSION HANDOVER: Site Rebranding Instructions

This project is a clone of the **APEX TRUCK LAW** master template. The goal for this session is to rebrand the site for a new client using the **Site Identity Dashboard**.

## Step 1: Access the Dashboard
1. Go to `/site-identity` on this project.
2. Enter the Template PIN (default is `APEX2025` unless changed in `src/config/site.ts`).
3. Review the current "Master" values.

## Step 2: Provide New Client Data
Please provide the following details for the new firm:
- **Firm Name**
- **Contact Info** (Phone, Email, Address)
- **Primary Location** (City, County, State, Region)
- **High-Traffic Corridors** (e.g., local highways or exits)
- **Brand Colors** (Primary Hex/HSL)

## Step 3: Global Update
Once provided, the AI should:
1. Update `src/config/site.ts` with the new values.
2. Update `DESIGN.md` and `src/styles/global.css` if the accent color changed.
3. **Logo Processing**: If the user provides a logo image, call `process_favicon_image({ imageUrl })` to update the site's favicon and icons.
4. Call `generate_favicon` as a fallback if no logo image is provided.
5. Scan all page frontmatter (titles/descriptions) to ensure they align with the new location.

---
*Note: The Site Identity page is SSR-enabled to protect the firm's data schema. Keep the `/site-identity` route intact as a reference tool.*