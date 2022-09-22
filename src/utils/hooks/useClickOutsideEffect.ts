import { useEffect, useRef } from "react";
import type { MutableRefObject } from "react";

type ElementRef = MutableRefObject<HTMLElement>;
type CallbackFunc = (e?: MouseEvent) => void;

export function useClickOutsideEffect(elmRef: ElementRef, callback: CallbackFunc) {
  const callbackRef = useRef<CallbackFunc>();
  callbackRef.current = callback;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!elmRef.current || elmRef.current.contains(event.target)) {
        return;
      }
      callbackRef.current(event);
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [elmRef, callbackRef]);
}

/** Usage
function App() {
  // Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();
  // State for our modal
  const [isModalOpen, setModalOpen] = useState(false);
  // Call hook passing in the ref and a function to call on outside click
  useClickOutsideEffect(ref, () => setModalOpen(false));
  return (
    <div ref={ref}>
      👋 Hey, I'm a modal. Click anywhere outside of me to close.
    </div>
  );
}
 */
