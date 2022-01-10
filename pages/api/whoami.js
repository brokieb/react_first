import axiosInstance, {
  allegroAxiosAuth,
  allegroAxios,
} from "../../app/lib/axiosInstance";

export default async function handler(req, res) {
  const tokenData = await axiosInstance.get("/api/settings/getSettings", {
    params: {
      code: "allegroAccessToken",
    },
  });

  const response = fetch(
    "https://api.allegro.pl.allegrosandbox.pl/sale/categories",
    {
      method: "GET",
      mode: "no-cors",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzg5OTkzMTYsInVzZXJfbmFtZSI6IjQ0MzI4MzU1IiwianRpIjoiMDNhOWU1OWYtYzRjNC00YmZiLWJhMjEtNDA4MzgyODE4YjhhIiwiY2xpZW50X2lkIjoiOWExYmMxNjM4ODM3NDY2ODkyMDk1MGVhNTc1ZGM4YzEiLCJzY29wZSI6WyJhbGxlZ3JvOmFwaTpvcmRlcnM6cmVhZCIsImFsbGVncm86YXBpOnByb2ZpbGU6d3JpdGUiLCJhbGxlZ3JvOmFwaTpzYWxlOm9mZmVyczp3cml0ZSIsImFsbGVncm86YXBpOmJpbGxpbmc6cmVhZCIsImFsbGVncm86YXBpOmNhbXBhaWducyIsImFsbGVncm86YXBpOmRpc3B1dGVzIiwiYWxsZWdybzphcGk6c2FsZTpvZmZlcnM6cmVhZCIsImFsbGVncm86YXBpOmJpZHMiLCJhbGxlZ3JvOmFwaTpvcmRlcnM6d3JpdGUiLCJhbGxlZ3JvOmFwaTphZHMiLCJhbGxlZ3JvOmFwaTpwYXltZW50czp3cml0ZSIsImFsbGVncm86YXBpOnNhbGU6c2V0dGluZ3M6d3JpdGUiLCJhbGxlZ3JvOmFwaTpwcm9maWxlOnJlYWQiLCJhbGxlZ3JvOmFwaTpyYXRpbmdzIiwiYWxsZWdybzphcGk6c2FsZTpzZXR0aW5nczpyZWFkIiwiYWxsZWdybzphcGk6cGF5bWVudHM6cmVhZCIsImFsbGVncm86YXBpOm1lc3NhZ2luZyJdLCJhbGxlZ3JvX2FwaSI6dHJ1ZX0.E-hNyTRJGeoUggWPoMXxsPFYp8tEdl1If067jUE5xMJbozfsOoEQ1JM5rmyTXq74c7kC77kkQDS5Qb-sUJOWGFm4RugyJkCoY2KHR8TK6DdOV5nHnyR2J-in1bM20EjGQZ1D0IjTiZtj82gf-mm_P7fbHha6p7D2pvwoGKc7N2-T1tgSSkS_VuooW-BV059zZJTFk_8CHNLanxP6K8v783KravuVrDzSEbdr4_3DoDDOvM4xkOFyDFFx3Z3HEMXOX_UsxxnAXJoxGOfqafzOunUiX1_vIs9F8KhCaGJC8Ycm8Zhj8Jr8V3UGyXuUfYH9EAmDMtyRN2teQFq80iry45JekXSqgiKMzFzD8Uq7hyP9Ig2t-WLU84YtYl76gwl0y1UOx_mvSUhn5F5ZnR68zcEd1ZazhOSFKuh1zbvS1fz3MIx55nPJ5adSvDBZIN98ZOQzprlvseXRetRfOZflmI8xczFs53t-PXuym79v7W-uAYDqOJLQqd8qg4BPH1aQ_EJZGuqxQpN8sbxmMwyk5VH7LdG-imy5HncR-h0sVZd07NTIttwsUGf7lAv1ITj7cNxT_-FWez9g3lT1769BE56yxHxrYD0UtTfkOZRSz0ssQ3SgXjfP5xVSJCGQj6RXlGqWW-1bTQzVi_bVrKDZ9WNWMjJQouR8d-BfLbIZSkY",
        Accept: "application/vnd.allegro.public.v1+json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );

  return res.status(405).json({ err: "WRONG METHOD" });
}
