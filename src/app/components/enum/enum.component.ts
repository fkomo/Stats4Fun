import { Component, OnInit, Input } from '@angular/core';
import { Enum } from '../../models/enum';
import { ApiService } from '../../services/api.service';

@Component({
	selector: 'app-enum',
	templateUrl: './enum.component.html',
	styleUrls: ['./enum.component.css']
})

export class EnumComponent implements OnInit {

	items: Enum[];

	@Input() enumName: string;
	@Input() addNotAllowed: boolean;

	constructor(private apiService: ApiService) {
	}

	ngOnInit(): void {
		this.apiService.enumByName(this.enumName).subscribe(i => this.items = i);;
	}

	addItem(): void {

		if (this.addNotAllowed)
			return;

		var singularEnumName = this.enumName.substr(0, this.enumName.length - 1);
		var newItemName = prompt('New ' + singularEnumName + ' name:', '');
		if (newItemName == null || newItemName == '')
			return;

		var newItem: Enum = {
			id: 0,
			name: newItemName
		};
		this.apiService.saveEnum(this.enumName, newItem);
	}

	renameItem(id: number): void {

		var item = this.items.find(i => i.id == id);
		var newName = prompt('Rename ' + item.name + ' to:', item.name);
		if (newName == null || newName == '' || newName == item.name)
			return;

		var modifiedItem: Enum = {
			id: id,
			name: newName
		};
		this.apiService.saveEnum(this.enumName, modifiedItem);
	}
}
