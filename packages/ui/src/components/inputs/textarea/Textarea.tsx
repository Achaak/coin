import type { TextareaProps } from '@pikas-ui/textarea';
import { Textarea as TextareaPikasUI } from '@pikas-ui/textarea';
import { FC } from 'react';

export type {
  TextareaProps,
  TextareaCSS,
  TextareaPadding,
  TextareaResize,
} from '@pikas-ui/textarea';
export { textareaPadding, textareaResize } from '@pikas-ui/textarea';

export const Textarea: FC<TextareaProps> = (props) => (
  <TextareaPikasUI {...props} />
);
