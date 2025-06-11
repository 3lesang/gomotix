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
  password: z.string().optional(),
  betAmount: z.number().min(0, "Bet amount must be at least 0").default(0),
});

export type NewGameFormValues = z.infer<typeof formSchema>;

interface NewGameFormProps {
  onSubmit?: (values: NewGameFormValues) => void;
}

export default function NewGameForm({ onSubmit }: NewGameFormProps) {
  const form = useForm({
    defaultValues: {
      password: "",
      betAmount: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: NewGameFormValues) => {
    onSubmit?.(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="betAmount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <NumericFormat
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
              <FormLabel>Password (optional)</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password (optional)"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Set a password if you want to make the room private.
              </FormDescription>
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full font-extrabold">
          Enter Room
        </Button>
      </form>
    </Form>
  );
}
