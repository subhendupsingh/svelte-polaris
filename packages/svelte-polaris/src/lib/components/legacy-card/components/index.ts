import LegacyCardSvelte from '../legacy-card.svelte';
import LegacyCardSectionSvelte from './section/legacy-card-section.svelte';

// Create a type for the compound component.
// It's the type of the LegacyCardSvelte component, augmented with a 'Section' property
// which has the type of the LegacyCardSectionSvelte component.
type LegacyCardCompoundComponent = typeof LegacyCardSvelte & {
	Section: typeof LegacyCardSectionSvelte;
};

// Cast the imported LegacyCardSvelte component to our compound type.
// Then, assign LegacyCardSectionSvelte to its 'Section' property.
const LegacyCard = LegacyCardSvelte as LegacyCardCompoundComponent;
LegacyCard.Section = LegacyCardSectionSvelte;

// Export the compound LegacyCard component as the default export.
// This allows users to import it simply as `import LegacyCard from '...'`
// and use both <LegacyCard> and <LegacyCard.Section>.
export default LegacyCard;
