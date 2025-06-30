type Size = 'extraSmall' | 'small' | 'medium' | 'large';

export interface SkeletonThumbnailProps {
    /**
     * Size of the thumbnail
     * @default 'medium'
     */
    size?: Size;
}