import {ProgressValue, ToneValue} from './types.js';
import type {Progress, Tone} from './types.js';

export function getDefaultAccessibilityLabel(
  progress?: Progress,
  tone?: Tone,
): string {
  let progressLabel = '';
  let toneLabel = '';

  if (!progress && !tone) {
    return '';
  }

  switch (progress) {
    case ProgressValue.Incomplete:
      progressLabel = 'Incomplete';
      break;
    case ProgressValue.PartiallyComplete:
      progressLabel = 'Partially complete';
      break;
    case ProgressValue.Complete:
      progressLabel = 'Complete';
      break;
  }

  switch (tone) {
    case ToneValue.Info:
    case ToneValue.InfoStrong:
      toneLabel = 'Info';
      break;
    case ToneValue.Success:
    case ToneValue.SuccessStrong:
      toneLabel = 'Success';
      break;
    case ToneValue.Warning:
    case ToneValue.WarningStrong:
      toneLabel = 'Warning';
      break;
    case ToneValue.Critical:
    case ToneValue.CriticalStrong:
      toneLabel = 'Critical';
      break;
    case ToneValue.Attention:
    case ToneValue.AttentionStrong:
      toneLabel = 'Attention';
      break;
    case ToneValue.New:
      toneLabel = 'New';
      break;
    case ToneValue.ReadOnly:
      toneLabel = 'Read-only';
      break;
    case ToneValue.Enabled:
      toneLabel = 'Enabled';
      break;
  }

  if (!tone && progress) {
    return progressLabel;
  } else if (tone && !progress) {
    return toneLabel;
  } else {
    return `${toneLabel} ${progressLabel}`;
  }
}