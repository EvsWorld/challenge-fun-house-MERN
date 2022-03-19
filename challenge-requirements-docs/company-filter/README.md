### Company Filter

This challenge required making a react filter and search component. It was to fetch a list of companies from a simple json db, and allow user to search for companies by name and filter them with checkboxes by the services they provide.

I implemented something additional which was a script for reshapping the mock data, for it to be more believable and better show the capabilities of the filter. The script can be found at: `src/api/utilities/makeCompaniesWithArrays.js`.

The mock data I was able to generate from mockeroo.com was in the form found at: `src/api/mockdb/companyDataFromMockeroo.json`, and which can be seen below:

I however wanted to have arrays of random specialties for each company. The script just creates a new array of companies in the form seen at: `src/api/mockdb/companiesWithArrays.json`, and which takes the following shape:

```json
// src/api/mockdb/companyDataFromMockeroo.json

[
  {
    "id": 1,
    "company_name": "Watsica, Barrows and Conn",
    "city": "Itapé",
    "specialty": "Temp Fencing, Decorative Fencing and Gates",
    "logo": "http://dummyimage.com/107x100.png/ff4444/ffffff"
  },
  {
    "id": 2,
    "company_name": "Hickle, Barrows and Fahey",
    "city": "Woloara",
    "specialty": "Painting & Vinyl Wall Covering",
    "logo": "http://dummyimage.com/176x100.png/dddddd/000000"
  },
  {
    "id": 3,
    "company_name": "Lemke, Hintz and Hahn",
    "city": "La Tinguiña",
    "specialty": "EIFS",
    "logo": "http://dummyimage.com/193x100.png/5fa2dd/ffffff"
  },
  ...
]

```

```json
// src/api/mockdb/companiesWithArrays.json

[
  {
    "id": 1,
    "company_name": "Watsica, Barrows and Conn",
    "city": "Itapé",
    "logo": "http://dummyimage.com/107x100.png/ff4444/ffffff",
    "specialties": ["Fire Protection"]
  },
  {
    "id": 2,
    "company_name": "Hickle, Barrows and Fahey",
    "city": "Woloara",
    "logo": "http://dummyimage.com/176x100.png/dddddd/000000",
    "specialties": [
      "Soft Flooring and Base",
      "Sitework & Site Utilities",
      "Painting & Vinyl Wall Covering",
      "EIFS",
      "Plumbing & Medical Gas",
      "Structural & Misc Steel Erection",
      "Marlite Panels (FED)",
      "Doors, Frames & Hardware",
      "Exterior Signage",
      "Drywall & Acoustical (MOB)",
      "Casework",
      "Retaining Wall and Brick Pavers"
    ]
  },
  {
    "id": 3,
    "company_name": "Lemke, Hintz and Hahn",
    "city": "La Tinguiña",
    "logo": "http://dummyimage.com/193x100.png/5fa2dd/ffffff",
    "specialties": [
      "Sitework & Site Utilities",
      "Hard Tile & Stone",
      "Rebar & Wire Mesh Install",
      "Construction Clean and Final Clean",
      "Termite Control",
      "Structural and Misc Steel (Fabrication)",
      "Plumbing & Medical Gas",
      "Structural & Misc Steel Erection",
      "HVAC",
      "Granite Surfaces",
      "Fire Sprinkler System",
      "Epoxy Flooring",
      "Ornamental Railings",
      "Landscaping & Irrigation"
    ]
  },
  ...
]
```
