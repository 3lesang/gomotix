import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

const formSchema = z.object({
  stake: z.number().min(0, "Bet amount must be at least 0").default(0),
  password: z.string().optional(),
});

export type JoinGameFormValues = z.infer<typeof formSchema>;

interface JoinGameFormProps {
  defaultValues?: JoinGameFormValues;
  onSubmit?: (values: JoinGameFormValues) => void;
}

export default function JoinGameForm({
  onSubmit,
  defaultValues,
}: JoinGameFormProps) {
  const form = useForm({
    defaultValues,
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: JoinGameFormValues) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="stake"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Stake</FormLabel>
              <FormControl>
                <NumericFormat
                  disabled
                  customInput={Input}
                  thousandSeparator=","
                  decimalScale={2}
                  fixedDecimalScale
                  allowNegative={false}
                  placeholder="Enter amount"
                  className="w-full"
                  value={field.value ?? ""}
                  onValueChange={(values) => {
                    field.onChange(values.floatValue ?? 0);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="New Room" {...field} type="password" />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Enter the password to join the room.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Join Room
        </Button>
      </form>
    </Form>
  );
}
