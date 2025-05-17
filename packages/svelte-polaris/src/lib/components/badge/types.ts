import CompleteIcon from "$lib/icons/complete-icon.svelte";
import PartiallyCompleteIcon from "$lib/icons/partially-complete-icon.svelte";
import IncompleteIcon from "$lib/icons/incomplete-icon.svelte";
import type { IconSource } from "$utilities/types.js";

export type Tone =
  | 'info'
  | 'success'
  | 'warning'
  | 'critical'
  | 'attention'
  | 'new'
  | 'magic'
  | 'info-strong'
  | 'success-strong'
  | 'warning-strong'
  | 'critical-strong'
  | 'attention-strong'
  | 'read-only'
  | 'enabled';

export enum ToneValue {
  Info = 'info',
  Success = 'success',
  Warning = 'warning',
  Critical = 'critical',
  Attention = 'attention',
  New = 'new',
  Magic = 'magic',
  InfoStrong = 'info-strong',
  SuccessStrong = 'success-strong',
  WarningStrong = 'warning-strong',
  CriticalStrong = 'critical-strong',
  AttentionStrong = 'attention-strong',
  ReadOnly = 'read-only',
  Enabled = 'enabled',
}

export type Progress = 'incomplete' | 'partiallyComplete' | 'complete';

export enum ProgressValue {
  Incomplete = 'incomplete',
  PartiallyComplete = 'partiallyComplete',
  Complete = 'complete',
}

export type Size = 'small' | 'medium' | 'large';

export const DEFAULT_SIZE: Size = 'medium';

interface NonMutuallyExclusiveProps {
  /** The content to display inside the badge. */
  children?: string;
  /** Colors and labels the badge with the given tone. */
  tone?: Tone;
  /** Render a pip showing the progress of a given task. */
  progress?: Progress;
  /** Icon to display to the left of the badge’s content. */
  icon?: IconSource;
  /**
   * @default 'medium'
   */
  size?: Size;
  /** Pass a custom accessibilityLabel */
  toneAndProgressLabelOverride?: string;
}

export type BadgeProps = NonMutuallyExclusiveProps &
  (
    | { progress?: Progress; icon?: undefined }
    | { icon?: IconSource; progress?: undefined }
  );

export const progressIconMap: { [P in Progress]: IconSource } = {
  complete: CompleteIcon,
  partiallyComplete: PartiallyCompleteIcon,
  incomplete: IncompleteIcon,
};