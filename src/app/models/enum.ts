import { Injectable } from "@angular/core";
import { Adapter } from "../core/adapter";

export class Enum {
	id: number;
	name: string;
	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}

@Injectable({
	providedIn: "root",
})
export class EnumAdapter implements Adapter<Enum> {
	adapt(item: any): Enum {
		return new Enum(item.id, item.name);
	}
}
