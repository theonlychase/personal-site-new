---
id: 'react-typewriter-hook'
author: 
  avatar:
    src: 'https://github.com/theonlychase.png'
    target: '_blank'
  name: 'Chase Isley'
  to: 'https://chaseisley.dev'
title: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
description: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
head:
  templateParams:
    title: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
    ogTitle: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
    twitterTitle: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
    description: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
    ogDescription: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
    twitterDescription: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
image: 
  src: 'https://picsum.photos/640/360'
  alt: 'useTypewriter Hook'
seo: 
  title: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
  ogTitle: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
  twitterTitle: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
  description: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
  ogDescription: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
  twitterDescription: 'Complete React typewriter effect hook with HTML tag support, dual animation modes with bidirectional support, whitespace handling, & more'
sitemap:
  loc: '/blog/react-typewriter-hook'
short: 'React Typewriter Hook: HTML Support & Dual Animation Modes'
icon: 'i-simple-icons-react'
tags: ['React', 'Next', 'Typescript']
path: '/blog/react-typewriter-hook'
slug: 'react-typewriter-hook'
created: '2025-06-01'
---

# useTypewriter Hook

I created this hook to handle a specific feature used in a production app. It worked nicely. Hopefully the comments help understand how it works. 

## Key Features:

#### Dual Animation Modes:

- High-frequency mode: Uses setTimeout for precise 1ms timing control
- Standard mode: Uses requestAnimationFrame for smooth, battery-efficient animations synced  to display refresh rate

#### Smart Content Handling:

- HTML tag support: Automatically skips HTML tags so they appear/disappear instantly while still animating the text content
- Whitespace management: Intelligently handles consecutive spaces and preserves or collapses whitespace as needed

#### Bidirectional Animation:

- Forward typing: Characters appear from left to right
- Reverse untyping: Characters disappear from right to left
- Independent controls: Separate speeds, delays, and completion callbacks for each direction

#### Performance & Reliability:

- Memory leak prevention: Comprehensive cleanup of timers and animation frames
- Component lifecycle management: Handles mounting/unmounting gracefully
- Stale closure protection: Maintains fresh callback references
- Multi-character processing: Handles very fast speeds by processing multiple characters per frame

#### Flexible Configuration:

- Customizable typing/untyping speeds
- Initial delays and reverse delays
- Progress tracking with contextual completion percentages
- Start/stop controls and completion callbacks

