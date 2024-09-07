Resonator files must follow the JSON schema below:

```json
{
	"id": 0,
	"name": "",
	"imageName": "",
	"bio": "",
	"weaponOfChoice": "",
	"gender": "",
	"attribute": "",
	"constellations": [
		{
			"sequence": 1,
			"name": "",
			"description": ""
		},
		{
			"sequence": 2,
			"name": "",
			"description": ""
		}
	],
	"skills": [
		{
			"name": "",
			"description": ""
		}
	],
	"upgradeMaterials": {
		"breakthrough": {
			"20": [
				{
					"imageName": "",
					"name": "",
					"quantity": 0
				},
				{
					"imageName": "",
					"name": "",
					"quantity": 0
				}
			]
		},
		"talents": [
			{
				"imageName": "",
				"name": "",
				"quantity": 0
			}
		]
	}
}
```

### Explanation

| Field            | Description                                    |
| ---------------- | ---------------------------------------------- |
| id               | Unique identifier for the resonator.           |
| name             | Name of the resonator.                         |
| image            | URL to the image of the resonator.             |
| bio              | Description of the resonator.                  |
| constellations   | List of constellations that the resonator has. |
| skills           | List of skills that the resonator has.         |
| upgradeMaterials | Materials required to upgrade the resonator.   |
