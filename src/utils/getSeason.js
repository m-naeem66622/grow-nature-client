// Winter: December through February. It is cool and cold.
// Spring: March through May. The weather is mild and pleasant.
// Summer: June through September. It is the rainy season or southwest monsoon period.
// Autumn: October and November. It is dry.

export const getSeason = () => {
    const month = new Date().getMonth();
    if (month >= 2 && month <= 4) {
        return "spring";
    } else if (month >= 5 && month <= 9) {
        return "summer";
    } else if (month >= 10 && month <= 11) {
        return "autumn";
    } else {
        return "winter";
    }
};