```tsx [useTypewriter.tsx]
export const useTypewriter = ({
  onComplete = () => {},
  onReverseComplete = () => {},
  speed = 5,
  reverseSpeed,
  text,
  skipHtmlTags = true,
  preserveWhitespace = false,
  delay = 0,
  reverseDelay = 0,
  start = true,
  reverse = false,
  useHighFrequency = true,
}: {
  onComplete?: () => void;
  onReverseComplete?: () => void;
  text: string;
  speed?: number;
  reverseSpeed?: number; // Optional separate speed for reverse mode
  skipHtmlTags?: boolean;
  preserveWhitespace?: boolean;
  delay?: number;
  reverseDelay?: number; // Optional separate delay for reverse mode
  start?: boolean;
  reverse?: boolean; // New prop to trigger reverse mode
  useHighFrequency?: boolean;
}) => {
  // STATE MANAGEMENT
  // Current text being displayed to the user (progressively built up or torn down)
  const [displayText, setDisplayText] = useState('');
  // Index of the current character position (moves forward in typing, backward in untyping)
  const [currentIndex, setCurrentIndex] = useState(0);
  // Flag to track if forward typing is complete
  const [isComplete, setIsComplete] = useState(false);
  // Flag to track if reverse untyping is complete
  const [isReverseComplete, setIsReverseComplete] = useState(false);
  // Flag to track if animation has started (after any delay)
  const [hasStarted, setHasStarted] = useState(false);
  // Flag to track if currently in reverse/untyping mode
  const [isReversing, setIsReversing] = useState(false);

  // REFS FOR CLEANUP AND TIMING
  // Reference to requestAnimationFrame ID for standard mode cleanup
  const rafRef = useRef<number | null>(null);
  // Reference to setTimeout ID for high-frequency mode cleanup
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Reference to delay timeout for cleanup (works for both forward and reverse delays)
  const delayTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Timestamp of last character update (used in requestAnimationFrame mode)
  const lastUpdateRef = useRef<number>(0);
  // Track if component is still mounted to prevent state updates after unmount
  const mountedRef = useRef(false);
  // Stable reference to forward completion callback to avoid stale closures
  const onCompleteRef = useRef(onComplete);
  // Stable reference to reverse completion callback to avoid stale closures
  const onReverseCompleteRef = useRef(onReverseComplete);

  // DYNAMIC SPEED AND DELAY CALCULATION
  // Use reverse-specific settings if in reverse mode, otherwise use normal settings
  const effectiveSpeed = isReversing ? (reverseSpeed ?? speed) : speed;
  const effectiveDelay = isReversing ? reverseDelay : delay;

  // COMPONENT LIFECYCLE TRACKING
  // Track mounting state to prevent memory leaks and state updates on unmounted components
  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Keep both callback references updated to avoid stale closures
  useEffect(() => {
    onCompleteRef.current = onComplete;
    onReverseCompleteRef.current = onReverseComplete;
  }, [onComplete, onReverseComplete]);

  // REVERSE MODE TRIGGER LOGIC
  // When reverse prop becomes true and forward typing is complete, initiate reverse mode
  useEffect(() => {
    if (reverse && isComplete && !isReversing) {
      setIsReversing(true);
      setHasStarted(false); // Reset to allow delay logic to work for reverse
      setIsReverseComplete(false);
      // Set currentIndex to full text length so we can start untyping from the end
      setCurrentIndex(text.length);
    }
  }, [reverse, isComplete, isReversing, text.length]);

  // RESET STATE WHEN TEXT OR START PROP CHANGES
  useEffect(() => {
    // Only reset if we're not in reverse mode (reverse mode has its own state management)
    if (!reverse) {
      // Reset all state to initial values for fresh start
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
      setIsReverseComplete(false);
      setHasStarted(false);
      setIsReversing(false);
      lastUpdateRef.current = 0;
    }

    // Clear any existing delay timeout to prevent conflicts
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
      delayTimeoutRef.current = null;
    }
  }, [text, start, reverse]);

  // FORWARD CHARACTER NAVIGATION LOGIC
  // Determines the next valid character index when typing forward
  const getNextValidIndex = useCallback(
    (index: number): number => {
      // Don't go beyond the text length
      if (index >= text.length) return text.length;

      let nextIndex = index;

      // Skip HTML tags if enabled (jump from '<' to the character after '>')
      if (skipHtmlTags && text[index] === '<') {
        const closingTagIndex = text.indexOf('>', index);
        if (closingTagIndex !== -1) {
          // Jump past the entire HTML tag
          nextIndex = closingTagIndex + 1;
        } else {
          // If no closing tag found, just move one character
          nextIndex = index + 1;
        }
      } else {
        // Normal case: move to next character
        nextIndex = index + 1;
      }

      // Skip consecutive whitespace if preserveWhitespace is false
      // This prevents multiple spaces from being typed one by one
      if (!preserveWhitespace && nextIndex < text.length) {
        while (
          nextIndex < text.length &&
          /\s/.test(text[nextIndex]) && // Current character is whitespace
          /\s/.test(text[nextIndex - 1]) // Previous character is also whitespace
        ) {
          nextIndex++;
        }
      }

      return nextIndex;
    },
    [text, skipHtmlTags, preserveWhitespace]
  );

  // REVERSE CHARACTER NAVIGATION LOGIC
  // Determines the previous valid character index when untyping backward
  const getPrevValidIndex = useCallback(
    (index: number): number => {
      // Don't go below 0
      if (index <= 0) return 0;

      let prevIndex = index - 1;

      // Skip HTML tags if enabled (going backwards from '>' to before '<')
      if (skipHtmlTags && prevIndex >= 0) {
        // If we're at the end of an HTML tag, jump to before the opening tag
        if (text[index - 1] === '>') {
          const openingTagIndex = text.lastIndexOf('<', index - 1);
          if (openingTagIndex !== -1) {
            prevIndex = openingTagIndex;
          }
        }
      }

      // Skip consecutive whitespace if preserveWhitespace is false (going backwards)
      // This ensures we don't remove spaces one by one when untyping
      if (!preserveWhitespace && prevIndex > 0) {
        while (
          prevIndex > 0 &&
          /\s/.test(text[prevIndex]) && // Current character is whitespace
          /\s/.test(text[prevIndex + 1]) // Next character is also whitespace
        ) {
          prevIndex--;
        }
      }

      return Math.max(0, prevIndex);
    },
    [text, skipHtmlTags, preserveWhitespace]
  );

  // CORE TYPING/UNTYPING LOGIC
  // Handles both forward typing and reverse untyping based on current mode
  const typeNextCharacter = useCallback(() => {
    if (isReversing) {
      // REVERSE MODE: Remove characters from the end
      if (currentIndex <= 0) {
        // We've reached the beginning - reverse is complete
        setIsReverseComplete(true);
        setDisplayText(''); // Ensure display is completely empty
        // Trigger reverse completion callback after state update
        setTimeout(() => {
          onReverseCompleteRef.current();
        }, 0);
        return;
      }

      // Get the previous valid index (moving backwards)
      const prevIndex = getPrevValidIndex(currentIndex);
      // Update displayed text to show characters up to the new position
      setDisplayText(text.slice(0, prevIndex));
      // Move the cursor position backwards
      setCurrentIndex(prevIndex);
    } else {
      // FORWARD MODE: Add characters to the end
      if (currentIndex >= text.length) {
        // We've reached the end - forward typing is complete
        setIsComplete(true);
        // Trigger forward completion callback after state update
        setTimeout(() => {
          onCompleteRef.current();
        }, 0);
        return;
      }

      // Get the next valid index (moving forwards)
      const nextIndex = getNextValidIndex(currentIndex);
      // Update displayed text to show characters up to the new position
      setDisplayText(text.slice(0, nextIndex));
      // Move the cursor position forwards
      setCurrentIndex(nextIndex);
    }
  }, [currentIndex, text, isReversing, getNextValidIndex, getPrevValidIndex]);

  // HIGH-FREQUENCY ANIMATION MODE
  // Uses setTimeout for precise timing control in both forward and reverse modes
  const animateHighFrequency = useCallback(() => {
    // Safety checks: don't continue if unmounted or if the appropriate mode is complete
    if (!mountedRef.current || (!isReversing && isComplete) || (isReversing && isReverseComplete) || !hasStarted) return;

    // Process the next character (forward or reverse)
    typeNextCharacter();

    // Determine if we should continue animation based on current mode
    const shouldContinue = isReversing ? currentIndex > 0 : currentIndex < text.length;
    
    // Schedule the next animation frame if there are more characters to process
    if (shouldContinue) {
      intervalRef.current = setTimeout(
        animateHighFrequency,
        Math.max(1, effectiveSpeed) // Ensure minimum 1ms delay
      );
    }
  }, [
    isComplete,
    isReverseComplete,
    hasStarted,
    currentIndex,
    text.length,
    effectiveSpeed,
    typeNextCharacter,
    isReversing,
  ]);

  // STANDARD ANIMATION MODE
  // Uses requestAnimationFrame for smooth, display-synced animation in both modes
  const animate = useCallback(
    (timestamp: number) => {
      // Safety checks: don't continue if unmounted or if the appropriate mode is complete
      if (!mountedRef.current || (!isReversing && isComplete) || (isReversing && isReverseComplete) || !hasStarted) return;

      // Calculate time since last character was processed
      const timeSinceLastUpdate = timestamp - lastUpdateRef.current;

      // Only proceed if enough time has passed based on effective speed setting
      if (timeSinceLastUpdate >= effectiveSpeed) {
        // For very fast speeds, process multiple characters per frame to maintain speed
        const charactersToProcess = Math.max(
          1,
          Math.floor(timeSinceLastUpdate / effectiveSpeed)
        );

        let nextIndex = currentIndex;
        
        if (isReversing) {
          // REVERSE MODE: Process multiple characters backwards
          for (let i = 0; i < charactersToProcess && nextIndex > 0; i++) {
            nextIndex = getPrevValidIndex(nextIndex);
          }

          // Check if we've completed reverse animation
          if (nextIndex <= 0) {
            setDisplayText('');
            setCurrentIndex(0);
            setIsReverseComplete(true);
            // Trigger reverse completion callback
            setTimeout(() => {
              onReverseCompleteRef.current();
            }, 0);
            return;
          }
        } else {
          // FORWARD MODE: Process multiple characters forwards
          for (let i = 0; i < charactersToProcess && nextIndex < text.length; i++) {
            nextIndex = getNextValidIndex(nextIndex);
          }

          // Check if we've completed forward animation
          if (nextIndex >= text.length) {
            setDisplayText(text);
            setCurrentIndex(text.length);
            setIsComplete(true);
            // Trigger forward completion callback
            setTimeout(() => {
              onCompleteRef.current();
            }, 0);
            return;
          }
        }

        // Update display and tracking for both modes
        setDisplayText(text.slice(0, nextIndex));
        setCurrentIndex(nextIndex);
        lastUpdateRef.current = timestamp;
      }

      // Schedule next animation frame
      rafRef.current = requestAnimationFrame(animate);
    },
    [currentIndex, text, effectiveSpeed, isComplete, isReverseComplete, hasStarted, getNextValidIndex, getPrevValidIndex, isReversing]
  );

  // START TRIGGER AND DELAY HANDLING
  // Manages when typing or untyping animation should begin, with appropriate delays
  useEffect(() => {
    // Determine which trigger should start the animation based on current mode
    const shouldStart = isReversing ? reverse : start;
    // Check if the current mode is already complete
    const isAlreadyComplete = isReversing ? isReverseComplete : isComplete;
    
    // Don't start if conditions aren't met
    if (!shouldStart || !text || isAlreadyComplete) return;

    // Clear any existing delay timeout to prevent conflicts
    if (delayTimeoutRef.current) {
      clearTimeout(delayTimeoutRef.current);
    }

    // Apply the appropriate delay (reverseDelay for reverse mode, delay for forward mode)
    if (effectiveDelay > 0) {
      delayTimeoutRef.current = setTimeout(() => {
        setHasStarted(true);
      }, effectiveDelay);
    } else {
      // No delay - start immediately
      setHasStarted(true);
    }

    // Cleanup function
    return () => {
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
        delayTimeoutRef.current = null;
      }
    };
  }, [start, reverse, text, effectiveDelay, isComplete, isReverseComplete, isReversing]);

  // ANIMATION INITIALIZATION
  // Starts the appropriate animation mode when hasStarted becomes true
  useEffect(() => {
    // Check if the current mode is already complete
    const isAlreadyComplete = isReversing ? isReverseComplete : isComplete;
    // Don't start animation if conditions aren't met
    if (!hasStarted || isAlreadyComplete || !text) return;

    const startAnimation = () => {
      if (useHighFrequency) {
        // High-frequency mode: use setTimeout for precise timing
        intervalRef.current = setTimeout(
          animateHighFrequency,
          Math.max(1, effectiveSpeed)
        );
      } else {
        // Standard mode: use requestAnimationFrame for smooth animation
        lastUpdateRef.current = performance.now();
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    // Small delay ensures component is fully mounted and browser is ready
    // This prevents timing issues with requestAnimationFrame
    const timeoutId = setTimeout(startAnimation, 0);

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [
    hasStarted,
    isComplete,
    isReverseComplete,
    text,
    useHighFrequency,
    animate,
    animateHighFrequency,
    effectiveSpeed,
    isReversing,
  ]);

  // CLEANUP ON UNMOUNT
  // Ensures all timers and animation frames are cleaned up to prevent memory leaks
  useEffect(() => {
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (intervalRef.current) {
        clearTimeout(intervalRef.current);
      }
      if (delayTimeoutRef.current) {
        clearTimeout(delayTimeoutRef.current);
      }
    };
  }, []);

  // RETURN VALUES
  // Expose the current state and progress to the consuming component
  return {
    displayText, // Current text to display (progressively typed or untyped)
    isComplete, // Whether forward typing is finished
    isReverseComplete, // Whether reverse untyping is finished
    hasStarted, // Whether animation has begun (after any delay)
    isReversing, // Whether currently in reverse/untyping mode
    // Progress calculation adapts based on current mode:
    // - Forward mode: percentage of characters typed (0-100%)
    // - Reverse mode: percentage of characters removed (0-100%)
    progress: isReversing 
      ? (text.length > 0 ? ((text.length - currentIndex) / text.length) * 100 : 0) // Reverse progress
      : (text.length > 0 ? (currentIndex / text.length) * 100 : 0), // Forward progress
  };
};
```

> Usage

```tsx [TypewriterDemo.tsx] meta-info=val
const TypewriterDemo: FC = () => {
  const [showReverse, setShowReverse] = useState(false);

  const { displayText, isReversing } = useTypewriter({
    text: 'Hello <strong>World</strong>! This text will type and untype.',
    speed: 30,
    reverseSpeed: 20, // Faster untyping
    reverseDelay: 1000, // Wait 1 second before untyping
    reverse: showReverse,
    onComplete: () => {
      // Auto-trigger reverse after typing completes
      setTimeout(() => setShowReverse(true), 1000);
    },
    onReverseComplete: () => {
      console.log('Untyping complete!');
      setShowReverse(false); // Reset for potential replay
    },
  });

  return (
    <div>
      <div className="h-6" dangerouslySetInnerHTML={{ __html: displayText }} />
      <p>Status: {isReversing ? 'Untyping...' : 'Typing...'}</p>
    </div>
  );
};
```
