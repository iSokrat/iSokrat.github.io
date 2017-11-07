export default class Table {
	constructor(data) {
		this._initTable(data);
	}

	get tableNode() {
		const node = document.createElement('div');
		node.innerHTML = this._template;
		return node;
	}

	_initTable(data) {
		const builtTableContent = this._builtTableContent(data);
		const template = this._getBaseTemplate(builtTableContent);
		this._template = template;
	}

	_builtTableContent(data) {
		return data.reduce((rowContent, row) => {
			const rowTemplate = row.reduce((columnContent, value) => columnContent + this._buildColumn(value), [])

			return rowContent + this._buildRow(rowTemplate);
		}, '');
	}

	_buildRow(data) {
		return `<tr>${data}</tr>`;
	}

	_buildColumn(data) {
		return `<td>${data}</td>`;
	}

	_getBaseTemplate(data = ''){
		return `
			<table>
				<thead>
				</thead>
				<tbody>
					${data}
				</tbody>
			</table>
		`;
	}
}