import Vue from 'vue';


export default class FormService {
	constructor(data) {
		this.originalData = data;
		this.SetData(data);
	}


	SetData(data) {
		const copyData = structuredClone(data);
		for (const property in copyData) {
			Vue.set(this, property, copyData[ property ]);
		}
	}


	GetData(all = false) {
		const target = all ? this : this.originalData;
		return this.extractData(this, target);
	}


	Reset() {
		const data = this.originalData;
		Object.keys(this).forEach(x => delete this[ x ]);

		this.originalData = data;
		this.SetData(data);
	}


	extractData(source, target) {
		const newData = {};

		Object.keys(target).forEach(key => {
			const val = source[ key ];

			if (val !== null && typeof val === 'object') {
				newData[ key ] = this.extractData(val, target[ key ]);
			}
			else {
				newData[ key ] = val;
			}
		});

		return newData;
	}
}
