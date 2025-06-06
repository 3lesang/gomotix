import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { useEffect, useRef, useState } from "react";

interface CountDownProps {
  count: number;
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

function CountDown({ count, pause = false, onCountEnd }: CountDownProps) {
  const [timeLeft, setTimeLeft] = useState(count * 60);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const endedRef = useRef(false);

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

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
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [pause, onCountEnd]);

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

export default CountDown;
