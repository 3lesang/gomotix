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
import { useNavigate } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Room name is required"),
  password: z.string().optional(),
  isPrivate: z.boolean().default(false),
  betAmount: z.number().min(0, "Bet amount must be at least 0").default(0),
  prizePool: z.number().min(0, "Prize pool must be at least 0").default(0),
  isPublic: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewGameForm() {
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      name: "",
      password: "",
      isPrivate: false,
      isPublic: true,
      betAmount: 0,
      prizePool: 0,
    },
    resolver: zodResolver(formSchema),
  });

  const handleSubmit = (values: FormValues) => {
    console.log(values);
    navigate({
      to: "/room/$id",
      params: { id: "1" },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="New Room" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                  prefix="$"
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

        <Button type="submit" className="w-full font-bold">
          Enter Room
        </Button>
      </form>
    </Form>
  );
}
