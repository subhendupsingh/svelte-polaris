import LegacyCardSvelte from './legacy-card.svelte';
import LegacyCardSectionSvelte from './components/section/legacy-card-section.svelte';

type LegacyCardCompoundComponent = typeof LegacyCardSvelte & {
	Section: typeof LegacyCardSectionSvelte;
};

const LegacyCard = LegacyCardSvelte as LegacyCardCompoundComponent;
LegacyCard.Section = LegacyCardSectionSvelte;

export default LegacyCard;
