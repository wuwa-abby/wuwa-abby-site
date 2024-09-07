export interface ItemDetail {
	id: number;
	name: string;
	imageName: string;
	bio: string;
	weaponOfChoice: string;
	gender: string;
	attribute: string;
	rarity: number;
	constellations: SequenceInfo[];
	skills?: SkillInfo[];
	upgradeMaterials: UpgradeMaterials;
}

export interface SequenceInfo {
	sequence: number;
	name: string;
	description: string;
}

export interface SkillInfo {
	name: string;
	description: string;
}

export interface UpgradeMaterials {
	breakthrough: {
		[key: string]: UpgradeMaterial[];
	};
	talents: UpgradeMaterial[];
}

export interface UpgradeMaterial {
	imageName: string;
	name: string;
	quantity: number;
}
