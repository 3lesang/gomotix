import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

export interface CountDownHandle {
  restart: () => void;
}

interface CountDownProps {
  count: number; // in minutes
  pause?: boolean;
  onCountEnd?: () => void;
}

const buttonVariants = cva(
  "rounded-md border-2 border-transparent py-1 px-8 flex items-center justify-center w-20",
  {
    variants: {
      variant: {
        default: "bg-white border-blue-400 text-gray-700",
        destructive: "bg-gray-400 text-gray-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const CountDown = forwardRef<CountDownHandle, CountDownProps>(
  ({ count, pause = false, onCountEnd }, ref) => {
    const [timeLeft, setTimeLeft] = useState(count * 60);
    const [restartKey, setRestartKey] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const endedRef = useRef(false);

    const restart = () => {
      endedRef.current = false;
      setTimeLeft(count * 60);
      setRestartKey((k) => k + 1);
    };

    useImperativeHandle(ref, () => ({ restart }));

    useEffect(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (!pause && timeLeft > 0) {
        intervalRef.current = setInterval(() => {
          setTimeLeft((prev) => {
            if (prev <= 1) {
              clearInterval(intervalRef.current!);
              if (!endedRef.current) {
                endedRef.current = true;
                onCountEnd?.();
              }
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }

      return () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
      };
    }, [pause, restartKey, onCountEnd]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const variant = pause ? "destructive" : "default";

    return (
      <div className={cn(buttonVariants({ variant }))}>
        <p className="font-bold select-none">
          {minutes}:{seconds.toString().padStart(2, "0")}
        </p>
      </div>
    );
  }
);

CountDown.displayName = "CountDown";

export default CountDown;
