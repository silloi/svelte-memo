export const createTimestampLabel = (date: Date) => {
	return date.toLocaleString().slice(-8, -3);
};
