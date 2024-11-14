export enum LocalStorageKey {
	ENABLED = "uop-usable",
	STATES = "uop-states-input",
	TEMPLATE = "uop-states-template",
}

export function isLocalStorageEnabled() {
	return !!window.localStorage.getItem(LocalStorageKey.ENABLED);
}

export function setLocalStorageEnabled(enabled: boolean) {
	if (enabled) window.localStorage.setItem(LocalStorageKey.ENABLED, "1");
	else {
		window.localStorage.removeItem(LocalStorageKey.ENABLED);
	}
}

export function store(name: LocalStorageKey, data: string) {
	if (!isLocalStorageEnabled()) return;
	window.localStorage.setItem(name, data);
}

export function read(name: LocalStorageKey) {
	if (!isLocalStorageEnabled()) return null;
	return window.localStorage.getItem(name);
}