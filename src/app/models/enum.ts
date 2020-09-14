import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Enum {

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}

	id: number;
	name: string;
}

@Injectable({
	providedIn: "root",
})
export class EnumAdapter implements Adapter<Enum> {
	adapt(item: any): Enum {
		return new Enum(item.id, item.name);
	}
}