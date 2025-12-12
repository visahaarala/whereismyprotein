import {
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type TouchEvent,
} from 'react';
import styles from './RangeSlider.module.scss';
import capitalize from '../../../functions/capitalize';
import type { ProgramState, ReducerActionType } from '../../../@types';
import { FineliContext } from '../../../context/FineliContext';

type DragStateType = {
  startX: number;
  startPctg: number;
  isDragging: boolean;
};

type ThumbType = 'min' | 'max' | null;

const RangeSlider = ({
  name,
  margin,
  dispatchType,
}: {
  name: keyof ProgramState;
  margin: number;
  dispatchType: ReducerActionType;
}) => {
  const { dispatch } = useContext(FineliContext);

  const [isDragging, setIsDragging] = useState(false);

  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);

  const trackRef = useRef<HTMLDivElement>(null);
  const activeThumb = useRef<ThumbType>(null);
  const dragState = useRef<DragStateType>({
    startX: 0,
    startPctg: 0,
    isDragging: false,
  });

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch({
        type: dispatchType,
        // name must be correct for this to work! .. no check
        payload: { [name]: { min, max } },
      });
    }, 200);
    return () => clearTimeout(timeout);
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
        Math.min(100 - margin, max - margin)
      );
      setMin(newPctg);
    } else {
      const newPctg = clamp(
        newPctgCandidate,
        Math.max(margin, min + margin),
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

  const heightPow = 3.5;

  return (
    <div
      className={styles.rangeSlider}
      style={{ margin: `0 calc(${margin / 2}% - var(--padding-sides))` }}
    >
      <p className={styles.name}>{`${capitalize(
        name as unknown as string,
        true
      )}: ${Math.round(min)}% to ${Math.round(max)}%`}</p>
      <div className={styles.track} ref={trackRef} />
      <div
        className={styles.range}
        style={{
          left: `${min}%`,
          width: `${max - min}%`,
          transition: isDragging ? 'unset' : '',
        }}
      />
      <div
        className={styles.ball}
        style={{
          width: `${margin}%`,
          left: `${min}%`,
          transition: isDragging ? 'unset' : '',
        }}
        onMouseDown={(e) => handleThumbDown(e, 'min')}
        onTouchStart={(e) => handleThumbDown(e, 'min')}
        tabIndex={0}
      >
        <div
          style={{
            height: `${Math.max(
              40,
              Math.pow((100 - min) / 100, heightPow) * 100,
              Math.pow(min / 100, heightPow) * 100
            )}%`,
          }}
        />
      </div>
      <div
        className={styles.ball}
        style={{
          width: `${margin}%`,
          left: `${max}%`,
          transition: isDragging ? 'unset' : '',
        }}
        onMouseDown={(e) => handleThumbDown(e, 'max')}
        onTouchStart={(e) => handleThumbDown(e, 'max')}
        tabIndex={0}
      >
        <div
          style={{
            height: `${Math.max(
              40,
              Math.pow(max / 100, heightPow) * 100,
              Math.pow((100 - max) / 100, heightPow) * 100
            )}%`,
          }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
