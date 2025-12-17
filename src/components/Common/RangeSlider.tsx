import {
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import styles from './RangeSlider.module.scss';
import type { Range } from '../../types';
import { PERCENTAGE_MARGIN } from '../../util/variables';

type DragStateType = {
  startX: number;
  startPctg: number;
  isDragging: boolean;
};

type ThumbType = 'min' | 'max' | null;

const RangeSlider = ({
  name,
  margin = PERCENTAGE_MARGIN,
  value,
  setValue,
  type = 'both',
}: {
  name?: string;
  margin?: number;
  value: Range;
  setValue: (range: Range) => void;
  type?: 'min' | 'max' | 'both';
}) => {
  const [min, setMin] = useState(value.min);
  const [max, setMax] = useState(value.max);
  const [isDragging, setIsDragging] = useState(false);

  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<ThumbType>(null);
  const dragState = useRef<DragStateType>({
    startX: 0,
    startPctg: 0,
    isDragging: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      setValue({ min: Math.round(min), max: Math.round(max) });
    }, 200);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [min, max]);

  const clamp = (value: number, min: number, max: number) => {
    return Math.max(min, Math.min(max, value));
  };

  const getClientX = (
    e: MouseEvent | TouchEvent | globalThis.MouseEvent | globalThis.TouchEvent
  ) => {
    if ('clientX' in e) return e.clientX;
    if ('touches' in e && e.touches.length) return e.touches[0].clientX;
    if ('changedTouches' in e && e.changedTouches.length)
      return e.changedTouches[0].clientX;
    return 0;
  };

  const handleThumbDown = (e: MouseEvent | TouchEvent, type: ThumbType) => {
    e.stopPropagation();
    // For touch events, prevent mouse event emulation
    if ((e as TouchEvent).touches) {
      (e as TouchEvent).preventDefault();
    }

    activeThumb.current = type;

    dragState.current.startX = getClientX(e);

    dragState.current.startPctg = type === 'min' ? min : max;
    dragState.current.isDragging = true;
    setIsDragging(true);

    window.addEventListener('mousemove', handleDrag);
    window.addEventListener('mouseup', handleDragEnd);

    window.addEventListener('touchmove', handleDrag, { passive: false });
    window.addEventListener('touchend', handleDragEnd);
  };

  const handleDrag = (e: globalThis.MouseEvent | globalThis.TouchEvent) => {
    const track = trackRef.current;
    if (!track || !dragState.current.isDragging) return;

    // Prevent page scrolling (for touch)
    if ('touches' in e) e.preventDefault();

    const clientX = getClientX(e);
    const deltaX = clientX - dragState.current.startX;
    const deltaPctg = (deltaX / track.offsetWidth) * 100;
    const newPctgCandidate = dragState.current.startPctg + deltaPctg;

    if (activeThumb.current === 'min') {
      const newPctg = clamp(
        newPctgCandidate,
        0,

        type === 'min' ? 100 : Math.min(100 - margin, max - margin)
      );
      setMin(newPctg);
    } else {
      const newPctg = clamp(
        newPctgCandidate,
        /// THIS HERE!... type === 'max'
        type === 'max' ? 0 : Math.max(margin, min + margin),
        100
      );
      setMax(newPctg);
    }
  };

  const handleDragEnd = () => {
    dragState.current.isDragging = false;
    setIsDragging(false);
    activeThumb.current = null;
    window.removeEventListener('mousemove', handleDrag);
    window.removeEventListener('mousemove', handleDragEnd);
    window.removeEventListener('touchmove', handleDrag);
    window.removeEventListener('touchend', handleDragEnd);
  };

  const sliderText =
    type === 'both'
      ? `${name ? name + ': ' : ''}${Math.round(min)}% to ${Math.round(max)}%`
      : type === 'min'
      ? `> ${Math.round(min)}%${name ? ` of ${name}` : ''}`
      : `< ${Math.round(max)}%${name ? ` of ${name}` : ''}`;

  const ballHeightPow = 3.5;

  return (
    <div className={styles.rangeSlider}>
      <p className={styles.name}>{sliderText}</p>
      <div className={styles.track} ref={trackRef} />
      <div
        className={styles.range}
        style={{
          left: `${min}%`,
          width: `${max - min}%`,
          transition: isDragging ? 'unset' : '',
        }}
      />
      {type !== 'max' ? (
        <div
          className={styles.ball}
          style={{
            width:
              type === 'min'
                ? 'calc(var(--padding-sides) * 2)'
                : `min(${max - min}%, calc(var(--padding-sides) * 2))`,
            left: `${min}%`,
            transition: isDragging ? 'unset' : '',
          }}
          onMouseDown={(e) => handleThumbDown(e, 'min')}
          onTouchStart={(e) => handleThumbDown(e, 'min')}
        >
          <div
            style={{
              height: `${Math.max(
                40,
                Math.pow((100 - min) / 100, ballHeightPow) * 100,
                Math.pow(min / 100, ballHeightPow) * 100
              )}%`,
            }}
            tabIndex={0}
          />
        </div>
      ) : (
        <></>
      )}
      {type !== 'min' ? (
        <div
          className={styles.ball}
          style={{
            width:
              type === 'max'
                ? 'calc(var(--padding-sides) * 2)'
                : `min(${max - min}%, calc(var(--padding-sides) * 2))`,
            left: `${max}%`,
            transition: isDragging ? 'unset' : '',
          }}
          onMouseDown={(e) => handleThumbDown(e, 'max')}
          onTouchStart={(e) => handleThumbDown(e, 'max')}
        >
          <div
            style={{
              height: `${Math.max(
                40,
                Math.pow(max / 100, ballHeightPow) * 100,
                Math.pow((100 - max) / 100, ballHeightPow) * 100
              )}%`,
            }}
            tabIndex={0}
          />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default RangeSlider;
